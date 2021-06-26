import Request from "./Request";

export function PostRequest(path: string): (target: any, key: string) => void {
    return Request({
        path,
        method: "POST",
    });
}

export default PostRequest;


