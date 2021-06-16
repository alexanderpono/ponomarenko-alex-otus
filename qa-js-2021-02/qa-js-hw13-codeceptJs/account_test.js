Feature('account');

Scenario('Пользователь может просмотреть данные по аккаунту 800000 Corporate', ({ I, loginPage, accountPage }) => {
    I.amOnPage('/login.jsp');
    loginPage.login('admin', 'admin');

    accountPage.gotoAccount('800000');
    I.see('Account History - 800000 Corporate');
});

Scenario('Пользователь может просмотреть данные по аккаунту 800001 Checking', ({ I, loginPage, accountPage }) => {
    I.amOnPage('/login.jsp');
    loginPage.login('admin', 'admin');

    accountPage.gotoAccount('800001');
    I.see('Account History - 800001 Checking');
});

Scenario('Пользователь может просмотреть информацию о последних транзакциях', ({ I, loginPage, accountPage }) => {
    I.amOnPage('/login.jsp');
    loginPage.login('admin', 'admin');

    accountPage.gotoRecentTransactions();
    I.see('Recent Transactions');
});
