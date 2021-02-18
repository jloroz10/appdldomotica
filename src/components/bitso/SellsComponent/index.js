import React,{Component} from "react";

class SellsComponent extends Component{
    render(){
        return(
            <div className="container">
                <h1> Sells</h1>
                  
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">MXN</th>
                            <th scope="col">BTC</th>
                            <th scope="col">Price</th>
                            <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>$2,000.00</td>
                                <td>0.01167550</td>
                                <td>$171,298.86</td>
                                <td>2020/04/02</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>$3,611.85</td>
                                <td>0.02099913</td>
                                <td>$172,000.00</td>
                                <td>2020/04/02</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>$3,912.86</td>
                                <td>0.02308472</td>
                                <td>$169,500.01</td>
                                <td>2020/04/02</td>
                            </tr>
                         
                            <tr>
                                <th scope="row">Totals</th>
                                <th>$7,912.86</th>
                                <th>0.05308472</th>
                                <th>$170,000.00</th>
                                <th></th>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <form onSubmit={this.handleAddNewPurchase} className="form-purchase">
                        <h4>Add Sell</h4>
                        <div className="form-group">
                            <label className="input-form" htmlFor="exampleInputPassword1">Amount MXN:</label>
                            <input name="amoun" type="money" className=" input-form" id="exampleInputPassword1"/>
                        </div>
                        <div className="form-group">
                            <label className=" input-form" htmlFor="exampleInputPassword1">BTC:</label>
                            <input name="btc" type="double" className=" input-form" id="exampleInputPassword1"/>
                        </div>
                        <div className="form-group">
                            <label className=" input-form" htmlFor="exampleInputPassword1">Price of Purchase:</label>
                            <input type="text" className=" input-form" id="exampleInputPassword1"/>
                        </div>
                        <div className="form-group">
                            <label className=" input-form" htmlFor="exampleInputPassword1">Date:</label>
                            <input type="date" className=" input-form" id="exampleInputPassword1"/>
                        </div>
                        <button type="submit" className="btn btn-outline-dark">Add</button>
                    </form>
            </div>
        ) 
    }
}

export default SellsComponent;