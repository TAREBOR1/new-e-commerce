const Feature = require("../Model/Feature");


const addFeatureImage=async(req,res)=>{
  try {

    const {image} = req.body;

    const featureImg = new Feature({
        image
    })

    await featureImg.save()

    res.json({
        success:true,
        data:featureImg
    })
    
  } catch (error) {
    res.json({
        success: false,
        message: error.message,
      });
  }
}
const getFeatureImage=async(req,res)=>{
  try {
    const img= await Feature.find({})

    res.json({
        success:true,
        data:img
    })

  } catch (error) {
    res.json({
        success: false,
        message: error.message,
      });
  }
}

module.exports ={addFeatureImage,getFeatureImage}