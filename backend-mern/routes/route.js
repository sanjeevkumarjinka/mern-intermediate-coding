const { userLogin, userRegister, allUsers, deleteUser, oneUser, userUpdate } = require('../controllers/userController')

const route = require('express').Router()

route.get('/' , (req,res)=>{
      res.status(200).json({message:"Normal health"})
})


route.post('/user' , userLogin)
route.post('/userreg' , userRegister)
route.get('/all/:name?' , allUsers)
route.delete('/user/:id' , deleteUser)
route.get('/user/:id' , oneUser)
route.patch('/user' ,  userUpdate)


module.exports = route