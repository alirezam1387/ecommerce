const AsyncHandler = (functions) => (req, res, next) => {
  Promise.resolve(functions(req, res, next)).catch(next);
};

module.exports = AsyncHandler;
