import React,{Component} from "react";
import BitsoServices from "../../../api/todo/BitsoServices";
import './index.css';


class LoaderComponent extends Component{

    constructor(){
        super();
        this.state={
            fetchingData:false
        }
    }
    getData=()=>{
      

        this.setState({ fetchingData: true }, () => {
            BitsoServices.executeGetTrades("btc_mxn")
            .then((response)=> this.setState({
                fetchingData:false
            }));
          });
    }
    render(){
        return(
            <div>
                <div>Load Test</div>
                <button onClick={this.getData}>Get Data</button>
                <br/>
                {this.state.fetchingData ? <div class="spinner-border text-secondary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>: <div>Data Obtained</div>}

                <div className="loading_container"> 
                        <div className="spinner-custom" role="status">
                            <span className="sr-only">Loading...</span>
                        </div> 
                    </div>
            </div>
        ) 
    }
}

export default LoaderComponent;