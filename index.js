console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');


//Express cookie implementation
const cookieParser = require('cookie-parser')


// Hash Implementation
var sha256 = require('js-sha256');
// var SALT = process.env.SALT;
var SALT = SALTY;

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

app.post('/register',async (request,response) => {
    try{
        let hashedPassword = sha256(request.body.password + SALT);

        const queryString= 'INSERT INTO users (name,password) VALUES ($1,$2) RETURNING *';
        const values = [request.body.name,hashedPassword];
        let newUser = await pool.query(queryString,values);

        console.log(newUser);
        const newUserId = newUser.rows[0].id
        const queryString2 = "SELECT * from standard";
        let allStandard = await pool.query(queryString2);

        allStandard.rows.forEach(async (x)=>{
            let queryText = 'INSERT INTO exercises(name,workout_types_id,user_id,url,reps,sets) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
            let arr = [x.name,x.workout_types_id,newUserId,x.url,x.reps,x.sets];
            let result = await pool.query(queryText,arr);
        })
        response.redirect('/workout')


    }catch(error){
        console.log(error)
    }
    
});
//*************************************************************************************************************************************************
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
            console.log("xxxxx");
            console.log(result.rows);
                    
            if (result.rows.length > 0) {
                let hashedRequestPassword = sha256(requestPassword + SALT);
                console.log(hashedRequestPassword);
                if(hashedRequestPassword === result.rows[0].password) {
                    let user_id = result.rows[0].id
                    console.log(user_id)
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

 //***************************************************************************************************************************************************
 app.get('/workout',(request,response) => {
     const queryString = "SELECT * from workout_types";
     pool.query(queryString,(err,result) => {
         if(err) {
             response.send('query error')
         } else if (result.rows.length > 0) {
                  
                    let data = {
                        
                        workouts: result.rows
                    }

                    response.render('workout', data)
                };
            });
        });

    
//********************************************************************************************************************

app.get('/workout/:id',(request,response) =>{
     let user_id = request.cookies['user_id'];
    let id = parseInt(request.params.id);
    let inputValues = [id,user_id];
    const queryString = "SELECT * from exercises WHERE workout_types_id = ($1) AND user_id = ($2)";
    // let id = parseInt(request.params.id);
    // let inputValues = [id];
    // const queryString = "SELECT * from exercises WHERE workout_types_id =($1)";
    pool.query(queryString,inputValues,(err,result) => {
        if(err) {
            response.send('query error')
        } else if (result.rows.length > 0) {

                   
                   let data = {
                       
                       exercises: result.rows,
                       id : parseInt(request.params.id),
                    }

                   response.render('workingout', data)
                };
            });
        });
//******************************************************************************************************************************************************
app.get('/workout/:id/new',(request,response) =>{
   
    let id = parseInt(request.params.id);
    // let inputValues = [id];
    // const queryString = "SELECT * from exercises WHERE workout_types_id =($1)";
    // pool.query(queryString,inputValues,(err,result) => {
    //     if(err) {
    //         response.send('query error')

    //     } else {
    //         if (result.rows.length > 0) {
                
                let data = {
                    
                    // exercises: result.rows,
                    id : parseInt(request.params.id),
                    type: 'exercise'
                }

             response.render('new', data)
    //          } else {
    //              response.send('query ok but no result')
    //          }
    //     }
    // });
        
});

//******************************************************************************************************************************************************
app.post('/exercise',(request,response) => {

    let user_id = request.cookies['user_id'];
    let username = request.cookies['username'];
    let hashedValue = sha256( SALT + user_id );

    // if there is a cookie that says hasLoggedIn yes, let them access this page
    if( request.cookies['hasLoggedIn'] === hashedValue ){


        let name =(request.body.name);
        let workoutId=(request.body.workout_types_id);
        let userId = request.cookies['user_id'];
        let url =(request.body.url);
        let reps =(request.body.reps);
        let sets =(request.body.sets);

        let inputValues = [name,workoutId,userId,url,reps,sets];
        let queryText = 'INSERT INTO exercises(name,workout_types_id,user_id,url,reps,sets) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

        pool.query(queryText, inputValues, (err, results)=>{

            if (err) {
                console.log('query error:',err.stack);
            response.send('query error');
            } else {
                console.log('query result: result');
            response.redirect('/workout');
            
            }
        });
    };
});

//******************************************************************************************************************************************************  
app.get('/exercise/:id/edit',(request,response)=>{
    
    let id = parseInt(request.params.id);
    let data = {};
    data.id = id
    response.render('edit', data)
    // // let inputValues = [id];
    // let queryText = "SELECT * from exercises WHERE id = ($1) RETURNING *";

    // pool.query(queryText, inputValues, (err,results)=>{
      
    // })
});

app.put('/exercise/:id',(request,response)=>{
    console.log(request.body);
    let reps =request.body.reps;
    let sets =request.body.sets;
    let id = parseInt(request.params.id);
    let inputValues = [sets,reps,id];
    
    let queryText = "UPDATE exercises SET sets=($1), reps=($2)WHERE id=($3) RETURNING *";
    pool.query(queryText,inputValues,(err,result)=>{
        response.redirect('/workout');
    });
});


//******************************************************************************************************************************************************        
app.delete('/exercise/:id',(request,response)=>{
    
    let id = parseInt(request.params.id);
    let inputValues = [id];
    let queryText = "DELETE from exercises WHERE id = ($1) RETURNING *";

    pool.query(queryText, inputValues, (err,results)=>{
        response.redirect('/workout/1')
    })
});


 //*********************************************************************************************************************************************************
app.get('/special', (request,response) => {
    let user_id = request.cookie['user_id'];
    let hashedValue = sha256(user_id + SALT);

    if(request.cookies['hasLoggedIn'] === hashedValue){
        response.send("YOU CAN DO IT!!!, GROUP HUG IN THE SHOWER TONIGHT")
    } else{
        response.send('SEND HELP ');
    }
});
//******************************************************************************************************************************************************













/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
