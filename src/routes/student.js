const router=require('express').Router();
const {student,countermod}=require('../models/schema')
const studentArray=require('../InitialData')
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }))
// let datainit=student.insertMany(studentArray)

router.get('/api/student',async(req,res)=>{
    try{
        const user=await student.find();
        // console.log(user.length)
      
        if(user.length){
             res.json({status:"success",user})
        }
        else{
            await student.insertMany(studentArray);
            await countermod.create({
                id: "new_id",
                seq: studentArray.length
            })
            let initstudent=await student.find();
            

            res.json({status:"success",initstudent})
        }
    }
    catch(e){
        res.json({
            status:"Failed",
            error:e.message
        })
    } 
    
})
router.get('/api/student/:id',async(req,res)=>{
    try{
        const [user]=await student.find({id:req.params.id});
        // console.log(user)
      if(user){
       return res.json({
            status:"success",
            result:user
        })
      }
      else{
       return res.json({
            status:"Failed",
            error:"invalid"
        })
      }
        
    }
    catch(e){
        res.json({
            status:"Failed",
            error:e.message
        })
    } 
    
})
//post
router.post('/api/student',async(req,res)=>{
    try{
        const [track]=await countermod.find();
    // console.log(track.seq)
    await countermod.updateOne({id:"new_id"},{$set:{seq:track.seq+1}})
    // console.log(await countermod.find())
    const data=await student.insertMany({
        id:track.seq+1,
        name:req.body.name,
        currentClass:req.body.currentClass,
        division:req.body.division

    })
  return res.json({
    status:"Success",
    result:data
  })
    }
    catch(e){
        res.json({
       status:"failed",
        error:e.message
   })
    }
})

// update
router.put('/api/student/:id',async (req,res)=>{
    // console.log(req.params);
    // console.log(req.body)
    try{
        
        let user=await student.updateOne({id:req.params.id},req.body)
        let [particular]=await student.find({id:req.params.id})
       if(particular)
        res.json({status:"success",result:particular})
        else res.status(400).json({status:"failed",result:"invalid"})
    }
    catch(e){
        res.status(400).json({status:"Failed",result:e.message})
    } 
  
})
// //delete

router.delete('/api/student/:id',async (req,res)=>{
    //   console.log(req.body)
    try{
        let [particular]=await student.find({id:req.params.id})
        
        let user=await student.deleteOne({id:req.params.id})
        if(particular) res.json({status:"success",result:particular})
        else res.status(404).json({status:"failed",result:"invalid"})

    }
    catch(e){
        res.status(404).json({status:"Failed",result:e.message})
    } 
    
})

module.exports=router