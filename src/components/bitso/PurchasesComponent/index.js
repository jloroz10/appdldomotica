import React,{Component} from "react";
import './index.css';
import purchases from '../../../components/resources/data/purchases.json';
import BitsoServices from '../../../api/todo/BitsoServices.js';
class PurchasesComponent extends Component{
    constructor(){
        super();
        this.state={
            data:[],
            filteredDataBuy:[],
            filteredDataSell:[],
            selection:"btc_mxn",
            fetchingData:false,
            evaluatedPurchase:{
                finalMxnObtained:""
            },
            priceSuggested:0
        }
    }

    handleAddNewPurchase = (e) =>{
        e.preventDefault();
        const data = new FormData(e.target.value);

        console.log(e.target);
    }

    handleSelection = (e)=>{
        console.log("handleSelection")
        this.setState({
            selection:e.target.value
        })

        this.callGetTrades(e.target.value);
    }

    callGetTrades = (book) =>{

        this.setState({ fetchingData: true }, () => {
            BitsoServices.executeGetTrades(book)
            .then((response)=> {this.setState({
                fetchingData:false
            })
            console.log(response);
            this.handleGetTrades(response.data.payload);
        });
        });
    }

    filterData = (book) =>{
        this.setState({
            filteredData:[]
        })
        console.log("Filtering data");
        var filterTradesBuy = this.state.data.filter(trade => trade.side==="buy");
        var filterTradesSell = this.state.data.filter(trade =>trade.side==="sell");

      //  console.log(filteredTrades)
        this.setState({
            filteredDataBuy:filterTradesBuy,
            filteredDataSell:filterTradesSell
        })
    }
    handleGetTrades =(trades)=>{
        console.log(trades);

        this.setState({
            data:trades
        })
        this.filterData(this.state.selection);
    }
    convertBookToCurrency = (book) =>{
        switch(book){
            case 'btc_mxn':
                return "Bitcoin"
            case 'eth_mxn':
                return "Ethereum"
            case 'ltc_mxn':
                return "Litecoin"
            case 'xrp_mxn':
                return "Ripple"
                
        }
    }
    calculateObtained = (amount,price,fees)=>{
        console.log("ENTROO");
         return formatter.format(((parseFloat(amount) - parseFloat(fees)) * parseFloat(price)));
    }
    convertFeeToMxn= (fee,price)=>{
        return formatter.format(parseFloat(fee) * parseFloat(price));
    }
    convertFeeToBtc= (fee,price)=>{
        return (parseFloat(fee) / parseFloat(price)).toFixed(8);
    }

