const mongoose = require('mongoose');
const schema = mongoose.Schema;
let student = new schema({
  student_name: {
    type: String
  },
  student_email: {
    type: String
  },
  section: {
    type: String
  },
  subjects: {
    type: Array
  },
  gender: {
    type: String
  },
  dob: {
    type: Date
  }
  }, {
  collection: 'students'
});
module.exports = mongoose.model('student',student);
