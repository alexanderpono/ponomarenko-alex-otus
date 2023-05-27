"use strict";
exports.__esModule = true;
exports.ModelFactory = void 0;
var TestStorage_1 = require("./models/TestStorage");
var AppStorage_1 = require("./models/AppStorage");
var testModel = null;
var appModel = null;
var ModelFactory = /** @class */ (function () {
    function ModelFactory() {
    }
    ModelFactory.getModel = function (mode) {
        if (mode === 'test') {
            if (testModel === null) {
                testModel = new TestStorage_1.TestStorage();
                testModel.setStartData(ModelFactory.createTestData());
            }
            return testModel;
        }
        else {
            if (appModel === null) {
                appModel = new AppStorage_1.AppStorage();
            }
            return appModel;
        }
    };
    ModelFactory.createTestData = function () {
        var Kate = { name: 'Kate' };
        var Peter = { name: 'Peter' };
        var startData = {
            users: [Kate, Peter],
            courses: [
                { id: 'c1', caption: 'Mathematics' },
                { id: 'c2', caption: 'Physics' }
            ]
        };
        return startData;
    };
    return ModelFactory;
}());
exports.ModelFactory = ModelFactory;
