import {Router,Route,Switch} from "react-router-dom" 
import React from "react"
import AdPage from "../components/fullPageAd";
import LoginPage from "../components/loginPage"
import  RegistrationPage  from "../components/registrationPage"
import Header from "../components/header";
import Home from "../components/home";
import ProtectedRoute from "./protectedRoutes";
import CreateAd from "../components/advertisementForm";
import UserProfile from "../components/userProfile";
import UserAdHolder from "../components/userAds";
import AdminRoute from "./adminRoute";
import adminPage from "../components/adminPage";
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
                <Route path='/ad' component={AdPage}/>
            <ProtectedRoute path={"/createAd"} component={CreateAd}/>
                <ProtectedRoute path={"/profile"} component={UserProfile}/>
                <ProtectedRoute path={"/myAds"} component={UserAdHolder}/>
                <AdminRoute path={"/admin"} component={adminPage}/>
            </Switch>
        </div>
         </Router>

)
export default AppRouter