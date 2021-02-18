import React,{Component} from 'react';
import './index.css'
import Error404 from "../../resources/images/404.png";
class ErrorComponent extends Component{
    render(){
        return(
            <div className="container error-container">
                <img alt="404 error" src={Error404}></img>
                <div className="error-message">Page not found</div>
            </div>
        )  
    }
}

export default ErrorComponent;