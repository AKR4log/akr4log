const ApiError = require('../../services/error/api_errors')

module.exports = function (error, req, res, next) {
    if (error instanceof ApiError) {
        return res.status(error.status).json({ message: error.message })
    }
    return res.status(500).json({ message: "Unknown error" })
}