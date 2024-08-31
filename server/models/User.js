const Model = require('../utils/db/Model');
const { ID_TYPE } = require('../config/constants');

class User extends Model {
  static modelName = 'users';

  constructor(name, email, password, role) {
    super(ID_TYPE.INCREMENT);
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  static async create(user) {
    const { name, email, password, role } = user;
    const newUser = await super.create(User.modelName, name, email, password, role);
    return newUser;
  }

  static async find(options) {
    const users = await super.find(User.modelName, options);
    return users;
  }

  static async findById(id) {
    const user = await super.findById(User.modelName, id);
    return user;
  }

  static async findOne(options) {
    const user = await super.findOne(User.modelName, options);
    return user;
  }

  static async update(id, user) {
    const updatedUser = await super.update(User.modelName, id, user);
    return updatedUser;
  }

  static async delete(id) {
    const deletedUser = await super.delete(User.modelName, id);
    return deletedUser;
  }
}

async function testCreate() {
  const user = {
    name: 'test',
    email: 'test@gmail.com',
    password: 'password',
    role: 'admin',
  };

  for (let i = 0; i < 2; i++) {
    const newUser = await User.create(user);
    console.log(newUser);
  }
}

async function testFind() {
  const users = await User.find();
  console.log(users);
}

async function testFindById() {
  const user = await User.findById(1);
  console.log(user);
}

async function testFindOne() {
  const user = await User.findOne({ name: 'Admin Admin' });
  console.log(user);
}

async function testUpdate() {
  const user = {
    name: 'Admin Admin',
    email: 'newAdmin@gmail.com',
    password: 'newPassword',
    role: 'user',
  };

  const updatedUser = await User.update(1, user);
  console.log(updatedUser);
}

async function testDelete() {
  const deletedUser = await User.delete(1);
  console.log(deletedUser);
}

// testCreate();
// testFind();
// testFindById();
// testFindOne();
// testUpdate();
// testDelete();

module.exports = User;
