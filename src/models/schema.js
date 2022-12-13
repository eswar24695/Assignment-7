const mongoose=require('mongoose');

const studentschema=new mongoose.Schema({
    _id:{type:String},
    id:{type:Number},
    name:{type:String,required:true},
    currentClass:{type:Number,required:true},
    division:{type:String,required:true}
})
const student=mongoose.model('students',studentschema);
const counterschema=new mongoose.Schema({
    id:{type:String},
    seq:{type:Number}
})
const countermod=mongoose.model('counter',counterschema)
module.exports={student,countermod}