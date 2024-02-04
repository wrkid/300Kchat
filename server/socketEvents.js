const Message = require('./models/messageModel');

module.exports = (io, socket) => {
  console.log('Sockets connected');

  socket.on('chat message', async (msg) => {
    console.log('message: ' + msg);

    // Создаем новый объект сообщения
    const newMessage = {
      username: msg.username,
      userid: msg.userid,
      content: msg.content,
      timestamp: msg.timestamp
    };

    try {
      // Сохраняем сообщение в базе данных
      const savedMessage = await Message.create({...newMessage});

      // Отправляем сохраненное сообщение всем клиентам
      io.emit('chat message', savedMessage);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
  });
};