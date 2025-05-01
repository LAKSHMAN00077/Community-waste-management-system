// this is for handling error in global way
export const errorHandler = (err, req, res, next) => {
    console.error("Error Middleware! ",err.message);

    const statusCode = err.statusCode || 500 ;
    const errorMessage = err.message || "Internal Server Error!" ;

    res.status(statusCode).json({
        success : false,
        statusCode,
        errorMessage,
        stack : process.env.NODE_ENV === "developer" ? err.stack : undefined 
    });
};