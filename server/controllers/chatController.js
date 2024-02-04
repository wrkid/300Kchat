const Message = require('../models/messageModel');

class ChatController { // СДЕЛАТЬ ПРОВЕРКУ НА ЗАЛОГИНЕНОГО ПОЛЬЗОВАТЕЛЯ
  async getMessages(req, res, next) {
    try {
      // Используем Mongoose для получения всех сообщений из базы данных
      const messages = await Message.find();

      // Отправляем сообщения в ответе
      res.json(messages);
    } catch (error) {
      // Если произошла ошибка, передаем управление обработчику ошибок
      next(error);
    }
  }
}

module.exports = new ChatController();