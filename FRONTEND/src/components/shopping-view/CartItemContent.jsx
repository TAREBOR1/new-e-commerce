import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, updateCart } from "@/redux/shop/cartSlice";
import { toast } from "sonner";

const CartItemContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);
   const {productList}=useSelector((state)=>state.shopproduct)
  const {cartItems}= useSelector((state)=>state.shopcart)
  const dispatch = useDispatch();
  const handleCartItemDelete = (getCartItem) => {
    dispatch(
      deleteCart({ userId: user?.id, productId: getCartItem?.productId })
    );
  };
  const handleUpdateQuantity = (getCartItem, typeofaction) => {
    if(typeofaction==='plus'){
  
      let getCartItems=cartItems?.items || [];
       if(getCartItems.length){
        console.log('owo',getCartItem)
         const indexOfCurrentCartItem= getCartItems.findIndex(item=>item.productId===getCartItem?.productId)
         console.log('thisd',productList)
         const getCurrentProductIndex=productList.findIndex(product=>product._id===getCartItem?.productId)
        
         console.log('helloBOy',productList[getCurrentProductIndex])
         const getTotalStock=productList[getCurrentProductIndex].totalStock
         if(indexOfCurrentCartItem>-1){
           const getQuantity=getCartItems[indexOfCurrentCartItem].quantity
           if(getQuantity +1 > getTotalStock){
             toast.error(`only ${getQuantity} can be added for this item`)
   
             return;
           }
         }
         
       }
   }
    dispatch(
      updateCart({
        userId: user?.id,
        quantity:
          typeofaction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
        productId: getCartItem?.productId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("product updated");
      }
    });
  };
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2.5 mt-1">
          <Button
            onClick={() => {
              handleUpdateQuantity(cartItem, "minus");
            }}
            disabled={cartItem?.quantity === 1}
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            onClick={() => {
              handleUpdateQuantity(cartItem, "plus");
            }}
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => {
            handleCartItemDelete(cartItem);
          }}
          className="mt-1 cursor-pointer"
          size={20}
        />
      </div>
    </div>
  );
};

export default CartItemContent;
