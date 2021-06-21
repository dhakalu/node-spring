class NetworkError extends Error {

    status: number;
    
    constructor(message, name){
        super();
        this.message= message;
        this.name = name;
        this.status = 400;
    }
}

export default NetworkError;