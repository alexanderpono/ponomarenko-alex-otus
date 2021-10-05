const { I } = inject();

module.exports = {
  button: {
      logout: '#btLogout',
      users: '#btUsers'
  },

  logout() {
    I.click(this.button.logout);
  },

  gotoUsers() {
    I.click(this.button.users);
  }
}
