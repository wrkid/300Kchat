const User = require('../models/User');
const tokenService = require('../service/token-service');
const UserDto = require('../dtos/user-dto');
const bcrypt = require('bcryptjs');
const ApiError = require('../exceptions/api-error');


class UserService {
  //-=-=-=-=-=-=-=-= Регистрация
  async registration(login, username, password) {
      const candidate = await User.findOne({login}); // ищем в существующем бд логин ользователя
      if (candidate) { // если в бд найден логин - значит уже существует
        throw ApiError.BadReguest(`Пользователь ${login} уже существует.`)
      }

      const hashPassword = bcrypt.hashSync(password, 7); //хешируем полученный пароль
      const user = await User.create({login, username, password: hashPassword}); // создаем в бд данные о пользователе
      
      const userDto = new UserDto(user); // id, login...  создаем объект с _id и login
      const tokens = tokenService.generateTokens({...userDto}); // генерируем токены
      await tokenService.saveToken(userDto.id, tokens.refreshToken); // сохраняем токены

      return { ...tokens, user: userDto } //возвращаем в контроллер токены и инфо о юзере
  }

  async login(login, password) {
    const user = await User.findOne({login});
    console.log(login, password)
    if (!user) {
      throw ApiError.BadReguest('Пользователь с таким логином не найден.')
    }

    const validatePassword = bcrypt.compareSync(password, user.password); // сравниваем захешированные пароли
    if (!validatePassword) {
      throw ApiError.BadReguest('Неверный пароль.');
    }

    const userDto = new UserDto(user); // id, login...  создаем объект с _id и login
    const tokens = tokenService.generateTokens({...userDto}); // генерируем jwt по id и login
    await tokenService.saveToken(userDto.id, tokens.refreshToken); // сохраняем токены

    return { ...tokens, user: userDto } //возвращаем в контроллер токены и инфо о юзере
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  };

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnathorizedError();
    }
    
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData  || !tokenFromDb) {
      throw ApiError.UnathorizedError();
    }
    const user = await User.findById(userData.id)
    const userDto = new UserDto(user); // id, login...  создаем объект с _id и login
    const tokens = tokenService.generateTokens({...userDto}); // генерируем jwt по id и login
    await tokenService.saveToken(userDto.id, tokens.refreshToken); // сохраняем токены

    return { ...tokens, user: userDto } //возвращаем в контроллер токены и инфо о юзере
  }

  async getAllUsers () {
    const users = User.find();
    return users;
  };
};

module.exports = new UserService();