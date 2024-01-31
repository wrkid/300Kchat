const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('./config');

const generateAccessToken = (id, roles) => {
  const payload = {
    id, 
    roles
  }
  return jwt.sign(payload,  JWT_ACCESS_SECRET, {expiresIn: "24h"})
}

class authController {

  //-=-=-=-=-=-=-=-= Регистрация
  async registration(req, res, next) {
    try {
      const errors = validationResult(req); // проверка валидности по express-validator
      if (!errors.isEmpty()) {
        return res.status(400).json({message: 'Ошибка при регистрации.', ...errors});
      }
      console.log(req.body)
      const {login, username, password } = req.body; // получаем данные из тела запроса
      const candidate = await User.findOne({login}); // ищем в существующем бд пользователя
      if (candidate) { // если в бд найден - значит уже существует
        return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
      }
      const hashPassword = bcrypt.hashSync(password, 7); //хешируем полученный пароль
      const userRole = await Role.findOne({value: "USER"}) // определяем роль по дефолту юзер
      const user = new User({login, username, password: hashPassword, roles: [userRole.value]}); // создаем эксземляр пользователя по схеме передаем параметрами логин пароль массив с ролью
      await user.save(); // сохраняем в бд пользователя
      return res.json(200, {message: 'Пользователь успешно зарегестрирован'})
    } catch (e) {
      console.log(e);
      res.status(400).json({message: 'Registration error'});
    }
  }

  //-=-=-=-=-=-=-=-=-=- Логин
  async login(req, res) {
    try {
      const { username, password } = req.body;
      console.log(req.body)
      const user = await User.findOne({username});
      if (!user) {
        return res.status(400).json('Пользователь с таким именем не найден');
      }
      const validatePassword = bcrypt.compareSync(password, user.password);
      if (!validatePassword) {
        return res.status(400).json("Неверный пароль. Пробуй еще )))")
      }
      const token = generateAccessToken(user._id, user.roles); // генерируем jwt по id и ролям
      return res.json({"Bearer": token});
    } catch (e) {
      console.log(e);
      res.status(400).json({message: 'Login error'});
    }
  }

  async logout (req, res, next) {
    try {

    } catch (err) {

    }
  }

  async refresh (req, res, next) {
    try {

    } catch (err) {

    }
  }

  //-=-=-=-=-=-=-=-=-=- Получить список пользователей (только для админов)
  async getUsers(req, res) {
    try {
      // const userRole = new Role();
      // const adminRole = new Role({value: "ADMIN"})
      // await userRole.save();
      // await adminRole.save();
      // только первый раз сохрянем в слайс roles роли админ и юзер
      
      const users = await User.find();
      res.json(users)
    } catch (e) {
      console.log(e);
      res.status(400).json({message: 'users error'});
    }
  }
}


module.exports = new authController();
// req - присылает пользователь
// res - возврщаем пользователю