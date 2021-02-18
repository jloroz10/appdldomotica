import React,{Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import LoginGomponent from '../LoginComponent';
import LogoutGomponent from '../LogoutComponent';
import WelcomeComponent from '../WelcomeComponent';
import ErrorComponent from '../ErrorComponent';
import HeaderComponent from '../HeaderComponent';
import FooterComponent from '../FooterComponent';
import AuthenticatedRoute from '../AuthenticatedRoute';
import PurchasesComponent from '../PurchasesComponent';
import SellsComponent from '../SellsComponent';
import LoaderComponent from '../LoaderComponent';

class TodoApp extends Component{
    render(){
        return(
            <BrowserRouter>
                <HeaderComponent/>
                <Switch>
                    <Route exact path="/" component={LoginGomponent}/>
                    <Route exact path="/login" component={LoginGomponent}/>
                    <AuthenticatedRoute exact path="/welcome/:name" component={WelcomeComponent}/>
                    <AuthenticatedRoute exact path="/trades" component={PurchasesComponent}/>
                    <AuthenticatedRoute exact path="/sells" component={SellsComponent}/>
                    <AuthenticatedRoute exact path="/loader" component={LoaderComponent}/>
                    <AuthenticatedRoute exact path="/logout" component={LogoutGomponent}/>
                    <Route component={ErrorComponent}/>
                </Switch>
                <FooterComponent/>
            </BrowserRouter>
            
        )
    }
}

export default TodoApp;