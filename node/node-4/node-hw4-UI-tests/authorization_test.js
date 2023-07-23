Feature('authorization');

Scenario('Админ может авторизоваться', ({I, loginPage}) => {
    I.amOnPage('/login');
    loginPage.login('Anton2');
    I.see('Добро пожаловать, Anton2! Ваша роль: admin');
});

Scenario('Админ может выйти из авторизации', ({I, loginPage, currentPage}) => {
    I.amOnPage('/login');
    loginPage.login('Anton2');

    currentPage.logout();
    I.see('Введите имя');
});

Scenario('Пользователь может авторизоваться', ({I, loginPage}) => {
    I.amOnPage('/login');
    loginPage.login('Kate');
    I.see('Добро пожаловать, Kate! Ваша роль: user');
});

Scenario('Пользователь может выйти из авторизации', ({I, loginPage, currentPage}) => {
    I.amOnPage('/login');
    loginPage.login('Kate');

    currentPage.logout();
    I.see('Введите имя');
});

Scenario('Админ видит пункт Users в меню', ({I, loginPage}) => {
    I.amOnPage('/login');
    loginPage.login('Anton2');
    I.see('Users');
});

Scenario('Админ может зайти в раздел Users', ({I, loginPage, currentPage}) => {
    I.amOnPage('/login');
    loginPage.login('Anton2');
    currentPage.gotoUsers();
    I.see('Список пользователей');
});

Scenario('Авторизованный обычный пользователь не видит пункт Users в меню', ({I, loginPage}) => {
    I.amOnPage('/login');
    loginPage.login('Kate');
    I.dontSeeElement('#btUsers');
});

Scenario('Неавторизованный пользователь не видит пункт Users в меню', ({I, loginPage}) => {
    I.amOnPage('/login');
    I.dontSeeElement('#btUsers');
});
