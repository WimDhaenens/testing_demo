
module.exports.getUserSync = function(id) {
  console.log('Reading a user from the database...');
  return { id: id, name: 'Benjamin', email:'benjamin@hogent.be' };
}

module.exports.getUser = async function(id) {
  return new Promise((resolve, reject) => {
    console.log('Reading a user from the database...');
    resolve({ id: id, name:'Benjamin', email:'benjamin@hogent.be' });
  });
}