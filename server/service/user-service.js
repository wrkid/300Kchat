const User = require('../models/User');
const tokenService = require('../service/token-service')

class UserService {
  //-=-=-=-=-=-=-=-= Регистрация
  async registration(login, username, password) {
    try {
      const errors = validationResult(req); // проверка валидности по express-validator
      if (!errors.isEmpty()) {
        return res.status(400).json({message: 'Ошибка при регистрации.', ...errors});
      }
      const {login, username, password } = req.body; // получаем данные из тела запроса
      const candidate = await User.findOne({login}); // ищем в существующем бд пользователя
      if (candidate) { // если в бд найден - значит уже существует
        return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
      }
      const hashPassword = bcrypt.hashSync(password, 7); //хешируем полученный пароль
      const userRole = await Role.findOne({value: "USER"}) // определяем роль по дефолту юзер
      // const user = new User({login, username, password: hashPassword, roles: [userRole.value]}); // создаем эксземляр пользователя по схеме передаем параметрами логин пароль массив с ролью
      // await user.save(); // сохраняем в бд пользователя
      const user = await User.create({login, username, password: hashPassword, roles: [userRole.value]});
      const token = tokenService.generateTokens()



      return res.json(200, {message: 'Пользователь успешно зарегестрирован'})
    } catch (e) {
      console.log(e);
      res.status(400).json({message: 'Registration error'});
    }
  }
};

module.exports = new UserService();