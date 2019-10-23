console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');


//Express cookie implementation
const cookieParser = require('cookie-parser')


// Hash Implementation
var sha256 = require('js-sha256');
var SALT = "SALTY"

// Initialise postgres client
const configs = {
  user: 'tanweekiat',
  host: '127.0.0.1',
  database: 'workout_routine',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);
app.use(cookieParser());

/**
 * ===================================
 * Routes
 * ===================================
 */

 app.get('/',(request,response) => {
     response.render('home');
 });
 //********************************************************************************************************************

app.get('/register',(request,response) => {
    response.render('register');
    console.log(request.body);
});
//********************************************************************************************************************

app.post('/register',(request,response) => {
    let hashedPassword = sha256(request.body.password + SALT);

   const queryString= 'INSERT INTO users (name,password) VALUES ($1,$2) RETURNING *';
   const values = [request.body.name,hashedPassword];

   pool.query(queryString,values, (err,result)=>{
       if (err){
           console.log(err);
           response.send('query error')
       }else {
           response.send(result.rows);
       }
   });
});
//********************************************************************************************************************
app.get('/login',(request,response) => {
    response.render('login');
});

app.post('/login',(request,response) => {
    let requestUsername = request.body.name;
    let requestPassword = request.body.password;

    const queryString = "SELECT * from users WHERE name='"+requestUsername+"'";

    pool.query(queryString, (err,result) =>{
        if(err) {
            response.send('query error')
        } else {
            console.log(result.rows);

            if (result.rows.length > 0) {
                let hashedRequestPassword = sha256(requestPassword + SALT);
                console.log(hashedRequestPassword);
                if(hashedRequestPassword === result.rows[0].password) {
                    let user_id = result.rows[0].id
                    let hashedCookie = sha256(SALT + user_id);

                    response.cookie('user_id', user_id);
                    response.cookie('hasLoggedIn',hashedCookie);

                    response.redirect('/workout')

                }else {
                    response.status(403).send('wrong password');
                }
            }else{
        response.status(403).send('no username');
        }
    }
});
});
 //********************************************************************************************************************
 app.get('/workout',(request,response) => {
     const queryString = "SELECT * from workout_types";
     pool.query(queryString,(err,result) => {
         if(err) {
             response.send('query error')
         } else if (result.rows.length > 0) {
                    let user_id = result.rows[0].id
                    let hashedCookie = sha256(SALT + user_id);

                    response.cookie('user_id', user_id);
                    response.cookie('hasLoggedIn',hashedCookie);
                    
                    let data = {
                        
                        workouts: result.rows
                    }

                    response.render('workout', data)
                };
            });
        });
//********************************************************************************************************************

app.get('/workout/chest',(request,response) =>{
    const queryString = "SELECT * from exercises WHERE workout_types_id =1";
    pool.query(queryString,(err,result) => {
        if(err) {
            response.send('query error')
        } else if (result.rows.length > 0) {
                   let user_id = result.rows[0].id
                   let hashedCookie = sha256(SALT + user_id);

                   response.cookie('user_id', user_id);
                   response.cookie('hasLoggedIn',hashedCookie);
                   
                   let data = {
                       
                       exercises: result.rows
                   }

                   response.render('chest', data)
                };
            });
        });


 //********************************************************************************************************************
app.get('/special', (request,response) => {
    let user_id = request.cookie['user_id'];
    let hashedValue = sha256(user_id + SALT);

    if(request.cookies['hasLoggedIn'] === hashedValue){
        response.send("YOU CAN DO IT!!!, GROUP HUG IN THE SHOWER TONIGHT")
    } else{
        response.send('SEND HELP ');
    }
});














/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
