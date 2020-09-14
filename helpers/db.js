const mongoose = require('mongoose');

module.exports = () =>{
  mongoose.connect(process.env.MONGODB_CONNECTION_DB,
      {
          useUnifiedTopology: true,
          useNewUrlParser: true,
      });

  mongoose.connection.on('open', () =>{
        //console.log('connected');
  });

  mongoose.connection.on('error', err =>{
        console.log(err);
  });
};