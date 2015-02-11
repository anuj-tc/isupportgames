module.exports = function (app) {
        app.use('/signup', require('./routes/signup'));
        app.use('/users', require('./routes/users'));
        app.use('/cities', require('./routes/cities'));
        app.use('/venues', require('./routes/venues'));
};
