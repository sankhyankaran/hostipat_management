// The constructor method is a special method in JavaScript classes that is called when an object is instantiated from the class.
// It takes two parameters: message and statusCode.
// super(message) calls the constructor of the superclass (Error in this case) with the message parameter, which sets the error message.
// this.statusCode = statusCode; assigns the statusCode parameter to a property of the instance being created. This allows you to associate an HTTP status code with the error.

class Errorhandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Inernal Server Error ";
  err.statusCode = err.statusCode || 500;
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`,
      err = new Errorhandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again!`;
    err = new Errorhandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try again!`;
    err = new Errorhandler(message, 400);
  }
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`,
      err = new Errorhandler(message, 400);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default Errorhandler;
