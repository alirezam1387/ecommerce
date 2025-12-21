const AsyncHandler = require("../utils/asyncHandller");
const ErrorHandler = require("../middlewere/ErrorHandler")

const register = AsyncHandler((req, res, next) => {
    console.log(res)
    return next(new ErrorHandler('email is wrong', 400))

})
const login = () => { };
const update = () => { };
const logout = () => { };
const forgotPassword = () => {};
