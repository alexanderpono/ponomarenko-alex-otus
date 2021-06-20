const { I } = inject();

module.exports = {
  select: {
    accounts: 'select[name=listAccounts]'
  },

  button: {
    getAccount: '#btnGetAccount',
    btRecentTransactions: '#MenuHyperLink2'
  },

  gotoAccount(account) {
    I.click(this.select.accounts);
    I.selectOption(this.select.accounts, account);
    I.click(this.button.getAccount);
  },

  gotoRecentTransactions() {
    I.click(this.button.btRecentTransactions);
  }

}


