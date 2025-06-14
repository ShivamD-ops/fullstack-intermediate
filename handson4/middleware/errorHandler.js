function errorHandler(err, req, res, next) {
  console.error("Error caught by middleware:", err);

  const status = err.status || 500;
  let message = err.message || "Internal Server Error";

  if (status === 500) {
    message = "Something went wrong. Please try again later.";
  }

  res.status(status).json({ error: message });
}
module.exports = errorHandler;
