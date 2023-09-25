class AppError extends Error { 
    statusCode: number;
    constructor(mensage: string, statusCode: number = 400){
        super(mensage);
        this.statusCode = statusCode;
    }
}

export default AppError