import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform'; //facilita a configuração de formularios
import * as Yup from 'yup';

import { signUpRequest } from '../../store/modules/auth/actions';

import logo from "../../assets/logo.svg";



const schema = Yup.object().shape({
    name: Yup.string().required("Campo Obrigatório"),
    email: Yup.string("Email Inválido").required("Campo Obrigatório"),
    password: Yup.string().min(6, "No mínimo 6 caracteres").required("Campo Obrigatório")
})

export default function SignUp() {
    const dispatch = useDispatch();

    function handleSubmit({name, email, password}) {
        dispatch(signUpRequest(name, email, password));
    }

    return (
        <>
            <img src={logo} alt="Gobarber" />

            <Form schema={schema} onSubmit={handleSubmit}>
                <Input name="name" placeholder="Nome Completo" />
                <Input name="email" type= "email" placeholder="Seu e-mail" />
                <Input name="password" type= "password" placeholder="Sua senha" />

                <button type="submit">Criar conta</button>
                <Link to="/"> Já tenho login</Link>
            </Form>
        </>
    )
}