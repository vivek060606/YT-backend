class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };


// ApiError gives your application a consistent way of representing errors.
// throw new ApiError(404, "User not found");

// JavaScript already has a built-in Error class:
// new Error("Something went wrong");

// We're creating our own error type based on it:

// class ApiError extends Error

// Controller
//     │
//     │ throw new ApiError(...)
//     ↓
// Error middleware
//     │
//     ↓
// JSON response

// ApiError doesn't send the response itself.

// It only creates/describes the error.

// The error middleware is responsible for actually sending:


// ApiError is a child of JavaScript's built-in Error:
// super(message) → initialize the parent Error with our error message.

// When JavaScript encounters an error, it can record where the error happened.
// For example:

// Error: User not found
//     at registerUser (user.controller.js:25)
//     at processRequest (...)
//     ...

// This information is called the stack trace.

// It helps you debug:

// "Where exactly did this error come from?"
// you don't have to manually provide the stack.

// JavaScript generates it for you.