var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var courseRouter = require('./routes/course');

var apiRouter = require('./routes/api');
var apiCoursesRouter = require('./routes/apiCourses');
var apiUsersRouter = require('./routes/apiUsers');
var adminUsersRouter = require('./routes/adminUsers');
var apiLessonRouter = require('./routes/apiLesson');
var apiResetRouter = require('./routes/apiReset');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const originalSend = app.response.send;

app.response.send = function sendOverWrite(body) {
    originalSend.call(this, body);
    this.__custombody__ = body;
};

morgan.token('req-body', function (req, res) {
    return JSON.stringify(req.body);
});
morgan.token('res-body', function (req, res) {
    return JSON.stringify(res.__custombody__);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    morgan(
        ':method :url :status :response-time ms - "REQL:req[content-length]" - REQB:req-body - RESL::res[content-length] - RESB::res-body ',
        {
            stream: morgan.successLogStream,
            skip: function (req, res) {
                return res.statusCode >= 400;
            }
        }
    )
);

app.use(
    morgan(
        ':method :url :status :response-time ms - "REQL:req[content-length]" - REQB:req-body - RESL::res[content-length] - RESB::res-body ',
        {
            stream: morgan.errorLogStream,
            skip: function (req, res) {
                return res.statusCode < 400;
            }
        }
    )
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/courses', apiCoursesRouter);
app.use('/api/users', apiUsersRouter);
app.use('/api/lesson', apiLessonRouter);
app.use('/api', apiRouter);
app.use('/login', loginRouter);
app.use('/course', courseRouter);
app.use('/api/reset', apiResetRouter);
app.use('/admin/users', adminUsersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
