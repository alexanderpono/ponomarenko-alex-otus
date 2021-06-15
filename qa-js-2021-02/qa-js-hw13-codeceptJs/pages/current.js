const { I } = inject();

module.exports = {
  button: {
      logout: '#LoginLink'
  },

  logout() {
    I.click(this.button.logout);
  }
}
