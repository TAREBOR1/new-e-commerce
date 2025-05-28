import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice';
import adminProductSlice from './Admin/productSlice';
import shopProductSlice from './shop/productSlice';
import shopCartSlice from './shop/cartSlice'
import addressSlice from './shop/addressSlice'
import orderSlice from './shop/orderSlice'
import adminOrderSlice from './Admin/orderSlice'
import searchSlice from './shop/searchSlice'
import reviewSlice from './shop/reviewSlice'
import featureSlice from './featureSlice'


const store= configureStore({
    reducer:{
   auth:authSlice,
   adminproduct:adminProductSlice,
   shopproduct:shopProductSlice,
   shopcart:shopCartSlice,
   shopaddress:addressSlice,
   orderproduct:orderSlice,
   adminorder:adminOrderSlice,
   shopsearch:searchSlice,
   shopreview:reviewSlice,
   feature:featureSlice,

    }
})

export default store