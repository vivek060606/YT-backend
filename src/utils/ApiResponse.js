class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export { ApiResponse }


// Instead of every controller writing:

// res.status(200).json({
//     statusCode: 200,
//     data: user,
//     message: "User fetched successfully"
// });

// you can create a reusable response structure.

// Conceptually:

// new ApiResponse(
//     200,    //This 200 is just being stored inside your JSON response body.
//     user,
//     "User fetched successfully"
// );

// So your API responses have a consistent format.


// 200 → OK
// 201 → Created
// 400 → Bad Request
// 401 → Unauthorized
// 404 → Not Found
// 500 → Server Error



// return res
//     .status(200)
//     .json(
//         new ApiResponse(
//             200,
//             user,
//             "User fetched successfully"
//         )
//     );
// why status code two times?
// res.status(200)

// This sets the actual HTTP response status that Express will send to the client.

// So the HTTP response looks conceptually like:

// HTTP/1.1 200 OK

// This is part of the HTTP protocol.