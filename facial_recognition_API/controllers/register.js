const handleRegister = (req, res, db, bcrypt) => {

    const {
        name,
        email,
        password
    } = req.body;

    if(!email || !name || !password)
    {
        return res.status(400).json('incorrect form submission');
    }
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
}

module.exports = {
    handleRegister: handleRegister
};