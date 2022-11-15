import { environment } from 'src/utils/environments/environment';
import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../../consts/api/urlApi';

const ENDPOINTS = {
    GET_TODOS: 'api/Itens/todos',
    GET_BY_ID: 'api/Itens',
    POST_ADICIONAR: 'api/Itens/adicionar',
    PUT_ATUALIZAR: 'api/Itens/atualizar',
    DELETE_DELETAR: 'api/Itens/deletar',
    GET_BY_ITEM_TIPO_ID: 'api/Itens/byItemTipoId',
    GET_BY_USUARIO_ID: 'api/Itens/byUsuarioId',
    LISTA_ITENS_GROUP_BY_USUARIO: 'api/Itens/listaItensGroupByUsuario'
};

const DEV = {
    API_URL_GET_TODOS: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_TODOS}`,
    API_URL_GET_BY_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_BY_ID}`,
    API_URL_POST_ADICIONAR: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_ADICIONAR}`,
    API_URL_PUT_ATUALIZAR: `${API_BASE_URL_DEV}/${ENDPOINTS.PUT_ATUALIZAR}`,
    API_URL_DELETE_DELETAR: `${API_BASE_URL_DEV}/${ENDPOINTS.DELETE_DELETAR}`,
    API_URL_GET_BY_ITEM_TIPO_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_BY_ITEM_TIPO_ID}`,
    API_URL_GET_BY_USUARIO_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_BY_USUARIO_ID}`,
    API_URL_LISTA_ITENS_GROUP_BY_USUARIO: `${API_BASE_URL_DEV}/${ENDPOINTS.LISTA_ITENS_GROUP_BY_USUARIO}`
};

const PROD = {
    API_URL_GET_TODOS: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_TODOS}`,
    API_URL_GET_BY_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_BY_ID}`,
    API_URL_POST_ADICIONAR: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_ADICIONAR}`,
    API_URL_PUT_ATUALIZAR: `${API_BASE_URL_PROD}/${ENDPOINTS.PUT_ATUALIZAR}`,
    API_URL_DELETE_DELETAR: `${API_BASE_URL_PROD}/${ENDPOINTS.DELETE_DELETAR}`,
    API_URL_GET_BY_ITEM_TIPO_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_BY_ITEM_TIPO_ID}`,
    API_URL_GET_BY_USUARIO_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_BY_USUARIO_ID}`,
    API_URL_LISTA_ITENS_GROUP_BY_USUARIO: `${API_BASE_URL_PROD}/${ENDPOINTS.LISTA_ITENS_GROUP_BY_USUARIO}`
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTS = !environment.production ? DEV : PROD;

export default CONSTS;