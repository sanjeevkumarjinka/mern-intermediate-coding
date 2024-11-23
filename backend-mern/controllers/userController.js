const user = require('../models/userSchema')
const bcrypt = require('bcrypt')


const userLogin = async (req, res)=>{

    const { username , password } = req.body

    if(!username || !password){
        return res.status(499).json({message : "Required All Fields"})
    }
    
    try{
          const  result = await user.findOne({ username })
          if(result){
               if(await bcrypt.compare(password , result.password)){
                   return res.status(201).json({ message : "Logged Success" , data : result })
               }
               else{
                 return res.status(403).json({ message: "Invalid username / password" })
               }
          }
          else{
             return res.status(404).json({ message : "Not Found User"})
          }
    }
    catch(err){
           return res.status(500).json({ message: err.message })
    }
}



const userRegister = async (req, res)=>{

    const { data , image} = req.body
    const { username , email , mobilenumber , designation , gender , course , password } = data
    


    if(!username || !email || !mobilenumber || !designation || !gender || !course || !image || !password){
          return res.status(499).json({ message : "Required All Fields" })
    }

    const hashPassword = await bcrypt.hash(password , 10)

    const resOut = {
            username,
            email,
            mobilenumber,
            designation,
            gender,
            course,
            image,
            password:hashPassword
    }

    try{
          const result = await user.create(resOut)
          if(result){
              return res.status(201).json({ message: "Created Success" , data : result })
          }
    }

    catch(err){
          return res.status(500).json({ message : err.message })
    }
       
}


const allUsers = async (req,res)=>{
       
    const { name } = req.params

     
       try{
        
          if(name === "username"){
            const result = await user.find().sort({ username : 1})
           
            if(result){
                 return res.status(201).json({message:'Loaded Success' , data:result})
            }
          }

          if(name === "email"){
            const result = await user.find().sort({ email : 1})
           
            if(result){
                 return res.status(201).json({message:'Loaded Success' , data:result})
            }
          }

          if(name === "undefined" ){
            const result = await user.find()
           
            if(result){
                 return res.status(201).json({message:'Loaded Success' , data:result})
            }
          }



       }
       catch(err){
           return res.status(500).json({message:err.message})
       }
}



const deleteUser = async (req,res)=>{
       const { id } = req.params

       try{
           const result = await user.findByIdAndDelete(id)
           if(result){
              return res.status(200).json({ message : "Deleted Success"})
           }
           else{
             return res.status(404).json({ message : "Not Found" })
           }
       }
       catch(err){
            return res.status(500).json({  message : err.message})
       }
}


const oneUser = async(req,res)=>{
       const { id } = req.params
       try{
          const result = await user.findById(id)
          if(result){
               return res.status(200).json({ message: "Success" , data: result })
          }
          else{
             return res.status(404).json({ message:'Not Found' })
          }
       }
       catch(err){
           return res.status(500).json({ message:err.message})
       }
}


const  userUpdate = async(req,res)=>{
        
        const { id , data , image } = req.body

        const { username , email , mobilenumber , designation, gender , course  } = data
        
        if(!username || !email || !mobilenumber || !designation || !gender || !course || !image){
            return res.status(499).json({ message : "Required All Fields" })
        }

       const data2 = {
           username,
           email,
           mobilenumber,
           designation,
           gender,
           course,
           image
       }

        console.log("update")
        console.log(data2)
        if(username){
            const result = await user.findOne({username})
            if(result){
                 return res.status(403).json({message:"username Already Existed"})
            }
        }

        if(email){
            const result = await user.findOne({email})
            if(result){
                 return res.status(403).json({message:"email Already Existed"})
            }
        }

        if(mobilenumber){
            const result = await user.findOne({mobilenumber})
            if(result){
                 return res.status(403).json({message:"mobilenumber Already Existed"})
            }
        }
              
        try{
              const result = await user.findByIdAndUpdate(id,data2)
              if(result){
                  return res.status(201).json({ message:"Update Success"})
              }
              else{
                  return res.status(404).json({ message:"Not Found"})
              }
        }
        catch(err){
              return res.status(500).json({ message:err.message })
        }
}

module.exports  = {
       userLogin ,
       userRegister,
       allUsers,
       deleteUser,
       oneUser,
       userUpdate
}