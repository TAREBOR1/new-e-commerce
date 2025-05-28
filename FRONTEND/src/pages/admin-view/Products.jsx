import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Form from "@/components/common-view/Form";
import { addProductFormElements } from "@/config";
import ImageUpload from "@/components/admin-view/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { AddProduct, DeleteProduct, GetProduct, UpdateProduct } from "@/redux/Admin/productSlice";
import { toast } from "sonner";
import AdminProductTile from "@/components/admin-view/AdminProductTile";


const Products = () => {
  const initialState = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
  };
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(false);

  

  const isFormValid=()=>{
    return Object.keys(formData).map((key=>formData[key] !=='')).every((item)=>item)
  }

  const { productList } = useSelector((state) => state.adminproduct);
  const dispatch = useDispatch();

  const HandleDelete=(getProductId)=>{
  dispatch(DeleteProduct(getProductId)).then((data)=>{
  if(data.payload?.success){
    dispatch(GetProduct())
    toast.success("Product deleted successfully");
  }
  })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(currentEditedId,'thid edit ID')
    {currentEditedId !== null ? dispatch(UpdateProduct({id:currentEditedId,formData})).then((data)=>{
      if (data?.payload?.success) {
        setOpenCreateProductDialog(false);
        setCurrentEditedId(null);
        setFormData(initialState);
        dispatch(GetProduct());
        toast.success("Product edited successfully");

    }}) : dispatch(
      AddProduct({
        ...formData,
        image: uploadedImageUrl,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setOpenCreateProductDialog(false);
        setImageFile(null);
        setFormData(initialState);
        dispatch(GetProduct());
        toast.success("Product added successfully");
      }
    })}
   ;
  };
  useEffect(() => {
    dispatch(GetProduct()).then((data) => {});
  }, [dispatch]);

  console.log("productList", uploadedImageUrl, productList);
  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => {
            setOpenCreateProductDialog(true);
            
          }}
        >
          Add new Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => {
              return (
                <AdminProductTile
                  setFormData={setFormData}
                  setCurrentEditedId={setCurrentEditedId}
                  setOpenCreateProductDialog={setOpenCreateProductDialog}
                  product={productItem}
                  HandleDelete={HandleDelete}
                />
              );
            })
          : null}
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setFormData(initialState)
          setCurrentEditedId(null)
        }}
      >
        <SheetContent side="right" className="overflow-auto py-6 px-4">
          <SheetHeader>
            <SheetTitle>{currentEditedId!==null ? "Edit product":"Add new Product"}</SheetTitle>
          </SheetHeader>
          <ImageUpload
            imageFile={imageFile}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            isEditMode={currentEditedId!==null}
          />
          <div className="py-6">
            <Form
              FormControls={addProductFormElements}
              FormData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId!==null ? "Edit":"Add"}
              onSubmit={onSubmit}
              isButtonDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Products;
