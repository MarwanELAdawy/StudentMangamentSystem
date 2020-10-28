const express = require('express');
const app = express();
const studentRoute = express.Router();
// Student model
let student = require('../model/Student');
// Add student
studentRoute.route('/create').post((req, res, next) => {
  student.create(req.body, (err, data)=>{
    if(err){
      return next(err);
    }
    else{
      res.json(data);
    }
  });
});
// Get all student
studentRoute.route('/').get((req, res, next)=>{
  student.find((err, data)=>{
    if(err){
      return next(err);
    }
    else{
      res.json(data);
    }
  });
});
// Get single student
studentRoute.route('/read/:id').get((req, res, next)=>{
  student.findById(req.params.id, (err, data)=>{
    if(err){
      return next(err);
    }
    else{
      res.json(data);
    }
  });
});
// Update student
studentRoute.route('/update/:id').put((req, res, next)=>{
  student.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (err, data)=>{
    if (err){
      console.error(error);
      return next(err);
    }
    else{
      res.json(data);
      console.log('Student successfully updated!');
    }
  });
});
// Delete student
studentRoute.route('/delete/:id').delete((req, res, next)=>{
  student.findOneAndRemove(req.params.id, (err, data)=>{
    if(err){
      return next(err);
    }
    else{
      res.status(200).json({
        msg: data
      });
    }
  });
});
module.exports = studentRoute;
