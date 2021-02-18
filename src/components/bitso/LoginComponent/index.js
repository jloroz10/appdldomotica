import React,{Component} from 'react';
import './index.css';
import AuthenticationService from '../AuthenticationService.js';

import underConstruction from "../../resources/images/under_construction.png";

import DYLproject from '../../resources/images/dldomotica_portada.JPG';
class LoginGomponent extends Component{

    constructor(props){
        super(props);
        this.state={
            username:"jloroz",
            password:"",
            loginSuccess:false,
            loginError:false
        }
    }

    validateLogin = () =>{
        console.log(this.state.username)
        console.log(this.state.password)

        if((this.state.username ==='jloroz'|| this.state.username ==='danycyl') && this.state.password === '1234'){
            // this.setState({loginSuccess:true,loginError:false})
            this.props.history.push(`/welcome/${this.state.username}`)
            AuthenticationService.registerSuccesfulLogin(this.state.username,this.state.password);
        }
        else{
            console.log("Credentials Not Valid")
            this.setState({loginSuccess:false,loginError:true})
        }
    }

    updateValues = (e) =>{
 
         this.setState({
                [e.target.name]:e.target.value //to be able to use variables as name of the elemen on the state we need to cover it between []
         })
    }
    render(){
        return(
            <div className="container">
                <div>
                    <div className="">
                        {/* <h1 className="login">Login</h1>
                        {this.state.loginSuccess && <div className="alert alert-success">Login Successfully</div>}
                        {this.state.loginError && <div className="alert alert-danger">Invalid Credentials</div>}
                        <label className="login-label">Username:</label>
                        <input className="input" value ={this.state.username} name="username" type="text" onChange={this.updateValues}/>
                        <br/>
                        <label className="login-label">Password:</label>
                        <input className="input" value={this.state.password} name="password" type="password" onChange={this.updateValues}/>
                        <br/>
                        <button className="btn btn-outline-dark mt-3" onClick={this.validateLogin}>Login</button>     */}
                        <div className="img-container">
                        <img className="logo" alt="logo" src={DYLproject}></img> 
                         <img className="construction" alt="under construction" src={underConstruction}></img>
                        
                        </div>

                        
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginGomponent;