//WILL CREATE THE FOLLOWING INPUTS AND TESTING WITH POSTMAN

//simply build our server
const express = require('express');
//allows acces to request (reads JSON and form data)
const bodyParser = require('body-parser');
//bcrypt for password hashing
const bcrypt = require('bcrypt-nodejs');

const app = express();

//bodyparser through app.use() because it is middle ware
//have to call body parser before making post requests or gets from database in order to parse the incoming json
app.use(bodyParser.json());

//variable used to simulate database, and how we'll be using one
const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'John@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        }, 
        {
            id: '124',
            name: 'Sally',
            email: 'Sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        },
    ],
    //https(requires SSL certificate) is a good way to encrypt passwords, an other is bcrypt. By hashing the password
    login: [
        {
            id: '978',
            hash: '',
            email: 'John@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
});

//signin POST request example
app.post('/signin', (req, res) => {

    const {password, email} = req.body;

    //comparing the reall pass
    bcrypt.compare(password, '$2a$10$qO912RaHDF99D9Ly33M20ex2mi1bN8gG36bmRhywVpil/JUVhP7My', (err, res) => {
        if(err) {
            return err;
        }
        console.log(`first guess, ${res}`);
    });

    //comparing a wrong pass(FOR TESTING ONLY)
    bcrypt.compare('veggies', '$2a$10$qO912RaHDF99D9Ly33M20ex2mi1bN8gG36bmRhywVpil / JUVhP7My', (err, res) => {
        console.log(`second guess, ${res}`);
    });

    if(email === database.users[database.users.length - 1].email && password === database.users[database.users.length - 1].password) {
        
        //instead of send we'll be using express built in json (database will be json)
        res.json('signed in successfully');
    }
    else {
        res.status(404).json('ERROR LOGING IN!!!!!!!!!!');
    }
})

//register POST request example
app.post('/register', (req, res) => {
    
    const {name, email, password} = req.body;

    bcrypt.hash(password, null, null, (err, hash) => {

        console.log(hash);
    });

    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length - 1])
});

//GET user profile
//colon syntax means we can enter the parameter directly into the url
app.get('/profile/:id', (req, res) => {
    // id will be coming from request parameters(url)
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            return res.json(user);
        }  
    });
    if(!found) {
        res.status(400).json('User Not Found');
    }
});

//image PUT(update) everytime the user submits an image their entries updates(increments)
app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if(!found) {
        res.status(400).json('User Not Found');
    }

});


//-------------------------------------------------------------
// //BCRYPT
// //will go in the registration route
// bcrypt.hash('password', salt, progressCallBack, (err, hash) => {
//     if(err) {
//         return err;
//     }
//     //store res(hash) in pwrd DB
//     console.log(hash);
// });

// //will go in the signing route
// //instead of storing the users paswword and sensitive information directly to the database as plaintext we will store the generated hash and just compare the hash in the future
// bcrypt.compare('password', 'hachCode', (err, hash) => {

// });
//-------------------------------------------------------------

/*
when beginning to build an application always have an idea of what the API(backend) will look like

/--> res (initial route[simple response to test])

/signin --> POST will (respond with success/fail) this will be POST because we don't want to enter a password as text content.

/register --> POST will add data to DB/ variable in server (will return user)

/profile --> GET ability to access user profile (each user has their own page) 

/image --> PUT keep and update score of picture sumbitions


*/
app.listen(3000, () => {
    console.log('App is running on port 3000');
});