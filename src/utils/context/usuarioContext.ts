import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import iContextDadosUsuario from '../interfaces/contextDadosUsuario';
import horarioBrasilia from '../outros/horarioBrasilia';

const _item = 'auth';
export const Auth = {
    set(data: iContextDadosUsuario) {
        const dadosUsuario = {
            usuarioId: data.usuarioId,
            nomeCompleto: data.nomeCompleto,
            nomeUsuarioSistema: data.nomeUsuarioSistema,
            email: data.email,
            usuarioTipoId: data.usuarioTipoId,
            foto: data.foto,
            isVerificado: data.isVerificado,
            token: data.token,
            refreshToken: data.refreshToken,
            dataAutenticacao: horarioBrasilia().format('YYYY-MM-DD HH:mm:ss'),
            cep: data.cep
        };

        let parsedData = JSON.stringify(dadosUsuario);
        localStorage.setItem(_item, parsedData);
    },

    get() {
        if (typeof window !== 'undefined') {
            let data = localStorage.getItem(_item);

            if (!data) {
                return null;
            }

            let dataJson = JSON.parse(data);
            return dataJson;
        } else {
            return null;
        }
    },

    delete() {
        localStorage.removeItem(_item);
    },

    update(data: iContextDadosUsuario) {
        const dadosUsuario = {
            usuarioId: (data.usuarioId ?? Auth.get().usuarioId),
            nomeCompleto: (data.nomeCompleto ?? Auth.get().nomeCompleto),
            nomeUsuarioSistema: (data.nomeUsuarioSistema ?? Auth.get().nomeUsuarioSistema),
            email: (data.email ?? Auth.get().email),
            usuarioTipoId: (data.usuarioTipoId ?? Auth.get().usuarioTipoId),
            foto: (data.foto ?? Auth.get().foto),
            isVerificado: (data.isVerificado ?? Auth.get().isVerificado),
            token: (data.token ?? Auth.get().token),
            refreshToken: (data.refreshToken ?? Auth.get().refreshToken),
            dataAutenticacao: (data.dataAutenticacao ?? Auth.get().dataAutenticacao),
            cep: (data.cep ?? Auth.get().cep)
        };

        let parsedData = JSON.stringify(dadosUsuario);
        localStorage.setItem(_item, parsedData);
    }
}

@Injectable()
export class UsuarioContext {
    public _behaviorIsAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(Auth.get() ? true : false); // https://stackoverflow.com/questions/47474743/ngif-not-updating-when-variable-changes
    public isAuthObservable: Observable<boolean> = this._behaviorIsAuth.asObservable();
}