    handlePurchase = (e)=>{
        // console.log(e.target.parentElement);
        
        var purchase = e.target.parentElement;
        // console.log(purchase.getAttribute("id"));

        var tid = purchase.getAttribute("id");
        var tds = purchase.querySelectorAll("td")

        var p = this.state.filteredDataSell.filter(sell => sell.tid === tid)[0];
        console.log(p);
        // console.log("coin:",tds[0].innerHTML);
        // console.log("paid",tds[1].innerHTML);
        // console.log("price furchase:",tds[2].innerHTML);
        // console.log("BTC obtained:",tds[3].innerHTML);
        // console.log("fee in crypto:",tds[4].innerHTML);
        // console.log("fee in mxn",tds[5].innerHTML);
        // console.log("crypto obtained",tds[6].innerHTML);
        // console.log("mxn obtained",tds[7].innerHTML);

        this.setState({
            evaluatedPurchase:p
        });
        console.log(this.state.evaluatedPurchase);
    }
    convertToMxnFee = (price) =>{
        var finalPrice = price.replace("$","").replace(",","");
        console.log(finalPrice);

        return formatter.format(finalPrice * 0.005);
    }
    handlePriceSuggested= (e)=>{
        console.log(e.target.value);
    }
    componentDidMount(){

        this.callGetTrades(this.state.selection);
        // console.log(purchases);
        //  this.setState({
        //      data:purchases
        //  })
    }
    render(){
        return(
            <div className="container">
                <h1 className="mt-3"> Trades</h1>
               
                <div className="selection">
                <div className="input-group w-25">
                    <select value={this.state.selection}  onChange={this.handleSelection} className="custom-select" id="inputGroupSelect04">
                        {/* <option selected>Choose...</option> */}
                        <option value="btc_mxn">Bitcoin</option>
                        <option value="eth_mxn">Ethereum</option>
                        <option value="xrp_mxn">Ripple</option>
                        <option value="ltc_mxn">Litecoin</option>
                    </select>
                </div>
                </div>
                {
                    this.state.fetchingData ?
                    <div className="loading_container"> 
                        <div className="spinner-custom" role="status">
                            <span className="sr-only">Loading...</span>
                        </div> 
                    </div>: <div>{
                            this.state.filteredDataBuy.length > 0 && 
                            <div>
                            <h2>Purchases</h2>
                            <table className="table table-hover">
                                    <thead className="thead-dark">
                                        <tr>
                                        <th className="col-secondary" scope="col">Currency</th>
                                        <th scope="col">Amount Paid</th>
                                        <th scope="col">Price of Purchase</th>
                                        <th className="col-secondary"scope="col">Crypto Obtained</th>
                                        <th className="col-secondary"scope="col">Fee in Crypto</th>
                                        <th scope="col">Fee in MXN</th>
                                        <th scope="col">Final Crypto Obtained</th>
                                        <th scope="col">Final MXN Obtained</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            this.state.filteredDataBuy.map(elem => {
                                                return(
                                                    
                                                    <tr key={elem.tid}>
                                                        <td className="col-secondary">{this.convertBookToCurrency(elem.book)}</td>
                                                        <td>{formatter.format(parseFloat(elem.minor) * -1)}</td>
                                                        <td>{formatter.format(elem.price)}</td>
                                                        <td className="col-secondary">{elem.major}</td>
                                                        <td className="col-secondary">{elem.fees_amount}</td>
                                                        <td>{this.convertFeeToMxn(elem.fees_amount,elem.price)}</td>
                                                        <td>{(elem.major- elem.fees_amount).toFixed(8)}</td>
                                                        <td>{this.calculateObtained(elem.major,elem.price,elem.fees_amount)}</td>
                                                        {/* <td>{elem.date}</td> */}
                                                    </tr>
                                                );
                                            } )   
                                            
                                        }
                                    
                                        {/* <tr>
                                            <th scope="row">Totals</th>
                                            <th>$7,912.86</th>
                                            <th>0.05308472</th>
                                            <th>$170,000.00</th>
                                            <th></th>
                                        </tr> */}
                                    </tbody>
                            </table>
                         </div>
                        }
                        
                        
                        {this.state.filteredDataSell.length> 0 &&
                        <div>
                            <h2>Sells</h2>
                            <table className="table table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                    <th className="col-secondary" scope="col">Currency</th>
                                    <th scope="col">Crypto Sell</th>
                                    <th scope="col">Price of Sell</th>
                                    <th className="col-secondary" scope="col">MXN Obtained</th>
                                    <th scope="col">Fee in MXN</th>
                                    <th className="col-secondary" scope="col">Fee in Crypto</th>
                                    <th scope="col">Final Crypto Sell</th>
                                    <th scope="col">Final MXN Obtained</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.filteredDataSell.map(elem => {
                                            return(
                                                
                                                <tr  data-toggle="modal" data-target="#staticBackdrop" onClick={this.handlePurchase} key={elem.tid} id={elem.tid}>
                                                    <td className="col-secondary" >{this.convertBookToCurrency(elem.book)}</td>
                                                    <td>{elem.major * -1}</td>
                                                    <td>{formatter.format(elem.price)}</td>
                                                    <td className="col-secondary" >{formatter.format(parseFloat(elem.minor))}</td>
                                                    <td>{formatter.format(elem.fees_amount)}</td>
                                                    <td className="col-secondary" >{this.convertFeeToBtc(elem.fees_amount,elem.price)}</td>
                                                    <td>{((elem.major*-1)-this.convertFeeToBtc(elem.fees_amount,elem.price)).toFixed(8)}</td>
                                                    <td>{formatter.format(elem.minor - elem.fees_amount)}</td>
                                                </tr>
                                            );
                                        } )   
                                        
                                    }
                                
    
                                </tbody>
                            </table>
                        </div>}
                        </div>
                    }
                        
