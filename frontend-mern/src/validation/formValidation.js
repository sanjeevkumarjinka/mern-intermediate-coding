import * as Yup from 'yup'


const Num = ["hr", "manager" , "sales"]
const gen = ["male","female"]

export const  formValidation = new Yup.object({
          username : Yup.string().min(5).max(30).matches("^[a-z]+$", "name is only lowercase withoutspace valid").required("Required username"),
          email: Yup.string().email().required("Required Email"),
          mobilenumber: Yup.string().matches("^[6-9]{1}[0-9]{9}", "Indian phone number is valid").max(10).required("Required Mobilenumber"),
          designation: Yup.mixed().oneOf(Num).required("Required designation"),
          gender : Yup.mixed().oneOf(gen).required("Required gender field"),
          course: Yup.array().required("Required course Field"),
          password:Yup.string().min(8).required("Required Password").matches("^[A-Z]+[a-z]+[^a-zA-Z0-9]+[0-9]+","Atleast one number,Uppercase,Lowercase,special characters"),
          repassword:Yup.string().required("Required reenterpassword").oneOf([ Yup.ref('password') , null ], "mismatch password") 
})


export const updateForm = new Yup.object({
    username : Yup.string().min(5).max(30).matches("^[a-z]+$", "name is only lowercase withoutspace valid").required("Required username"),
    email: Yup.string().email().required("Required Email"),
    mobilenumber: Yup.string().matches("^[6-9]{1}[0-9]{9}", "Indian phone number is valid").max(10).required("Required Mobilenumber"),
    designation: Yup.mixed().oneOf(Num).required("Required designation"),
    gender : Yup.mixed().oneOf(gen).required("Required gender field"),
    course: Yup.array().required("Required course Field"),
})