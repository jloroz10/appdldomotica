import React,{Component} from 'react';
import TodoDataService from '../../../api/todo/TodoDataService.js';
import AuthenticationService from '../AuthenticationService.js';
import './index.css'

class ListTodosComponent extends Component{
    constructor(){
        super();
        this.state={
            todos:[]
        }
    }

    callGetAllTodos = (username)=>{
        TodoDataService.executeGetAllTodos(username)
        .then(response =>{
            this.handleResponse(response);
        })
    }
    componentDidMount(){
        this.callGetAllTodos(AuthenticationService.getUserLoggedIn());
    }

    handleResponse = (response) =>{
        this.setState({
            todos:response.data
        })
    }
    render(){
        return(
            <div className="container list-todos-container">
                <h1>ToDos</h1>
                <br/>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Done</th>
                            <th scope="col">Description</th>
                            <th scope="col">Target Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.todos.map(todo =>{
                            return(
                                <tr key={todo.id}>
                                    <td><input type="checkbox" checked={todo.isCompleted}/></td>
                                    <td>{todo.description}</td>
                                    <td>{todo.targetDate.toLocaleString()}</td>
                                </tr>
                            )
                        })
                            
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ListTodosComponent;