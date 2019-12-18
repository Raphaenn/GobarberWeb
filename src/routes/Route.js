// Arquivo para fazer a configuração das rotas privadas

import React from 'react';
import PropTypes from 'prop-types'; // validaçoes de proptypes
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '../pages/layouts/auth';
import DefaultLayout from '../pages/layouts/default';

import { store } from '../store';

export default function RouteWrapper({
    component: Component,
    isPrivate = false,
    ...rest
}) {
    // pegar state onde consta se usuário está logado ou nao
    const { signed } = store.getState().auth;

    // Se usuario nao estiver logado, redireciona para login
    if(!signed && isPrivate) {
        return (<Redirect to="/" />)
    };

    if(signed && !isPrivate) {
        return ( <Redirect to="dashboard"/> )
    }

    // condicional para renderizar o layout certo
    const Layout = signed ? DefaultLayout : AuthLayout;

    return (
        <Route 
            { ...rest}
            render={props => (
                <Layout>
                    <Component {...props} />
                </Layout>
            )}
        /> 
    )
}


// validaçoes de proptypes
RouteWrapper.propTypes = { 
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

RouteWrapper.defaultProps = {
    isPrivate: false,
};


