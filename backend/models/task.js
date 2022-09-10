const mongoose = require('mongoose');

taskSchema = mongoose.Schema({

  name: {type: String, required: true},
  content: {type: String, required: true},
  status: {type: String, required: true},
  startdate: {type: Date, required: true},
  enddate: {type: Date, required: true}
});

module.exports = mongoose.model('Task', taskSchema); //collection name = tasks
//if mongoose.model('Name', ...)  then the collection name in the database is 'name'
//so after connecting to mongosh, entries are searched while in that database as: db.tasks.find()
