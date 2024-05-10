const dotenv = require(`dotenv`);
const express = require(`express`);
const mongoose = require(`mongoose`);
const bodyParser = require(`body-parser`);
const routes = require(`./routes/routes.js`);
const exphbs = require(`express-handlebars`);
const hbs = require(`hbs`);
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const connect = require('./public/database/server.js');
const { mainModule } = require('process');
const app = express();

dotenv.config();

const port = 3000;

app.use(cookieParser());

app.set(`view engine`, `hbs`);
hbs.registerPartials(__dirname + '/Views/Partials');

app.use(express.static(`Public`));
app.use(bodyParser.urlencoded( {extended: false} ))
app.use(`/`, routes);

app.listen(port, async function(){
    console.log("Running on port: " + port);
    try{
        await connect();
        console.log("connected to database!");
    }catch(err){
        console.error(err);
        console.log("Failed to connect to database");
    }
  });
  