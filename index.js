// **********************  CRUD OPERATAION *****************************************
const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')

const app=express()

// connection of database(mongoose)
mongoose.connect('mongodb://127.0.0.1:27017/employeeDetails');

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())

// employee Schema 
const employeeSchema=mongoose.Schema({
    name:String,
    salary:Number,
    location:String
})

// collection or model 
const Employee=new mongoose.model("Employee",employeeSchema)

// ***********  Creating an API ******************
app.post('/employee', async(req,res)=>{
    const employee=await Employee.create(req.body);
    res.status(200).json({
        success:true,
        employee
    })
})

//************* Read the data in API ***************
app.get('/employeeview',async(req,res)=>{
    const employee=await Employee.find();
    res.status(200).json({
        success:true,
        employee
    })
})

// ************ Update employee details By _id ********************
app.put('/employeeview/:id',async(req,res)=>{
    let employee=await Employee.findById(req.params.id)
    if(!employee){
        return res.status(500).json({
            success:false,
            message:"Employee not found ..."
        })
    }
    employee=await Employee.findByIdAndUpdate(req.params.id,req.body,{new:true,
        useFindAndModify:false,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        employee
    })
})
//*************  Delete the Employee data By _id ***************************
app.delete('/employeeview/:id',async(req,res)=>{
    const employee=await Employee.findById(req.params.id);
    console.log(req.params.id)
    const result= await Employee.deleteOne({_id:req.params.id})
    if(!employee){
        return res.status(500).json({
            success:false,
            message:"Employee not found ..."
        })
    }
    res.status(200).json({
        success:true,
        message:"Employee Details Delete successfully..."
    })
})
app.listen(3000,()=>{
    console.log(`server started at http://localhost:3000/`)
})
