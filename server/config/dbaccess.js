const mongoose = require('mongoose');

mongoose.connect(process.env.db_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to the database...'))
    .catch((err) => console.log(err));