const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const createError = require('http-errors');
require('dotenv').config();
const routerModule = require('./api/routes');


const swaggerJsDoc = require('./api/services/swagger');
const swaggerFile = swaggerJsDoc();

// init app dependencis
require('./init')();

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

// TODO ::route need to be implemented dynamically
routerModule(app);

// app.use('/api/', userRouter)
// app.use('/api/', authRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next();
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err)
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


// listening to the port
app.listen(config.APP_CONFIG.PORT, config.APP_CONFIG.HOST, async () => {
    console.log('Server started.')
    // starting the DB
    await db.init()
});


const exitHandler = async (e) => {
    console.log(e)
    await db.tearDown()
}

process.on('uncaughtException', exitHandler)
process.on('unhandledRejection', exitHandler)
process.on('SIGTERM', exitHandler)
process.on('SIGINT', exitHandler)

module.exports = app;