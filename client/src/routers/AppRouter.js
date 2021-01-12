import {Router,Route,Switch} from "react-router-dom" 
import React from "react"

import {InfoPage, LandingPage} from "../components/loginPage"
import { RegistrationPage } from "../components/registrationPage"
const createHistory=require("history").createBrowserHistory
export const History=createHistory()
const AppRouter=()=>(
    <Router history={History}>
        <div>
            <Switch>
            <Route path='/' component={RegistrationPage} exact={true} />
            <Route path='/info' component={LandingPage}/>
            </Switch>
        </div>
         </Router>

)
export default AppRouter