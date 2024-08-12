import jwt from "jsonwebtoken";

// let info = {
//   id: "123",
// };
// let secretKey = "dw15";
// let expiryInfo = { expiresIn: "365d" };

// let token = jwt.sign(info, secretKey, expiryInfo);
// console.log(token);

/*
check whether the token is verified or not
  given token must be generated from the passed secret key
  the token must not be expired.


*/

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTcxOTgzNzIzMSwiZXhwIjoxNzUxMzczMjMxfQ.GqC-rbD0H3VegRYVLTkcxmZDncTeoJQ4evSreU0QT-8"


try {
  let infoObj = jwt.verify(token,"dw15")
console.log(infoObj)

} catch (error) {
  console.log(error.message)
}

/*

id
   info
   logo
   expiryInfo

token
    info => object
    secretKey => string
    expiryInfo =>{expiresIn : "2d"} d=> day , m=> min 
*/
