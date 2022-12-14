import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { Auth, UsuarioContext } from 'src/utils/context/usuarioContext';
import { environment } from 'src/utils/environments/environment';
import iContextDadosUsuario from 'src/utils/interfaces/contextDadosUsuario';
import desabilitarTodosElementos from 'src/utils/outros/desabilitarTodosElementos';
import CONSTS_AUTENTICAR from '../../consts/data/constAutenticar';
import horarioBrasilia from '../../outros/horarioBrasilia';
import CONSTS_TELAS from '../outros/telas';
import VERBOS_HTTP from '../outros/verbosHTTP';

@Injectable({
    providedIn: 'root'
})
export class Fetch implements OnInit {

    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
        private loadingBar: LoadingBarService,
        private router: Router,
        private usuarioContext: UsuarioContext
    ) { }

    isAuth: boolean | undefined;
    ngOnInit(): void {
        this.usuarioContext.isAuthObservable.subscribe(ia => this.isAuth = ia);
    }

    public async getApi(url: string, isTentarRefreshToken: boolean = true) {
        const token = Auth?.get()?.token ?? '';
        let respostaJson;

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

        try {
            respostaJson = await firstValueFrom(this.http.get(url, { headers }));
        } catch (erro: any) {
            const e = {
                'url': url,
                'token': token,
                'erro': erro.message,
                'data': horarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
            }

            console.log(e);
            if (!environment.production) {
                this.toastr.error('Houve uma falha na requisição ao servidor!', '');
            }

            // Se o usuário tem um token e foi erro 401, chame o end-point de refresh token;
            respostaJson = await this.refreshToken(token, erro.message, VERBOS_HTTP.GET, url, null, isTentarRefreshToken);
        }

        return respostaJson;
    }

    public async postApi(url: string, body: string | any | null, isTentarRefreshToken: boolean = true) {
        const respostaJson = await this.conteudoPostPutDelete(VERBOS_HTTP.POST, url, body, isTentarRefreshToken);
        return respostaJson;
    }

    public async putApi(url: string, body: string | any | null, isTentarRefreshToken: boolean = true) {
        const respostaJson = await this.conteudoPostPutDelete(VERBOS_HTTP.PUT, url, body, isTentarRefreshToken);
        return respostaJson;
    }

    public async deleteApi(url: string, body: string | any | null, isTentarRefreshToken: boolean = true) {
        const respostaJson = await this.conteudoPostPutDelete(VERBOS_HTTP.DELETE, url, body, isTentarRefreshToken);
        return respostaJson;
    }

    public async conteudoPostPutDelete(verboHTTP: string, url: string, body: string | any | null, isTentarRefreshToken: boolean = true) {
        const token = Auth?.get()?.token ?? '';
        let respostaJson;

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

        try {
            if (verboHTTP === VERBOS_HTTP.POST) {
                respostaJson = await firstValueFrom(this.http.post(url, JSON.stringify(body), { headers }));
            } else if (verboHTTP === VERBOS_HTTP.PUT) {
                respostaJson = await firstValueFrom(this.http.put(url, JSON.stringify(body), { headers }));
            } else if (verboHTTP === VERBOS_HTTP.DELETE) {
                respostaJson = await firstValueFrom(this.http.delete(url, { headers }));
            }
        } catch (erro: any) {
            const e = {
                'url': url,
                'body': body,
                'token': token,
                'erro': erro.message,
                'data': horarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
            }

            console.table(e);
            if (!environment.production) {
                this.toastr.error('Houve uma falha na requisição ao servidor!', '');
            }

            // Se o usuário tem um token e foi erro 401, chame o end-point de refresh token;
            respostaJson = await this.refreshToken(token, erro.message, verboHTTP, url, body, isTentarRefreshToken);
        }

        return respostaJson;
    }

    private async refreshToken(token: string, erro: any, verboHTTP: string, url: string | null, body: string | null, isTentarRefreshToken: boolean): Promise<any> {
        if (token && erro === 'Unexpected end of JSON input' && isTentarRefreshToken) {
            const urlRefreshToken = CONSTS_AUTENTICAR.API_URL_POST_REFRESH_TOKEN;
            const dto = {
                token: token,
                refreshToken: (Auth?.get()?.refreshToken ?? '')
            };

            // Fazer requisição para o end-point de refresh token
            const respostaRefreshToken = await this.postApi(urlRefreshToken, dto);
            if (!respostaRefreshToken || respostaRefreshToken?.erro) {
                console.log(respostaRefreshToken?.mensagemErro ?? 'Houve um erro ao gerar o refresh token');
                this.deslogarUsuarioRefreshTokenInvalido();
                return false;
            }

            // Atualizar dados no local storage;
            const dadosUsuario = {
                token: respostaRefreshToken.token,
                refreshToken: respostaRefreshToken.refreshToken
            } as iContextDadosUsuario;

            Auth.update(dadosUsuario);

            const msgRefreshTokenAtualizado = 'Refresh token atualizado';
            console.log(msgRefreshTokenAtualizado);

            if (!environment.production) {
                this.toastr.success(msgRefreshTokenAtualizado, '');
            }

            // Tentar novamente a chamada para o end-point requisitado, mas agora com o novo token;
            let respostaJson;

            if (url) {
                try {
                    if (verboHTTP === VERBOS_HTTP.GET) {
                        respostaJson = await this.getApi(url, false);
                    } else if (verboHTTP === VERBOS_HTTP.POST) {
                        respostaJson = await this.postApi(url, body, false);
                    } else if (verboHTTP === VERBOS_HTTP.PUT) {
                        respostaJson = await this.putApi(url, body, false);
                    } else if (verboHTTP === VERBOS_HTTP.DELETE) {
                        respostaJson = await this.deleteApi(url, body, false);
                    }
                } catch (error) {
                    this.deslogarUsuarioRefreshTokenInvalido();
                    return false;
                }
            }

            return respostaJson;
        }
    }

    private deslogarUsuarioRefreshTokenInvalido() {
        this.loadingBar.start();
        desabilitarTodosElementos(true);
        this.toastr.info(`A sua sessão expirou!<br/><br/>Renove sua sessão fazendo login novamente no GeekSpot 😎`, '');

        this.router.navigate([CONSTS_TELAS.ERRO]).then(() => {
            Auth.delete();
            this.usuarioContext._behaviorIsAuth.next(false);
            this.loadingBar.complete();
        });
    }

}
