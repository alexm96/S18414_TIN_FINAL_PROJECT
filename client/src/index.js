import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from "./routers/AppRouter"
import myStore from "./store/configureStore"
import {Provider} from "react-redux"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
    palette: {
        primary: { main: '#1976d2' },
    },
})
const store=myStore()
ReactDOM.render(
    <ThemeProvider theme={theme}>
    <Provider store={store}>
        <AppRouter />
    </Provider>
    </ThemeProvider>
  ,
  document.getElementById('root')
);


