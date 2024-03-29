## JEST - самая популярная система тестирования

Jest можно установить как в виде npm зависимости так и в виде плагина для VSC 

1. npm i --save-dev jest
2. npm i --save-dev @babel/core @babel/cli @babel/preset-env
3. npm i core-js@3
4. npm i --save-dev eslint
5. npm i --save-dev eslint-config-airbnb-base


1. Установим Jest npm i --save-dev jest  
2. Подключим babel-jest, для работы babel подключим      npm i --save-dev @babel/core @babel/cli @babel/preset-env
  - env для транспиляции из стандарта EcmaScript 6 в более раннюю
  - babel-core
  - babel-cli
1. Установим core/js  -- будет распознавать какие части js нужно будет транспилировать npm i core-js@3
2. Создаем .babelrc в корне проекта и в нем пишем
    { 
       "presets": [
            ["@babel/preset-env", {  // Настройка и параметры к настройке
                "useBuiltIns": "usage",
                "corejs": 3
            }]
       ] 
    } 
3. Создаем папку test
4. Создадим файд test.js и в нем создадим первый тест
        //  test(description, work) -- самый базовый тест
        //  description  --  описание что будет сделано
        //  work --  какая то функция где производится непосредственно сама проверка и сравнение с эталоном

        // expect() -- функция которая производит сравнение
        [Документация по expect](https://jestjs.io/docs/ru/expect)
5. В scripts заменим результат команды test на то что нам нужно
6.  Запустим npm test
 
## Jest с ESlint

1. Установим ESlint npm i --save-dev eslint
2. Добавим команду в scripts
3. Создадим конфигурационный файл для eslint
    {
      "env": {
        "browser": true,
        "es2021": true,
        "jest": true
      },
      "extends": "airbnb-base", 
      "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
      }
    }
4. Установим конфигурационный пакет для airbnb  npm i --save-dev eslint-config-airbnb-base
5. В конфигурациооный файл eslint добавим специальный параметр "jest": true. Это для того чтобы eslint не ругался на синтаксис тестов (по какой то причине не работает в конспектах, ругается на jest, но работает в домашках)


## Напишем тест на функцию которая будет сумировать покупки, выщитывать общую сумму

1. Создадим src  calculate.js
2. Напишем в нем функцию которая будет считать переданный в нее массив даных
3. экспортируем
4. импортируем в test и в фунции test создаем массив и передаем его в функцию считалку, полученный результат сравниваем с эталоном


## Можно использовать не comonJS, а ESModules 

В jest есть такая возможность, соответственно можно писать тест для браузера, для вывода в браузере.
Если использовать common то тестируем только в консоли в node, у ноды нет webapi
 
## Важно!!
- Файл test должен находится рядом с файлом который тестируем
- В каталоге с тестируемым файлом создаем папку __test__ С двумя нижними подчеркиваниями
- Файл теста можно назвать как угодно главное тематически

- EXPECT если убрать то test будет работать и возвращать что все хорошо
  
## Хороший тон

- Не использовать конструкции типа if и for. Код должен быть максимально линейным и простым. Что то выполнили сравнили и все.

- В рамках одного теста используем один expect, под одну конкретную небольшую задачу один тест, чтобы не объединялись результаты




## ПОКРЫТИЕ КОДА

Покрытие кода это возможность увидеть каждый ли файл протестирован и какой процент проекта протестирован

npm test -- --coverage  --  встроенная в jest команда позволяющая вывести в консоль информацию о покрытии кода тестами


- Информацию о необходимости покрытия кода можно увидеть в визуальном отчете
   При запуске теста на покрытие --coverage создается специальная папка coverage которая содержит папку lcov-report, в ней есть html файл.
   Запустим его в браузере.
   Увидим визуально сколько покрыто, сколько линий файла покрыто.
   ГЛАВНОЕ если нажать на файл, то увидим какая именно строчка не покрыта тестом.
             Iif(applyDiscount) {    // Если applyDiscount true то возвращаем сумму пополам
                  return summ * 0.5;
              }   
              конечно при условии если мы уберем или закоментируем тест, или просто мы его не писали, короче тест не видно.

- Если у нас в вычислениях или в результатах вычислений присутствуют числа с плавающей точкой (дробные), то из за проблем js с точностью вычислений при сравнении тест может показать что есть проблема, вычисление не соответствует ожиданию.
      Для решения этой проблемы при сравнении нужно использовать другой метод сравнения, не toBE С методами можно ознакомиться на сайте Jest, обычно методы сравнения начинаются на to
      В данном случае подойдет toBeCloseTo() - т.е. близкое к этому значению.


