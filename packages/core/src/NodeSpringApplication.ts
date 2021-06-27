import Component from "./decorators/Component";
import { container } from "./Container";
import express from "express";

// parse application/json

@Component({prototype: false})
class NodeSpringApplication {
    constructor() {
        //todo initialize the express and listen to certain port
        const app = express();
        app.use(express.json());
        container.addComponent("app", app);
        console.log("Created an application");
    }

    run(): void {
        console.log("Running an application");
        const app = container.getBean("app");
        app.listen(process.env.PORT || 4000, (err) => {
            if(err) {
                throw new Error("Cannot start the application");
            } 
            console.log("Listening at port 4000");
        });
    }
}

export default NodeSpringApplication;