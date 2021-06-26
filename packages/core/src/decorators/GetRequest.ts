import Request from "./Request";

export function GetRequest(path: string): (target: any, key: string) => void {
    return Request({
        path,
    });
}

export default GetRequest;