- Как понять что хватит писать тесты
  1. Главное проверить крайние значения, например не соответствует ли каким то совсем уж неадекватным вариантам



## Data Driven-тесты

Позволяет переиспользовать один тест для разных данных, c получением разных результатов

1. Создадим файд cashback.js
2. Создадим объект кешбека

      const cashback = {
        regular: {
          bound:1000,
          percent: 1,
        },
        silver: {
          bound: 10000,
          percent: 2,
        },
        gold: {
          bound: 100000,
          percent: 5,
        },
      };
3. Создадим функцию для расчета кешбека
4. Cоздадим для нашего файла кешбек свой файл теста (так положено для каждого файла свой файл тест)
5. Теперь нужно проверить каждое условие которое указано в функции расчета, для этого существует функция 
        test.each(
          [
            ['gold', 100000, 5000],
            ['silver', 10000, 200],
            ['regular', 1000, 10],
            ['no', 500, 0]
          ] 
        )(
          ('should calculate cashback for %s level with %i amount'),
          (level, amount, expected) => {
            const result = calculateCashback(amount);

            expect(result).toBe(expected);
          }
        )   // Описание в файле


## Mocks

Это специально сзданный объект-заглушка, который может эмулировать необходимое поведение при тестировании
Иногда нужно связаться с внешним сервисом каким нибудь сервером или чем то подобным, и что бы упростить тестирование не делать реальных запросов, можно использовать моки.

1. Допустим нужно сделать запрос, вместо этого создадим функию которая будет возвращать просто пустой объект в JSON формате

Моки не плохая конструкция полезная, но если слишком часто к ним возвращаться мы получим избыточное увеличение кода
Поэтому нужно стараться использовать их реже

beforeEach запускается переда каждым тестом

afterEach запускается после каждого теста

beforeAll запускается перед всеми тестами единоразово

afterAll запускается после всех тестов единоразово



## CONTINUOUS INTEGRATION  appVeyor  непрерывная интеграция

Непрерывная интеграция это запуск сборки и тестирования когда делается очередной коммит и пуш в репозиторий

appVeyor - один из сервисов непрерывной интеграции

1. На appVeyor дадим доступ на чтение наших репозиториев кнопка "authorize github"
2. Authorize appveyor
3. Выбираем нужный репо жмем Add
4. Далее настраиваем токен гитхаба
    - Settings
    - Environment (в левом блоке)
    - кнопка Add variable
    - в поле name GITHUB_TOKEN
    - создаем токен  галочку ставим только в repo  (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)
    - устанавливаем токен в value 
    - должна появиться сообщение что информация о нашем проекте применилась и после обновления страницы токен не должен исчезнуть
There was an error while trying to complete the current operation. Please contact AppVeyor support.
4. Чтобы не настраивать проект в ручную в корень проекта добавляем .appveyor.yml со всей конфигурацией appveyor, должен храниться в самом репозитории на github, тогда appveyor будет автоматически получать настройки из него.
5. appVeyor может ругаться на отсутствие пакета eslint-plugin-import@latest --save-dev нужно установить
6. пушим снова ведт package поменялись
7. если есть ошибки eslint исправляем и снова пушим
8. В репозитории видно статус appveyor (кружочек)
  
  **Бейджик**
1. settings
2. badjes
3. третий пункт sample markdown code копируем
4. в проекте создаем файл readme и добавляем туда бейджик
5. пушим
6. в репо в файле readme видно на бейджике статус сборки и в кружочке в углу


## HUSKY

Позволяет запускать скрипты по наступлении определенного события например при создании коммита перед тем как создать коммит будет проводиться тестирование и проверка eslint, ну или что то еще

1. Установим пакет npm i -D husky    (-D то же самое что и --save-dev)
2. В scripts создаем команду  "prepare": "husky install"
3. Запускаем npm run prepare
4. создасться дирректория husky
5. Создадим первый так называемый хук - скрипт который будет работать по какому нибудь событию
6. Пусть скрипт запускается перед push, запускать будем eslint с тестом
      npx husky add .husky/pre-commit *npm run lint && npm-test*
7. Добавляем commit и перед добавлением должны сработать скрипты