function responseBuilder(resCode, resMessage) {
    return JSON.stringify(
        {            
            code: resCode,
            data: resMessage,
            time: Date.now()
        }
    )
}

export {responseBuilder};