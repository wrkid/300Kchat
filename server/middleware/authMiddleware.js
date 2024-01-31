const jwt = require('jsonwebtoken');
const {JWT_ACCESS_SECRET} = require('../config');
const ApiError = require("../exceptions/api-error");
const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
  if(req.method === "OPTIONS") 
    next();

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.UnathorizedError());
    }

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnathorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnathorizedError());
    }

    req.user = userData;
    console.log(req.user)
    next();
  }catch(e) {
    return next(ApiError.UnathorizedError());
  }
}