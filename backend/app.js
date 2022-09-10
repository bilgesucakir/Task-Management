const express = require('express');
const bodyParser = require("body-parser");
const Task = require('./models/task');
const mongooseImport = require('mongoose');
const app = express();
const cors = require('cors');

//process.env.TZ = "Asia/Istanbul";

mongooseImport.connect("mongodb+srv://<username>:<password>@taskmanagement.jmel0qq.mongodb.net/task-man?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to mongodb database successfully!');
  })
  .catch(error => console.error(error));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use(cors());


app.post('/api/tasks', (req, res, next) => {

  var tomorrowStart = new Date(req.body.startdate); 
  tomorrowStart.setDate(tomorrowStart.getDate() + 1);

  var tomorrowEnd = new Date(req.body.enddate);
  tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);

  const task = new Task({
    _id: req.body.id,
    name: req.body.name,
    content: req.body.content,
    status: req.body.status,
    startdate: new Date(tomorrowStart),
    enddate: new Date(tomorrowEnd)
  });


  task.save().then(resultTask => {
    res.status(201).json({
      message: 'task added successfully.',
      taskId: resultTask._id
    });
  });


});

app.put("/api/tasks/:id", (req, res, next) => {

  //stackoverflow code start
  return Task.updateOne(
    { _id: req.params.id },  // <-- find stage
    { $set: {                // <-- set stage
       id: req.body.id,     // <-- id not _id
       name: req.body.name,
       content: req.body.content,
       status: req.body.status,
       /*startdate: new Date(tomorrowStartUpdate), enddate: new Date(tomorrowEndUpdate)*/
       startdate: req.body.startdate,
       enddate: req.body.enddate
      }
    }
  ).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
  //stackoverlfow code end

})


app.get('/api/tasks', (req, res, next) => {

  Task.find().then(documents => {
    res.status(200).json({
      message: 'tasks fetched succesfully',
      tasks: documents
    });
  });
});

app.get("/api/tasks/:id", (req, res, next) => {
  Task.findById(req.params.id).then(task => {
    if(task){
      res.status(200).json(task);
    }
    else{
      res.status(404).json("task not found.");
    }
  });
});

app.delete("/api/tasks/:id", (req, res, next) => {

  Task.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Task deleted successfully!'});

  });
});

module.exports = app;

