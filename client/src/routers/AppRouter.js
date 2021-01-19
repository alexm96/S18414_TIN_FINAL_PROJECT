import {Router,Route,Switch} from "react-router-dom" 
import React from "react"
import AdPage from "../components/fullPageAd";
import LoginPage from "../components/loginPage"
import  RegistrationPage  from "../components/registrationPage"
import Header from "../components/header";
import Home from "../components/home";
import ProtectedRoute from "./protectedRoutes";
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
            <ProtectedRoute path="/newAdvert" component={AdPage} />
            </Switch>
        </div>
         </Router>

)
export default AppRouter