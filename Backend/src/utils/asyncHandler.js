const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promis.resolve(requestHandler(req, res, next)).catch((error) =>
            next(error)
        );
    };
};

export { asyncHandler };
