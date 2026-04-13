const sendSuccess = (res, data, message = "OK") => {
  return res.json({
    success: true,
    message,
    data,
  });
};

module.exports = {
  sendSuccess,
};
