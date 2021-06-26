import NetworkError from "./NetworkError";

class InternalServerError extends NetworkError {

    constructor(message: string){
        super(message, "InternalServerError");
        this.message= message;
        // this.name = name;
        this.status = 500;
    }
    
    // constructor(message, name){
    //     super(message, name);
    //     this.message= message;
    //     this.name = name;
    //     this.status = 500;
    // }
}

export default InternalServerError;