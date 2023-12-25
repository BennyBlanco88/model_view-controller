const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    helpers
});
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


// const sess = {
//     secret: process.env.DB_SECRET,
//     cookie: {},
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//         db: sequelize,
//         checkExpirationInterval: 1000 * 60 * 10, // will check every 10 minutes
//         expiration: 1000 * 60 * 30 // will expire after 30 minutes
//     })
// };
const sess = {
    // Signs the session
    secret: 'Super secret secret',
    // This IS essentially the session
    cookie: {
      // when the cookie will expire (in ms)
      maxAge: 300000,
      // prevents access through JS in the client
      httpOnly: true,
      // Server and Client will reject if not served from HTTPS
      secure: false,
      // Only sites on the same domain can use this cookie
      sameSite: 'strict',
    },
    // forces the session to be saved even if nothing changed
    resave: false,
    // forces a session to be saved when it is new regardless of if anything has changed
    saveUninitialized: true,
    // where to store the session on the server
    store: new SequelizeStore({
      db: sequelize
    })
  };

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(routes);

sequelize.sync();

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});