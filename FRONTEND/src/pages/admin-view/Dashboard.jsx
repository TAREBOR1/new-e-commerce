import ImageUpload from '@/components/admin-view/ImageUpload'
import { Button } from '@/components/ui/button';
import { AddFeature, GetFeature } from '@/redux/featureSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const Dashboard = () => {

   const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);

    const dispatch=useDispatch()
    const {featureImage}=useSelector((state)=>state.feature)

    const handleUploadFeatureImage=()=>{
       dispatch(AddFeature(uploadedImageUrl)).then((data)=>{
     if(data?.payload?.success){
      toast.success('feature image added')
      dispatch(GetFeature())
      setUploadedImageUrl('')
      setImageFile(null)
     }
       })
    }
    useEffect(()=>{
   dispatch(GetFeature())
    },[dispatch])

    console.log('yesss',featureImage)
  return (
    <div>
 
        <ImageUpload
            imageFile={imageFile}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            isCustomStyling={true}
          />
          <Button onClick={handleUploadFeatureImage} className='mt-5 w-full'>Upload</Button>
          <div className='flex flex-col gap-4 mt-5'>
            {featureImage && featureImage.length>0? featureImage.map((featureItem)=>{
              return  <img src={featureItem?.image}
             
              className='w-full h-[300px] object-cover rounded-t-lg'/>
            }): null}
          </div>
    </div>
  )
}

export default Dashboard
