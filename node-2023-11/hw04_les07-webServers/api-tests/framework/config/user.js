const tom = 'tom:p';
const wrongPass = 'peter:wrongPass';
const noSuchUser = 'micle:123';
const adminUser = 'nick:p';

const user = {
    localCoursesApi: {
        usualUser: 'Peter',

        creds: {
            userNotFound: `Basic ${btoa(noSuchUser)}`,
            wrongPassword: `Basic ${btoa(wrongPass)}`,
            userRole: `Basic ${btoa(tom)}`,
            adminRole: `Basic ${btoa(adminUser)}`
        }
    }
};

module.exports = {
    user
};
