import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import CONSTS_AUTENTICAR from 'src/utils/consts/data/constAutenticar';
import CONSTS_TELAS from 'src/utils/consts/outros/telas';
import { Auth, UsuarioContext } from 'src/utils/context/usuarioContext';
import iUsuario from 'src/utils/interfaces/usuario';
import { GenericService } from 'src/utils/services/generic.service';

@Component({
    selector: 'app-entrar',
    templateUrl: './entrar.component.html',
    styleUrls: ['./entrar.component.scss']
})
export class EntrarComponent implements OnInit {

    constructor(
        private toastr: ToastrService,
        private autenticarService: GenericService<iUsuario>,
        private router: Router,
        private usuarioContext: UsuarioContext,
        private loadingBar: LoadingBarService,
        private formBuilder: FormBuilder
    ) {
        this.generateForm();
    }

    form!: FormGroup;

    generateForm() {
        this.form = this.formBuilder.group({
            nomeUsuario: [null, [Validators.required]],
            senha: [null, [Validators.required, Validators.minLength(3)]]
        });
    }

    isAuth: boolean | undefined;
    ngOnInit(): void {
        this.usuarioContext.isAuthObservable.subscribe(ia => this.isAuth = ia);

        if (this.isAuth) {
            this.router.navigate([CONSTS_TELAS.ERRO]);
        }
    }

    urlCriarConta = CONSTS_TELAS.CRIAR_CONTA;
    isExibirDivEmail: boolean = false;

    handleExibirDivEmail(): void {
        this.isExibirDivEmail = true;
    }

    @ViewChild('inputUsuario', { static: false }) inputUsuario: ElementRef | undefined;
    async handleEntrar(): Promise<boolean | void> {
        const { valid, value } = this.form;
        // console.log(valid, value);

        if (!value.nomeUsuario || !value.senha) {
            value.senha = '';
            this.inputUsuario?.nativeElement.focus();
            this.toastr.error('O nome de usuário e/ou e-mail estão vazios!', '');
            return false;
        }

        this.loadingBar.start();

        const dto = {
            email: value.nomeUsuario,
            nomeUsuarioSistema: value.nomeUsuario,
            senha: value.senha
        };

        const [dados, status] = await this.autenticarService.criar(CONSTS_AUTENTICAR.API_URL_POST_LOGIN, dto) as [iUsuario, number];
        // console.log(dados, status);

        if (!dados || dados?.erro) {
            value.senha = '';
            this.inputUsuario?.nativeElement.focus();
            this.toastr.error(dados?.mensagemErro ?? 'Algo deu errado! Provavelmente o usuário e/ou a senha estão errados', '');
            this.loadingBar.complete();
            return false;
        }

        this.router.navigate([CONSTS_TELAS.INDEX]).then(() => {
            dados.cep = dados?.usuariosInformacoes?.cep ?? '';
            Auth.set(dados);
            this.usuarioContext._behaviorIsAuth.next(true);
            this.loadingBar.complete();
        });
    }

}