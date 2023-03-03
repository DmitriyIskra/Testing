const {httpGet} = require('../http');

function loadUser(id) {
    const data = httpGet(`http://server:8080/users/${id}`);  // В аргумент функции отправляем строку с нужным id, и она нам возвращает объект
                                                            // мы его как бы отправляем и получаем
    return JSON.parse(data);
}

module.exports = {
    loadUser
}