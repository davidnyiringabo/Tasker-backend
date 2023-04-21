const otpGenerator = require('otp-generator')

const generateOTP = (req,res,next) =>{
    const otp = otpGenerator.generate(7, { lowerCaseAlphabets: false,upperCaseAlphabets: false, specialChars: false });
    req.otp = otp
    console.log(req.otp)

    next()
}


module.exports = generateOTP