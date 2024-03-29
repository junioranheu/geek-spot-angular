import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import CONSTS_AUTENTICAR from 'src/utils/consts/data/constAutenticar';
import CONSTS_TELAS from 'src/utils/consts/outros/telas';
import { Auth, UsuarioContext } from 'src/utils/context/usuarioContext';
import iUsuario from 'src/utils/interfaces/usuario';
import converterSrcImagemParaBase64 from 'src/utils/outros/converterSrcImagemParaBase64';
import gerarImagemPerfilRandom from 'src/utils/outros/gerarImagemPerfilRandom';
import horarioBrasilia from 'src/utils/outros/horarioBrasilia';
import padronizarNomeCompletoUsuario from 'src/utils/outros/padronizarNomeCompletoUsuario';
import validarDadosCriarConta from 'src/utils/outros/validarDadosCriarConta';
import { GenericService } from 'src/utils/services/generic.service';

@Component({
    selector: 'app-criar-conta',
    templateUrl: './criar-conta.component.html',
    styleUrls: ['../entrar/entrar.component.scss']
})
export class CriarContaComponent implements OnInit {

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
            nomeCompleto: [null, [Validators.required]],
            email: [null, [Validators.email, Validators.required]],
            nomeUsuario: [null, [Validators.required]],
            senha: [null, [Validators.required, Validators.minLength(3)]],
            confirmarSenha: [null, [Validators.required, Validators.minLength(3)]]
        });
    }

    isAuth: boolean | undefined;
    imagemPerfilRandomInicialBase6?: string;
    ngOnInit(): void {
        this.usuarioContext.isAuthObservable.subscribe(ia => this.isAuth = ia);

        if (this.isAuth) {
            this.router.navigate([CONSTS_TELAS.ERRO]);
        }

        // Gerar uma imagem pro novo usuário;
        converterSrcImagemParaBase64(gerarImagemPerfilRandom())
            .then((base64: any) => {
                // console.log(base64);
                this.imagemPerfilRandomInicialBase6 = base64;
            });
    }

    urlEntrar = CONSTS_TELAS.ENTRAR;
    isExibirDivEmail: boolean = false;

    handleExibirDivEmail(): void {
        this.isExibirDivEmail = true;
    }

    @ViewChild('inputNomeCompleto', { static: false }) inputNomeCompleto: ElementRef | undefined;
    @ViewChild('inputEmail', { static: false }) inputEmail: ElementRef | undefined;
    @ViewChild('inputUsuario', { static: false }) inputUsuario: ElementRef | undefined;
    @ViewChild('inputSenha', { static: false }) inputSenha: ElementRef | undefined;
    @ViewChild('inputConfirmarSenha', { static: false }) inputConfirmarSenha: ElementRef | undefined;
    async handleCriarConta(): Promise<boolean | void> {
        this.loadingBar.start();
        const { valid, value } = this.form;
        // console.log(valid, value);

        const isTrocouSenha = true;
        let mensagemErroValidarDados = validarDadosCriarConta(value.nomeCompleto, value.email, value.nomeUsuario, value.senha, value.confirmarSenha, this.inputNomeCompleto, this.inputEmail, this.inputUsuario, this.inputSenha, isTrocouSenha);
        if (mensagemErroValidarDados) {
            this.toastr.error(mensagemErroValidarDados, '');
            this.loadingBar.complete();
            return false;
        }

        // Atribuir o nome formatado para a variavel nome, novamente;
        value.nomeCompleto = padronizarNomeCompletoUsuario(value.nomeCompleto ?? '');

        // Criar conta;
        const dto = {
            nomeCompleto: value.nomeCompleto,
            email: value.email,
            nomeUsuarioSistema: value.nomeUsuario,
            senha: value.senha,
            usuarioTipoId: 2, // Usuário comum;
            dataCriacao: horarioBrasilia().format('YYYY-MM-DD HH:mm:ss'),
            foto: this.imagemPerfilRandomInicialBase6,
            isAtivo: true,
            isPremium: false,
            IsVerificado: false
        } as unknown as iUsuario;

        const [dados, status] = await this.autenticarService.criar(CONSTS_AUTENTICAR.API_URL_POST_REGISTRAR, dto) as [iUsuario, number];

        if (!dados || dados?.erro) {
            value.senha = '';
            this.inputUsuario?.nativeElement.focus();
            this.toastr.error(dados?.mensagemErro ?? 'Parece que ocorreu um erro interno. Tente novamente mais tarde', '');
            this.loadingBar.complete();
            return false;
        }

        this.router.navigate([CONSTS_TELAS.INDEX]).then(() => {
            dados.cep = '';
            Auth.set(dados);
            this.usuarioContext._behaviorIsAuth.next(true);

            if (dados.isEmailVerificacaoContaEnviado) {
                this.toastr.success('Um e-mail de verificação de conta foi enviado para você 👽', '');
            }

            this.loadingBar.complete();
        });
    }

}