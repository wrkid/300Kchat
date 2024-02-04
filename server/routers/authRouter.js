const Router = require('express');
const router = new Router();
const controller = require('../controllers/authController');
const {check, body} = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/registration', [
  check("login", "Login не может быть пустым.").notEmpty(),
  check("username", "Имя пользователя не может быть пустым.").notEmpty(),
  check("password", "Пароль должен быть больше 4 и меньше 10 символов.").isLength({min: 4, max: 10})
], controller.registration);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.get('/refresh', controller.refresh);
router.get('/users', authMiddleware, controller.getUsers); //[roleMiddleware(["ADMIN"]), authMiddleware]

module.exports = router;