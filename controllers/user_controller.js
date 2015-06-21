var users = {
    admin: {id: 1, username: "admin", password: "123456"},
    pepe:  {id: 2, username: "pepe", password: "12345"}}

exports.autenticar = function (login, password, callback) {
  if (users[login]) {
    if (password === users[login].password) {
      callback(null, users[login])
    } else {
      callback(new Error('Password Erróneo'))
    }
  } else {
    callback(new Error('No existe el usuario'))
  }
}
