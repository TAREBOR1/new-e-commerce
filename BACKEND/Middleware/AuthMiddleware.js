const jwt=require('jsonwebtoken')

const Authentication=async(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.json({
            message:'unauthorised user',
            success:false
        })
    }
try {

    const tokenDecode=jwt.verify(token,process.env.SECRET_KEY)
    req.User=tokenDecode
    next()
    
} catch (error) {
    return res.json({
        message:error.message,
        success:false
    })
}
}

module.exports= {Authentication}