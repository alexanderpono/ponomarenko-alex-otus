Feature('authorization');

Scenario('Пользователь может авторизоваться', ({I, loginPage}) => {
    I.amOnPage('/login.jsp');
    loginPage.login('admin', 'admin');
    I.see('Hello Admin User');
});

Scenario('Пользователь может выйти из авторизации', ({I, loginPage, currentPage}) => {
    I.amOnPage('/login.jsp');
    loginPage.login('admin', 'admin');
    currentPage.logout();
    I.see('Sign In');
});
