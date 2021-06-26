class NetworkError extends Error {

    status: number;
    
    constructor(message: string, name: string){
        super();
        this.message= message;
        this.name = name;
        this.status = 400;
    }
}

export default NetworkError;