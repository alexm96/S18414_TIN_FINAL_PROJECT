import {Router,Route,Switch} from "react-router-dom" 
import React from "react"

import LoginPage from "../components/loginPage"
import  RegistrationPage  from "../components/registrationPage"
import Header from "../components/header";
import Home from "../components/home";
const createHistory=require("history").createBrowserHistory
export const History=createHistory()
const AppRouter=()=>(

    <Router history={History}>
        <div>
            <Header/>
            <Switch>
                <Route path="/" component={Home} exact={true} />
            <Route path='/register' component={RegistrationPage} />
            <Route path='/login' component={LoginPage}/>
            </Switch>
        </div>
         </Router>

)
export default AppRouter