import { takeLatest, call, put, all } from 'redux-saga/effects'; 
import { toast } from "react-toastify";

import history from '../../../services/history';
import api from '../../../services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
        email,
        password,
    });

    const { token, user } = response.data;    

    // validação se usuário é provider
    if (!user.provider) {
        toast.error('Usuário invalido');
        return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    // passa o token e usuário para a action
    yield put(signInSuccess(token, user));

    // faz a navegação para a rota dashboard
    history.push('/dashboard');
    } catch (err) {
        toast.error("Erro de validação")
        yield put(signFailure());
    }
}

// cadsatro de usuário no sistema
export function* signUp({ payload }) {
    try {
        const { name, email, password } = payload;

        // rota users é a definida no back para criar uma novo usuário
        yield call(api.post, 'users', {
            name,
            email,
            password,
            provider: true,
        });

        history.push('/');

    } catch (err) {
        toast.error("Falha no cadastro");
        yield put(signFailure())
    }
}

// fazer com que todas as reqs a api incluam o token no header da aplicação
export function setToken({ payload }) {
    if(!payload) return;

    const { token } = payload.auth

    if(token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export function signOut() {
    history.push('/');
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('@auth/SIGN_OUT', signOut),
]);