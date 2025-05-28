const { Address } = require("../../Model/Address");

const addAddress = async(req,res) => {
    try {
        const { userId, address, phone, pincode, city, notes } = req.body;
        if( !userId|| !address|| !phone|| !pincode|| !city|| !notes ){
            return res.json({
                success:false,
                message:'invalid data provided'
            })
        }
        const newlyCreatedAddress= new Address({
            userId, address, phone, pincode, city, notes
        })
        await newlyCreatedAddress.save()
    
        res.json({
            success:true,
            data:newlyCreatedAddress,
             message:'Address Added Successfully'
        })
      } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const getAddress = async(req,res)=> {
  try {
    const {userId}= req.params
    if( !userId ){
        return res.json({
            success:false,
            message:'User Id is required'
        })
    }
    const addressList = await Address.find({userId})

    res.json({
        success:true,
        data:addressList
    })

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const updateAddress = async(req,res) => {
  try {
    const formData= req.body
    const {userId,addressId}= req.params
    if( !userId || !addressId ){
        return res.json({
            success:false,
            message:'User and address Id is required'
        })
    }

    const latestAddress = await Address.findOneAndUpdate({userId,_id:addressId},formData,{new:true})
    if(!latestAddress){
        return res.json({
            success:false,
            message:"address not found"
        })
    }
    res.json({
        success:true,
        data:latestAddress,
        message:'Address updated Successfully'
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const deleteAddress =async(req,res) => {
    try {
    const {userId,addressId}= req.params
    if( !userId || !addressId ){
        return res.json({
            success:false,
            message:'User and address Id is required'
        })
    }

    const deleteAddress = await Address.findOneAndDelete({userId,_id:addressId})
    if(!deleteAddress){
        return res.json({
            success:false,
            message:"address not found"
        })
    }

     res.json({
        success:true,
        message:"address deleted successfully"
    })
    } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addAddress, updateAddress, deleteAddress, getAddress };
