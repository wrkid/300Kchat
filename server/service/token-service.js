const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require("../config");

class TokenService {
  generateTokens(payload) {
    accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: "30m"});
    refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: "30d"});
    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({user: userId})
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({user: userId, refreshToken})
    return token;
  }
};

module.exports = new TokenService();