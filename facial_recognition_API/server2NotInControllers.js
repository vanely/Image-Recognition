const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const pg = require('pg');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//postgres database configuration into with knex
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'pass',
        database: 'facial-recog'
    }
});

//ENTRYPOINT 
app.get('/', (req, res) => {
    res.json(database.users);
});

//----------------------------------------------------------------------------------
//SIGNIN
app.post('/signin', (req, res) => {
    const {
        email,
        password
    } = req.body;

    db.select('email', 'hash').from('login').where('email', '=', email)
        .then(data => {

            //brcypt hashcode comparison
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {

                return db.select('*').from('users').where('email', '=', email)
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(errr => res.status(400).json(`Error unable to get user\n${err}`));
            } else {

                res.status(400).json(`Wrong Credentials`);
            }
        })
        .catch(err => res.status(400).json(`Wrong credentials\n${err}`));
});

//----------------------------------------------------------------------------------
//REGISTER USERS
app.post('/register', (req, res) => {

    const {
        name,
        email,
        password
    } = req.body;

    //stores hashed
    const hash = bcrypt.hashSync(password);

    //create a transaction when we have to do moere than two things at once
    //transactions are secure ways to make queries that state consistent and rollback even if DB crashes
    db.transaction(trx => {
            trx.insert({
                    hash: hash,
                    email: email
                })
                .into('login')
                .returning('email')
                .then(loginEmail => {

                    return trx('users').returning('*').insert({
                            email: loginEmail[0],
                            name: name,
                            joined: new Date()
                        })
                        .then(user => {
                            res.json(user[0]);
                        })
                })
                .then(trx.commit) //if transactions is successfull then apply it.
                .catch(trx.rollback) //if fails then rollback to previous vals
        })
        .catch(err => res.status(400).json(`unable to register\n${err}`));
});

//----------------------------------------------------------------------------------
//RESPONDS WITH USER INFO BASED ON ID
app.get('/profile/:id', (req, res) => {

    //taking id input from url parameter list
    const {
        id
    } = req.params;

    //select entire users table by user id
    db.select('*').from('users').where({
            id: id
        })
        .then(user => {
            //if user's length !== 0 output the first column index matching the id.
            // being that if the id matches we will get all of that users table row
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('User Not Foundd');
            }
        })
        .catch(err => res.status(400).json(`Error Getting User:\n${err}`));
});

//----------------------------------------------------------------------------------
//INCREMENTS USER ENTRIES FROM IMAGE UPLOADS
app.put('/image', (req, res) => {

    const {
        id
    } = req.body;

    //the '=' is a string because we are writing SQL 'knex' keeps statements as they would be written in SQL.  
    //SQL increment function is a better alternative to 'entries++'
    db.from('users').where('id', '=', id).increment('entries', 1).returning('entries')
        //one id per user so one row per user. hence the entries[0]. It's treate as an array.
        .then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json(`Error unable to get entries:\n${err}`));
});

app.listen(2000, () => {
    console.log('Server running on port 2000');
});