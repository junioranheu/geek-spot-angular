import { Injectable } from '@angular/core';

import iUsuario from 'src/utils/interfaces/usuario';
import { Fetch } from '../consts/api/fetch';
import CONSTS_AUTENTICAR from '../consts/data/constAutenticar';

@Injectable({
    providedIn: 'root'
})
export class AutenticarService {

    constructor(private fetch: Fetch) { }

    async postLogin(usuario: string, senha: string): Promise<iUsuario | null> {
        const url = CONSTS_AUTENTICAR.API_URL_POST_LOGIN;
        const dto = {
            email: usuario,
            nomeUsuarioSistema: usuario,
            senha: senha
        };

        const resposta = await this.fetch.postApi(url, dto) as iUsuario;

        if (resposta) {
            return resposta;
        }

        return null;
    }

    async postCriarConta(dto: iUsuario): Promise<iUsuario | null> {
        const url = CONSTS_AUTENTICAR.API_URL_POST_REGISTRAR;
        const resposta = await this.fetch.postApi(url, dto) as iUsuario;

        if (resposta) {
            return resposta;
        }

        return null;
    }

}
