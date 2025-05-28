import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const ImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  setUploadedImageUrl,
  isEditMode,
  isCustomStyling=false
}) => {
  const inputRef = useRef(null);
  const HandleImageFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  };
  const HandleDrag = (e) => {
    e.preventDefault();
  };
  const HandleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  };
  const HandleRemoveImg = (e) => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const UploadImageToCloudinary = async () => {
    try {
      setImageLoadingState(true); // ✅ Start loading state

      const data = new FormData();
      data.append("my_file", imageFile);

      const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/product/uploadImage`,
        data
      );

      console.log("imageLink", response.data.result.url);

      if (response.data?.success) {
        setUploadedImageUrl(response.data?.result?.url);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setImageLoadingState(false); // ✅ Ensure loading state is reset after upload (success or fail)
    }
  };
  useEffect(() => {
    if (imageFile !== null) {
      UploadImageToCloudinary();
    }
  }, [imageFile]);
  return (
    <div className={`w-full ${isCustomStyling? '':"max-w-md mx-auto"} mt-4`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={HandleDrag}
        onDrop={HandleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          type="file"
          className="hidden"
          id="image-upload"
          ref={inputRef}
          onChange={HandleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[80px] w-full rounded" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant={"ghost"}
              size={"icon"}
              className={"text-muted-foreground hover:text-foreground"}
              onClick={HandleRemoveImg}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
