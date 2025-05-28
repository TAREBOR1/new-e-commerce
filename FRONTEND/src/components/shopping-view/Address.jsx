import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Form from "../common-view/Form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "@/redux/shop/addressSlice";
import AddressCard from "./AddressCard";
import { toast } from "sonner";

const Address = ({setCurrentSelectedAddress,selectedId}) => {
  const initialAddressFormData = {
    address: "",
    city: "",
    phone: "",
    pincode: "",
    notes: "",
  };
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { address } = useSelector((state) => state.shopaddress);
  const handleManageAddress = (e) => {
    e.preventDefault();

    if(address.length >=3 && currentEditedId==null){
        setFormData(initialAddressFormData)
       toast.error("you can add max 3 addresses")
       return;
    }

    currentEditedId !== null
      ? dispatch(
          updateAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(getAddress(user?.id));
            setFormData(initialAddressFormData);
            setCurrentEditedId(null);
            toast.success(data?.payload?.message);
          }
        })
      :
       
      dispatch(addAddress({ ...formData, userId: user?.id })).then((data) => {
          if (data?.payload?.success) {
            setCurrentEditedId(null);
            dispatch(getAddress(user?.id));
            setFormData(initialAddressFormData);
            toast.success(data?.payload?.message);
          }
        });
  };
  const handleDeleteAddress = (getAddressInfo) => {
    console.log(getAddressInfo);
    dispatch(
      deleteAddress({
        userId: getAddressInfo.userId,
        addressId: getAddressInfo._id,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAddress(user?.id));
        toast.success(data?.payload?.message);
      }
    });
  };
  const handleEditAddress = (getAddressInfo) => {
    setCurrentEditedId(getAddressInfo?._id);
    setFormData({
      ...formData,
      address: getAddressInfo?.address,
      city: getAddressInfo?.city,
      phone: getAddressInfo?.phone,
      pincode: getAddressInfo?.pincode,
      notes: getAddressInfo?.notes,
    });
  };
  useEffect(() => {
    dispatch(getAddress(user?.id));
  }, [dispatch]);
  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  return (
    <Card>
      <div className=" mb-5 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {address && address.length > 0
          ? address.map((addressItem) => {
              return (
                <AddressCard
                selectedId={selectedId}
                  addressInfo={addressItem}
                  handleEditAddress={handleEditAddress}
                  handleDeleteAddress={handleDeleteAddress}
                  setCurrentSelectedAddress={setCurrentSelectedAddress}
                />
              );
            })
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Form
          FormControls={addressFormControls}
          FormData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isButtonDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
