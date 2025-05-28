const express=require('express')
const { addFeatureImage, getFeatureImage } = require('../Controller/featureController')

const featureRoute =express.Router()


featureRoute.post('/addFeature',addFeatureImage)
featureRoute.get('/getFeature',getFeatureImage)



module.exports=featureRoute 