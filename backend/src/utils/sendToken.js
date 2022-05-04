const sendToken = (res, statusCode, user) => {
  const token = user.getJWTToken();

  //option for Cookies
  const option = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, option).json({
    success: true,
    user,
    token,
  });
};

export default sendToken;
