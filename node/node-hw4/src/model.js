"use strict";
exports.__esModule = true;
exports.model = void 0;
var models_1 = require("./models");
exports.model = new models_1.Model();
var Kate = { name: 'Kate' };
var Peter = { name: 'Peter' };
var startData = {
    users: [Kate, Peter],
    courses: [
        { id: 'c1', caption: 'Mathematics' },
        { id: 'c2', caption: 'Physics' }
    ]
};
exports.model.setStartData(startData);
