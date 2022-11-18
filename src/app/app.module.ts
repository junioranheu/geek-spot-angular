import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // https://www.npmjs.com/package/@fortawesome/angular-fontawesome
import { LoadingBarModule } from '@ngx-loading-bar/core'; // https://www.npmjs.com/package/@ngx-loading-bar/core
import { DragScrollModule } from 'ngx-drag-scroll'; // https://www.npmjs.com/package/ngx-drag-scroll
import { ToastrModule } from 'ngx-toastr'; // https://www.npmjs.com/package/ngx-toastr

import { UsuarioContext } from 'src/utils/context/usuarioContext';

import { FooterComponent } from '../components/footer/padrao/footer/footer.component';
import { AdmAtualizarItemComponent } from '../components/item/adm-atualizar-item/adm-atualizar-item.component';
import { ModuloAlternativoComponent } from '../components/modulo/modulo-alternativo/modulo-alternativo.component';
import { NavbarFiltroComponent } from '../components/navbar/outros/navbar-filtro/navbar-filtro.component';
import { NavbarSmallComponent } from '../components/navbar/outros/navbar-small/navbar-small.component';
import { NavbarPadraoComponent } from '../components/navbar/padrao/navbar-padrao/navbar-padrao.component';
import { BotaoComponent } from '../components/outros/botao/botao.component';
import { SvgAjudaComponent } from '../components/svg/svg-ajuda/svg-ajuda.component';
import { SvgLogoComponent } from '../components/svg/svg-logo/svg-logo.component';
import { SvgLupaComponent } from '../components/svg/svg-lupa/svg-lupa.component';
import { SvgSetaUmComponent } from '../components/svg/svg-seta-um/svg-seta-um.component';

import { NavbarMobileComponent } from '../components/navbar/mobile/navbar-mobile/navbar-mobile.component';
import { SvgHamburguerComponent } from '../components/svg/svg-hamburguer/svg-hamburguer.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErroComponent } from './erro/erro.component';
import { IndexComponent } from './index/index.component';
import { ItemComponent } from './item/item.component';
import { CriarContaComponent } from './usuario/criar-conta/criar-conta.component';
import { EntrarComponent } from './usuario/entrar/entrar.component';

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        EntrarComponent,
        NavbarPadraoComponent,
        NavbarFiltroComponent,
        NavbarSmallComponent,
        SvgLogoComponent,
        SvgSetaUmComponent,
        SvgLupaComponent,
        SvgAjudaComponent,
        BotaoComponent,
        ModuloAlternativoComponent,
        FooterComponent,
        CriarContaComponent,
        ErroComponent,
        ItemComponent,
        AdmAtualizarItemComponent,
        NavbarMobileComponent,
        SvgHamburguerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({ enableHtml: true, positionClass: 'toast-top-right' }),
        LoadingBarModule,
        DragScrollModule,
        FontAwesomeModule
    ],
    providers: [UsuarioContext], // https://stackoverflow.com/questions/36158848/how-can-i-declare-a-global-variable-in-angular-2-typescript
    bootstrap: [AppComponent]
})
export class AppModule { }
