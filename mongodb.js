var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/studentsManage')

var Schema = mongoose.Schema

var studentSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    gender: {
        type: String,
        required :true
      },
      age: {
        type: Number,
        required :true
      },
      hobbies: {
        type: String,
        required :true
      }
})


module.exports = mongoose.model('stu', studentSchema)