import {Router,Route,Switch} from "react-router-dom" 
import React from "react"

import {LandingPage,InfoPage} from "../components/landingPage"
const createHistory=require("history").createBrowserHistory
export const History=createHistory()
const AppRouter=()=>(
    <Router history={History}>
        <div>
            <Switch>
            <Route path='/' component={LandingPage} exact={true} />
            <Route path='/info' component={InfoPage}/>
            </Switch>
        </div>
         </Router>

)
export default AppRouter