const {I} = inject();

module.exports = {
    fields: {
        password: ('#passw'),
        username: ('#uid'),

    },
    button: {
        login: '[name=btnSubmit]'
    },
    

    login(email, password) {
        I.fillField(this.fields.username, email);
        I.fillField(this.fields.password, password);
        I.click(this.button.login);
    }
}
