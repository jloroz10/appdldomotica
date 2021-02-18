import React,{Component} from 'react'
import BitsoServices from '../../../api/todo/BitsoServices.js';

import './index.css';

class WelcomeComponent extends Component{

    constructor(){
        super();
        this.state={
            balances:[],
            currentMoney:0,
            coinPrices:[],
            fees:[],
            totalInMxn:0,
            totals:[]
        }
    }

    handleFeesResponse = (res) =>{
        console.log("Getting Fees")
        var coinFees = res.data.payload.fees.filter(coin => coin.book === 'btc_mxn' ||coin.book === 'eth_mxn'||coin.book === 'xrp_mxn' ||coin.book === 'ltc_mxn'||coin.book === 'tusd_mxn')
        console.log(coinFees);

        this.setState({
            fees:coinFees
        })
        console.log("fees obtained");
        console.log(this.fees)
    }
    callGetCoinsPrices = () =>{

        BitsoServices.executeGetCoinsPrices()
        .then(response => {
            this.handleCoinsPricesResponse(response);
        })

    }

    callRecurrentGetCoinsPrices = ()=>{  
        setInterval(this.callGetCoinsPrices,1200);
    }

    callRecurrentGetBalance = ()=>{
        setInterval(this.getBalanceAndFees,2500);
    }

    handleCoinsPricesResponse = response =>{
         var payload = response.data.payload;
         console.log("payload");
        

        var prices = payload.filter(elem => elem.book==='btc_mxn' || elem.book ==='eth_mxn'|| elem.book ==='xrp_mxn' || elem.book ==='ltc_mxn'|| elem.book ==='tusd_mxn');

        console.log("ppirces",prices);
         this.setState({
            coinPrices:prices
         })
         
    }

    getBalanceAndFees = () =>{
       
    
        BitsoServices.executeGetBalance()
            .then(response => {
                this.handleGetBalance(response);   
            }).then(()=>{
                BitsoServices.executeGetFees()
                .then(response => {
                    this.handleFeesResponse(response);
                })
        }).then(()=>{
            //this.calculateTotals()
            setTimeout(()=>{this.calculateTotals()},1000);
        })  
    }

    handleGetBalance = (res) =>{
        console.log("Balanceee");
    //  console.log(res.data.payload);

       // var balancesList = res.data.payload.balances.filter(balance => parseFloat(balance.available) > 0.00);
        var balancesList = res.data.payload.balances.filter(balance => balance.currency === 'btc' || balance.currency === 'eth' || balance.currency === 'ltc' || balance.currency === 'xrp' || balance.currency === 'tusd');
        // balancesList.filter(balance => balance.currency === 'eth')[0].available=parseFloat(100.12345678);
        //var balancesList = res.data.payload.balances;
        var currentBalanceMxn= res.data.payload.balances.filter(balance => balance.currency === 'mxn')[0].available;
         
        console.log(balancesList);
        this.setState({
            balances:balancesList,
            currentMoney:currentBalanceMxn
        })

        console.log(this.balances)
    }
    // handleBalanceInformation = (balance) =>{

    //     var available = balance.available;

    //     // if(balance.currency == "mxn"){
    //     //     //var amount = parseFloat(balance.available);
    //     //     var amount = 100000;
    //     //     available = amount.toFixed(2);
    //     //  //   console.log(available);
    //     // }
    //     return `${balance.currency} ${available}`
    // }

    handlePriceinMxn = (balance) =>{
        var available = balance.available;
        console.log("handlePrice: ");
        console.log(balance.currency);
        console.log(this.state.coinPrices);
        if(balance.currency !== 'tusd'){
            var priceOfCurrency = this.state.coinPrices.filter(coin => coin.book.substr(0,3) == balance.currency)[0];
            var feeOfCurrency = this.state.fees.filter(fee => fee.book.substr(0,3) === balance.currency)[0];
        }
        else{
            console.log("entro")
            var priceOfCurrency = this.state.coinPrices.filter(coin => coin.book.substr(0,4) == balance.currency)[0];
            var feeOfCurrency = this.state.fees.filter(fee => fee.book.substr(0,4) === balance.currency)[0];
        }

        console.log("priceofCUrrency: ",priceOfCurrency)
       

        if(priceOfCurrency && feeOfCurrency){
                return formatter.format(parseFloat(available * (1 -feeOfCurrency.fee_decimal) * priceOfCurrency.last));
           
        }
      // return available * priceOfCurrency.last;
    }


    getTrades = () =>{
       // console.log("Getting Trades")
        BitsoServices.executeGetTrades()
        .then(response => {
            this.handleGetTrades(response);
        })
    }

    handleGetTrades = (res) =>{
        console.log("Getting Trades");
        console.log(res);
        console.log("Trades obtained");
    }

    handleCoinPriceVisibilityEnter = (e,balance) =>{
 
        var coinPrice= e.target.getElementsByTagName("b")[0];
        var coinMxn = e.target.getElementsByTagName("b")[1];
        if(coinPrice && coinMxn && balance.currency !== "mxn"){
            coinMxn.hidden = false;
            coinPrice.hidden = true;
        }
       
    }

    handleCoinPriceVisibilityLeave = (e,balance) =>{
 
        var coinPrice= e.target.getElementsByTagName("b")[0];
        var coinMxn = e.target.getElementsByTagName("b")[1];
        if(coinPrice && coinMxn && balance.currency !== "mxn"){
            coinMxn.hidden = true;
            coinPrice.hidden = false;
        }
       
    }
 

