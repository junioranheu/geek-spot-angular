import { isDevMode } from '@angular/core';

import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../../consts/api/urlApi';

const ENDPOINTS = {
    GET_BY_ID: 'api/Usuarios',
    GET_TODOS: 'api/Usuarios/todos',
    PUT_ATUALIZAR: 'api/Usuarios/atualizar',
    PUT_VERIFICAR_CONTA: 'api/Usuarios/verificarConta',
    PUT_ATUALIZAR_DADOS_LOJINHA: 'api/Usuarios/atualizarDadosLojinha',
    PUT_ATUALIZAR_DADOS_PESSOAIS: 'api/Usuarios/atualizarDadosPessoais',
    PUT_ATUALIZAR_DADOS_ENDERECO: 'api/Usuarios/atualizarDadosEndereco',
    PUT_DESATIVAR_CONTA: 'api/Usuarios/desativarConta',
    PUT_ATUALIZAR_SENHA: 'api/Usuarios/atualizarSenha',
    POST_EMAIL_RECUPERAR_SENHA: 'api/Usuarios/emailRecuperarSenha',
    PUT_ATUALIZAR_SENHA_RECUPERAR: 'api/Usuarios/atualizarSenhaRecuperar',
    POST_EMAIL_VERIFICAR_CONTA: 'api/Usuarios/emailVerificarConta'
};

const DEV = {
    API_URL_GET_BY_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_BY_ID}`,
    API_URL_GET_TODOS: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_TODOS}`,
    API_URL_PUT_ATUALIZAR: `${API_BASE_URL_DEV}/${ENDPOINTS.PUT_ATUALIZAR}`,
    API_URL_PUT_VERIFICAR_CONTA: `${API_BASE_URL_DEV}/${ENDPOINTS.PUT_VERIFICAR_CONTA}`,
    API_URL_PUT_ATUALIZAR_DADOS_LOJINHA: `${API_BASE_URL_DEV}/${ENDPOINTS.PUT_ATUALIZAR_DADOS_LOJINHA}`,
    API_URL_PUT_ATUALIZAR_DADOS_PESSOAIS: `${API_BASE_URL_DEV}/${ENDPOINTS.PUT_ATUALIZAR_DADOS_PESSOAIS}`,
    API_URL_PUT_ATUALIZAR_DADOS_ENDERECO: `${API_BASE_URL_DEV}/${ENDPOINTS.PUT_ATUALIZAR_DADOS_ENDERECO}`,
    API_URL_PUT_DESATIVAR_CONTA: `${API_BASE_URL_DEV}/${ENDPOINTS.PUT_DESATIVAR_CONTA}`,
    API_URL_PUT_ATUALIZAR_SENHA: `${API_BASE_URL_DEV}/${ENDPOINTS.PUT_ATUALIZAR_SENHA}`,
    API_URL_POST_EMAIL_RECUPERAR_SENHA: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_EMAIL_RECUPERAR_SENHA}`,
    API_URL_PUT_ATUALIZAR_SENHA_RECUPERAR: `${API_BASE_URL_DEV}/${ENDPOINTS.PUT_ATUALIZAR_SENHA_RECUPERAR}`,
    API_URL_POST_EMAIL_VERIFICAR_CONTA: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_EMAIL_VERIFICAR_CONTA}`
};

const PROD = {
    API_URL_GET_BY_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_BY_ID}`,
    API_URL_GET_TODOS: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_TODOS}`,
    API_URL_PUT_ATUALIZAR: `${API_BASE_URL_PROD}/${ENDPOINTS.PUT_ATUALIZAR}`,
    API_URL_PUT_VERIFICAR_CONTA: `${API_BASE_URL_PROD}/${ENDPOINTS.PUT_VERIFICAR_CONTA}`,
    API_URL_PUT_ATUALIZAR_DADOS_LOJINHA: `${API_BASE_URL_PROD}/${ENDPOINTS.PUT_ATUALIZAR_DADOS_LOJINHA}`,
    API_URL_PUT_ATUALIZAR_DADOS_PESSOAIS: `${API_BASE_URL_PROD}/${ENDPOINTS.PUT_ATUALIZAR_DADOS_PESSOAIS}`,
    API_URL_PUT_ATUALIZAR_DADOS_ENDERECO: `${API_BASE_URL_PROD}/${ENDPOINTS.PUT_ATUALIZAR_DADOS_ENDERECO}`,
    API_URL_PUT_DESATIVAR_CONTA: `${API_BASE_URL_PROD}/${ENDPOINTS.PUT_DESATIVAR_CONTA}`,
    API_URL_PUT_ATUALIZAR_SENHA: `${API_BASE_URL_PROD}/${ENDPOINTS.PUT_ATUALIZAR_SENHA}`,
    API_URL_POST_EMAIL_RECUPERAR_SENHA: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_EMAIL_RECUPERAR_SENHA}`,
    API_URL_PUT_ATUALIZAR_SENHA_RECUPERAR: `${API_BASE_URL_PROD}/${ENDPOINTS.PUT_ATUALIZAR_SENHA_RECUPERAR}`,
    API_URL_POST_EMAIL_VERIFICAR_CONTA: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_EMAIL_VERIFICAR_CONTA}`
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTS = isDevMode() ? DEV : PROD;

export default CONSTS;