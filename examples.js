const db = require('./db');
const mail = require('./mail');

// Testing numbers
module.exports.absolute = function(number) {
  if (number > 0) return number;
  if (number < 0) return -number;
  return 0;
}

// Testing strings
module.exports.greet = function(name) {
  return 'Hello ' + name;
}

// Testing arrays
module.exports.getPlaces = function() {
  return ['Irish Pub', 'Dranken Geers', 'Loon'];
}

// Testing objects
module.exports.getPlace = function(id) {
  return { id: id, name:'Dranken Geers' };
}

// Testing exceptions
module.exports.addPlace = function(name) {
  if (!name) throw new Error('Name is required.');
  return { id: 1, name }
}

// Mock sync functions
module.exports.updateEmail = function(id,email ) {
  const user = db.getUserSync(id);
  user.email = email;
  return user;
}

// Mock async functions
module.exports.notifyUser = async (id) => {
  try {
    const user = await db.getUser(id);
    if (user) mail.send(user.email, 'Notification message');
  } catch(err){
    console.log("user doesn't exist");
  }
}