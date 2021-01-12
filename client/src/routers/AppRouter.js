import {Router,Route,Switch} from "react-router-dom" 
import React from "react"

import { LoginPage} from "../components/loginPage"
import { RegistrationPage } from "../components/registrationPage"
const createHistory=require("history").createBrowserHistory
export const History=createHistory()
const AppRouter=()=>(
    <Router history={History}>
        <div>
            <Switch>
            <Route path='/register' component={RegistrationPage} exact={true} />
            <Route path='/login' component={LoginPage}/>
            </Switch>
        </div>
         </Router>

)
export default AppRouter