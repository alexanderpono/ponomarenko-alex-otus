var express = require('express');
var router = express.Router();
const User = require('../service/mongoose').User;

router.post('/', async function (req, res, next) {
    const users = await User.find({}, 'name login pass');

    await User.deleteMany({});
    const users2 = await User.find({}, 'name login pass');

    const user = new User({
        name: 'Peter',
        login: 'peter',
        pass: 'p'
    });

    await user.save();

    res.send({ result: 'post reset' });
});

module.exports = router;
