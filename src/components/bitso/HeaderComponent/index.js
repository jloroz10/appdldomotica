import React,{Component} from 'react';
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom'
import './index.css';

import DYLproject from '../../resources/images/dldomotica_portada.JPG';
import AuthenticationService from '../AuthenticationService';

class HeaderComponent extends Component{
   render(){
       let currentUser = AuthenticationService.getUserLoggedIn();

       let isUserLoggedIn =  AuthenticationService.isUserLogged();
       return(
           <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
               {/* <Link to={`/welcome/${currentUser}`}>
                   <img alt="logo" className="dylproject-logo"src={DYLproject}></img>
               </Link> */}
               <span>DLDOMOTICA</span>
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                       {/* <li class="nav-item active">
                           <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                       </li> */}
                       <li className="nav-item">
                           { isUserLoggedIn && <Link className="nav-link" to="/trades">Trades</Link>}
                       </li>
                       {/* <li className="nav-item">
                           { isUserLoggedIn && <Link className="nav-link" to="/sells">Sells</Link>}
                       </li> */}
                   </ul>
                   <ul className="navbar-nav ml-auto">
                       {
                           !isUserLoggedIn &&<li className="nav-item">
                               <Link className="nav-link" to="/login">Login</Link>
                           </li>
                       }
                       {
                           isUserLoggedIn &&   <li className="nav-item">
                               <Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link>
                           </li>
                       }
                   </ul>
               </div>
           </nav>
       )
   }
}

export default withRouter(HeaderComponent);