const handleImage = (req, res, db) => {

    const {
        id
    } = req.body;

    //the '=' is a string because we are writing SQL 'knex' keeps statements as they would be written in SQL.  
    //SQL increment function is a better alternative to 'entries++'
    db('users').where('id', '=', id).increment('entries', 1).returning('entries')
        //one id per user so one row per user. hence the entries[0]. It's treate as an array.
        .then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json(`Error unable to get entries:\n${err}`));
}

module.exports = {
    handleImage
};