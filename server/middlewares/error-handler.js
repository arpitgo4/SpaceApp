
const errorHandler = (err, req, res, next) => {
    console.error(`error caught in error middleware: ${err}, req: ${req.url}`);
    res.status(500).json({
        message: err.message
    });
};

module.exports = {
    errorHandler
};