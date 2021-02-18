import axios from 'axios';
class HelloWorldService{
    executeHelloWorldService(){
        //leaving the responsability to the user, just returning a promise 
        return axios.get("http://localhost:8080/hello-world");
    }

    executeHelloWorldBeanService(){
        return axios.get('http://localhost:8080/hello-world-bean')
    }
    executeHelloWorldPathVariableService(name){
        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`)
    }

}

//each class that import this class will craeta a new instance
export default new HelloWorldService();