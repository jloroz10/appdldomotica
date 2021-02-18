import React,{Component} from 'react'

class ButtonComponent extends Component{

    incrementBy = () =>{
        this.props.incrementMethod(this.props.by)
    }

    
    decrementBy = () =>{
        this.props.decrementMethod(this.props.by)
    }

    render(){
        return(
            <div>
                <button onClick={()=> this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
                <button onClick={this.decrementBy}>-{this.props.by}</button>
            </div>
        )
    }
}

export default ButtonComponent;