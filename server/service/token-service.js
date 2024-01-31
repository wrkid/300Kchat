const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require("../config");
const Token = require("../models/Token")

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: "30m"});
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: "30d"});
    return {
      accessToken,
      refreshToken
    }
  };

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, JWT_ACCESS_SECRET);
      console.log(userData)
      return userData;
    } catch(err) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, JWT_REFRESH_SECRET);
      return userData;
    } catch(err) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({user: userId})
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({user: userId, refreshToken})
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.deleteOne({refreshToken});
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({refreshToken});
    return tokenData;
  }
};

module.exports = new TokenService();