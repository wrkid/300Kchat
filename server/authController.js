const User = require('./models/User');
const bcrypt = require('bcryptjs');
const UserService = require('./service/user-service');
const UserDto = require('./dtos/user-dto');
const tokenService = require('./service/token-service');
const { validationResult }  = require('express-validator');
const ApiError = require('./exceptions/api-error');
const userService = require('./service/user-service');

class authController {

  //-=-=-=-=-=-=-=-= Регистрация
  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadReguest('Ошибка при валидации', errors.array()))
      }

      const {login, username, password } = req.body;
      const userData = await UserService.registration(login, username, password); // регистрируем пользователя
      
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) // 30 дней создаем рефреш куки
      return res.status(200).json(userData); // возвращем на клиента токены и данные

    }catch (err) {
      next(err);
    }
  }

  //-=-=-=-=-=-=-=-=-=- Логин
  async login(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadReguest('Ошибка при валидации', errors.array()))
      }

      const { login, password } = req.body;
      const userData = await UserService.login(login, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) // 30 дней создаем рефреш куки
      return res.status(200).json(userData); // возвращем на клиента токены и данные
    } catch (err) {
      next(err);
    }
  }

  async logout (req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (err) {
      next(err);
    }
  }

  async refresh (req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const userData = await UserService.refresh(login, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) // 30 дней создаем рефреш куки
      return res.status(200).json(userData); // возвращем на клиента токены и данные
    } catch (err) {
      next(err);
    }
  }

  //-=-=-=-=-=-=-=-=-=- Получить список пользователей (только для админов)
  async getUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(err);
    }
  }
}


module.exports = new authController();
// req - присылает пользователь
// res - возврщаем пользователю