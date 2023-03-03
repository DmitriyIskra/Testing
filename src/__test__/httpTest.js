const {httpGet} = require('../http');
const {loadUser} = require('../user');
jest.mock('../http'); // говорим что этот файл должен стать моком

beforeEach(() => { // Перед каждым тестом сбрасываем все моки и все изначальные данные которые в них могли бы быть
    jest.resetAllMocks();
});
test('should call loadUser once', () => {
    httpGet.mockReturnValue(JSON.stringify({})); // говорим что httpGet должен вернуть в строковом эквиваленте объект
    loadUser(1); // единичка будет с помощью функции loadUser подставлена в строку
    expect(httpGet).toBeCalledWith('http://server:8080/users/1'); // убеждаемся что функция httpGet была вызвана (toBeCalledWith) с параметром users/1
});


// beforeEach - стандартная функция которая есть в каждом тесте, она выполняется каждый раз когда у нас запускается тот или иной тест