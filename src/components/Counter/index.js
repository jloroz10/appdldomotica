import React,{Component} from 'react';
import ButtonComponent from '../ButtonComponent'
import './index.css';

class Counter extends Component{

     constructor(){
         super()
         this.state = {
             counter:0
         }
         //Line required when using normal methods definition (not arrow functions)
         //this.increment = this.increment.bind(this)
     }
    increment = (by) =>{
        this.setState(
            (prevState) =>{
                return{
                    counter : this.state.counter + by
                }
            }
            
        );
    }

    decrement = (by) =>{
    
        this.setState(
            (prevState) => {
                return{
                    counter : prevState.counter - by
                }
            }
        );
    }

    resetCounter = () =>{
        this.setState(
            () =>{
                return{
                    counter: 0
                }
            }
        )
    }
    render(){
        return(
            <div className="counter">
                <ButtonComponent by={10} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <ButtonComponent by={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <ButtonComponent by={1} incrementMethod={this.increment} decrementMethod={this.decrement}/>

                <span className="count">
                    {this.state.counter}
                </span>
                <br/>
                <button className="reset" onClick={this.resetCounter}>Reset</button>
            </div>
        )
    }
}

export default Counter;