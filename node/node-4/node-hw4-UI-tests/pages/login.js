const { I } = inject();

module.exports = {
  fields: {
      username: '#uid',

  },
  button: {
      login: '#btSubmit'
  },


  login(email) {
      I.fillField(this.fields.username, email);
      I.click(this.button.login);
  }
}
