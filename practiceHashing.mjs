import bcrypt from "bcrypt";

// let password = "abc@123"
// let hashPassword = await bcrypt.hash(password,10)   //to check promise just use console and check.
// 10 denotes how many times is hashing done in 2 to the power " passed number"  in this case 2 to the power 10
// console.log(hashPassword)

let hashPassword = "$2b$10$jU0LL0QyQttwQ/kTIHxgde8Z0DIZ1dS.Y0KEeADrvVAESU9BmlwLu"
let myPassword = "abc@123"

let isValidPassword = await bcrypt.compare(myPassword, hashPassword)   // either true or false
console.log(isValidPassword) 

/* for hashing password 

   let data = req.body;
     let hashPassword = await bcrypt.hash(data.password , 10)
     data.password = hashPassword;   //here we convert password into hash and store the password in has as well in the database
 
    let result = await creatUserService(data);
    res.json({
      sucess: true,
      message: "User created successfully.",
      result: result,
    });
  */