                    <br/><br/><br/>
                    <div class="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                         <div class="modal-dialog  modal-xl" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Details</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                
                                 

                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                        <th scope="col">Amount Sell</th>
                                        <th scope="col">Sell Price</th>
                                        <th className="col-secondary"scope="col">MXN Obtained</th>
                                        <th scope="col">Fee in MXN</th>
                                        <th className="col-secondary"scope="col">Fee in Crypto</th>
                                        <th scope="col">Final Crypto Obtained</th>
                                        <th scope="col">Final MXN Obtained</th>
                                        </tr>
                                </thead>
                                <tbody>
                                   
                                    <tr >
                                  
                                    <td>{this.state.evaluatedPurchase.major * -1}</td>
                                    <td>{formatter.format(this.state.evaluatedPurchase.price)}</td>
                                    <td className="col-secondary" >{formatter.format(parseFloat(this.state.evaluatedPurchase.minor))}</td>
                                    <td>{formatter.format(this.state.evaluatedPurchase.fees_amount)}</td>
                                    <td className="col-secondary" >{this.convertFeeToBtc(this.state.evaluatedPurchase.fees_amount,this.state.evaluatedPurchase.price)}</td>
                                    <td>{((this.state.evaluatedPurchase.major*-1)-this.convertFeeToBtc(this.state.evaluatedPurchase.fees_amount,this.state.evaluatedPurchase.price)).toFixed(8)}</td>
                                    <td>{formatter.format(this.state.evaluatedPurchase.minor - this.state.evaluatedPurchase.fees_amount)}</td>
                                </tr>
                
                                </tbody>
                                </table>
                                <br/>
                                {/* // <table class="table table-bordered">
                                // <thead>
                                // <tr>
                                //         <th scope="col">Crypto for Trade</th>
                                //         <th className="col-secondary"scope="col">Fee in Crypto</th> 
                                //         <th scope="col">Final Crypto For Purchase</th>
                                //         <th scope="col">Price for Purchase</th>
                                //         <th scope="col">Fee in MXN</th>
                                //         <th scope="col">Final Crypto Obtained</th>
                                //         <th scope="col">Final MXN Obtained</th>
                                //         </tr>
                                // </thead>
                                // <tbody>
                                //     <tr>
                                //         <td>{this.state.evaluatedPurchase.finalMxnObtained.substring(1)}</td>
                                //         <td>{this.convertToMxnFee(this.state.evaluatedPurchase.finalMxnObtained)}</td>
                                //         <td>{parseFloat(this.state.evaluatedPurchase.finalCryptoObtained) - parseFloat(this.state.evaluatedPurchase.finalCryptoObtained)*0.005}</td>
                                //          <td><input name="priceSuggested" onChange={this.handlePriceSuggested} value={this.state.priceSuggested}></input></td>
                                //         <td>{this.state.evaluatedPurchase.feeInCrypto}</td>
                                //         <td>{this.state.evaluatedPurchase.feeInMxn}</td>
                                //         <td>{this.state.evaluatedPurchase.finalCryptoObtained}</td>
                                //         <td>{this.state.evaluatedPurchase.finalMxnObtained}</td>
                                //     </tr>
                                // </tbody>
                                // </table> */}
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Understood</button>
                            </div>
                            </div>
                        </div>
                        </div>
            </div>
        ) 
    }
}

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  

export default PurchasesComponent;