const Model = require('../utils/db/Model');
const { ID_TYPE } = require('../config/constants');

class User extends Model {
  constructor(name, email, password, role) {
    super(ID_TYPE.INCREMENT);
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  static initializeModel() {
    super.initializeModel('users');
  }

  static async create(user) {
    this.initializeModel();
    const { name, email, password, role } = user;
    const newUser = await super.create(name, email, password, role);
    return newUser;
  }

  static async find(options) {
    this.initializeModel();
    const users = await super.find(options);
    return users;
  }

  static async findById(id) {
    this.initializeModel();
    const user = await super.findById(id);
    return user;
  }

  static async findOne(options) {
    this.initializeModel();
    const user = await super.findOne(options);
    return user;
  }

  static async update(id, user) {
    this.initializeModel();
    const updatedUser = await super.update(id, user);
    return updatedUser;
  }

  static async delete(id) {
    this.initializeModel();
    const deletedUser = await super.delete(id);
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
