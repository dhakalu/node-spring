

function RequestParam(parametername?: string): Function {
    console.log('Requesting parameter ', parametername);
    return function(...args: any) {
        console.log('request params are ', args)
    }
}

export default RequestParam;