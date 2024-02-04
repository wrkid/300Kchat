module.exports = class UserDto {
  username;
  login;
  id;

  constructor(model) {
    this.username = model.username;
    this.login = model.login;
    this.id = model._id;
  }
};