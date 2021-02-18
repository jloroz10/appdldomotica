import axios from 'axios';

class BitsoService{
    executeGetCoinsPrices(){
        //leaving the responsability to the user, just returning a promise 
        //return axios.get("https://api.bitso.com/v3/ticker/?book=btc_mxn");
        return axios.get("https://api.bitso.com/v3/ticker/");
    }
    executeGetBalance(){
        console.log("balance");
        return axios.get(`http://localhost:8081/balance`);
    }

    executeGetTrades(book){
        console.log("trades");
        return axios.get(`http://localhost:8081/trades/${book}`);
    }

    executeGetFees(){
        console.log("fees");
        return axios.get(`http://localhost:8081/fees`);
    }
}

//each class that import this class will craeta a new instance
export default new BitsoService();