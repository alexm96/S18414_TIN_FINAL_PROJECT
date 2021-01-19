import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from "./routers/AppRouter"
import myStore from "./store/configureStore"
import {Provider} from "react-redux"
const store=myStore()
ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>

  ,
  document.getElementById('root')
);


