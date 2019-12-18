import React from 'react';
import { PersistGate } from 'redux-persist/integration/react'; //renderiza a rota só depois de consultar o localStore
import { Provider } from "react-redux"; // padrão para o projeto
import { Router } from 'react-router-dom';
import { ToastContainer } from "react-toastify"; // notificações de erro

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history'; //navegaçao de páginas

import { store, persistor } from "./store";

import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <Router history={history}>
          <Routes />
          <GlobalStyle/>
          <ToastContainer autoClose={3000} />
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App;
