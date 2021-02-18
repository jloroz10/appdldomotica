import axios from 'axios';

class TodoDataService{
    executeGetAllTodos(name){
        return axios.get(`http://localhost:8080/users/${name}/todos`);
    }
}

export default new TodoDataService();