    calculateTotals = () =>{
       //console.log("typeof ",btc.available);
       var btcFees = this.state.fees[0];

      
       if(this.state.balances.length >0 && this.state.fees.length > 0){
           var totalBtc = (this.state.balances[0].available * (1 - parseFloat(btcFees.fee_decimal))) * this.state.coinPrices[0].last;
           var totalEth = (this.state.balances[1].available * (1 - parseFloat(this.state.fees[1].fee_decimal))) * this.state.coinPrices[1].last;
           var totalLtc = (this.state.balances[2].available * (1 - parseFloat(this.state.fees[3].fee_decimal))) * this.state.coinPrices[3].last;
           var totalTrueUSD = (this.state.balances[3].available * (1 - parseFloat(this.state.fees[4].fee_decimal))) * this.state.coinPrices[4].last;
           var totalXrp = (this.state.balances[4].available * (1 - parseFloat(this.state.fees[2].fee_decimal))) * this.state.coinPrices[2].last;
           var totalMxn = parseInt(this.state.currentMoney);
   
           var totals = [];

           totals.push(totalBtc);
           totals.push(totalEth);
           totals.push(totalLtc);
           totals.push(totalTrueUSD);

           this.setState({
               totals:totals
           })

           
           console.log("Totals:",totalBtc,totalEth,totalLtc,totalTrueUSD);
           var grandTotal = totalBtc + totalEth + totalLtc + totalMxn +totalXrp+totalTrueUSD;
          this.setState({
           totalInMxn:grandTotal
          })
       }
       else{
            console.log("BALANCES NOT OBTAINED");
       }
    }

    handleCoinName = (coinCode) =>{
        switch(coinCode){
            case 'btc_mxn':
                return "Bitcoin Price"
            case 'eth_mxn':
                return "Ethereum Price"
            case 'ltc_mxn':
                return "Litecoin Price"
            case 'xrp_mxn':
                return "XRP Price"
                case 'tusd_mxn':
                    return "TrueUSD"    
        }
    }

    // setCoinPricesVisibility = () =>{
    //   var balancesElem = document.getElementById("balances-list").getElementsByTagName("div");
      
    //   console.log(balancesElem);

    //   for(var elem of balancesElem){
    //         elem.getElementsByTagName("b")[1].hidden=true;
    //   }
    // }

    componentDidMount(){
       // this.callGetFees();
        this.callGetCoinsPrices();
        this.getBalanceAndFees();
        this.getTrades();
        this.callRecurrentGetCoinsPrices();
        this.callRecurrentGetBalance();
    }

    render(){
         
        return(
            <div className="component">
                <div className="coinPrices">
                    {
                         this.state.coinPrices.map(coin =>{
                            return(
                                <div key={coin.book} className={`coin-name ${coin.book}`}>
                                    <b>{this.handleCoinName(coin.book)}</b>
                                    <p>{
                                        formatter.format(coin.last)
                                    }</p>
                                </div>
                            )
                        })   

                    }
                    {/* // <div>
                    //     <h1><b>Bitcoin Price</b></h1>
                    //     <h1> {this.state.coinPrices[0].last}</h1>
                    // </div>
                    // <div>
                    //     <h2><b>Ethereum Price</b></h2>
                    //     <h2> {this.state.coinPrices[1].last}</h2>
                    // </div>
                    // <div>
                    //     <h2><b>Litecoin Price</b></h2>
                    //     <h2> {this.state.coinPrices[2].last}</h2>
                    // </div> */}
                </div> 
                
                
                <div id="balances-list" className="balances-list">
                    {
                        this.state.balances.map(balance =>{
                            return(
                                <div onMouseEnter={(e) =>{this.handleCoinPriceVisibilityEnter(e,balance)}} onMouseLeave={(e) =>{this.handleCoinPriceVisibilityLeave(e,balance)}}  className={`balance ${balance.currency}`} key={balance.currency}>
                                   
                                    <b className="coinPriceDetail">{
                                      ` ${balance.currency} ${balance.available}`
                                    }</b>

                                    <b  className="coinPriceDetail" hidden={true}>{ this.handlePriceinMxn(balance)}</b>
                                </div>
                            )
                        })
                    }

                </div> 
                <div className="totalMxn">
                        <div className="mxn">
                            {
                                formatter.format(this.state.currentMoney)
                            }
                    </div>
                </div>
                <div className="totals">
                    <h1><b>Grand Total</b></h1>
                <h3>{formatter.format(this.state.totalInMxn)}</h3>
                </div> 
                <div className="grid">
                    <div className="table-details">
                        <h2>Last Purchase</h2>
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                <th scope="col">MXN</th>
                                <th scope="col">BTC</th>
                                <th scope="col">Price</th>
                                <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>$2,000.00</td>
                                    <td>0.0033344</td>
                                    <td>$171,000.00</td>
                                    <td>2020-04-10</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <h2>Forecast</h2>
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                <th scope="col">MXN</th>
                                <th scope="col">BTC</th>
                                <th scope="col">Price</th>
                                <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>$2,000.00</td>
                                    <td>0.0033344</td>
                                    <td>$171,000.00</td>
                                    <td>2020-04-10</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* <br/>
                <Link to="/todos">Todos</Link> */}
            </div>
        )
    }
}

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  })
export default WelcomeComponent;