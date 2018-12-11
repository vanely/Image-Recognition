const handleProfile = (req, res, db) => {

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
}

module.exports = {
    handleProfile: handleProfile
};