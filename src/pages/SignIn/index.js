import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from "../../store/modules/auth/actions";

import logo from "../../assets/logo.svg";

// validação do fomulário
const schema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required("Email obrigatório"),
    password: Yup.string().required("Senha obrigatória")
});

export default function SignIn() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading) // botao de loading

    function handleSubmit({ email, password }) {
        dispatch(signInRequest(email, password))
    }

    return (
        <>
            <img src={logo} alt="Gobarber" />

            <Form schema={schema} onSubmit={handleSubmit}>
                <Input name="email" type= "email" placeholder="Seu e-mail" />
                <Input name="password" type= "password" placeholder="Sua senha" />

                <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
                <Link to="/register"> Criar conta gratuita</Link>
            </Form>
        </>
    )
}