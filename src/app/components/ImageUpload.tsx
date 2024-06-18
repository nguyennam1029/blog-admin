"use client";

import { useFormContext, Controller } from "react-hook-form";
import { storage } from "@/lib/firebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { Input } from "@/components/ui/input";

import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
const extractFileNameFromURL = (url: string) => {
  const decodedURL = decodeURIComponent(url);
  const startIdx = decodedURL.indexOf("/o/") + 3;
  const endIdx = decodedURL.indexOf("?alt=");
  return decodedURL.substring(startIdx, endIdx);
};
const ImageUpload = ({
  name,
  initialImageURL,
}: {
  name: string;
  initialImageURL: string;
}) => {
  const { control, setValue } = useFormContext();
  const [uploadedImageURL, setUploadedImageURL] =
    useState<string>(initialImageURL);
  const [fileNameImage, setFileNameImage] = useState<string>(() => {
    if (initialImageURL) {
      return extractFileNameFromURL(initialImageURL);
    }
    return "";
  });

  const handleFileChange = async (file: File) => {
    setFileNameImage(file?.name);
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploadedImageURL(downloadURL);
          setValue(name, downloadURL);
        });
      }
    );
  };

  const handleDeleteImage = () => {
    const desertRef = ref(storage, fileNameImage);
    deleteObject(desertRef)
      .then(() => {
        setUploadedImageURL("");
        setValue(name, "");
        setFileNameImage(""); // Reset the file name
        toast({
          description: "Delete image successfully",
        });
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting image: ", error);
        toast({
          description: "Failed to delete image",
        });
      });
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Image</FormLabel>
          <FormControl>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="relative flex flex-col items-center justify-center p-2 w-full h-full overflow-hidden">
                  {uploadedImageURL ? (
                    <>
                      <Image
                        src={uploadedImageURL}
                        alt="Image"
                        height={240}
                        width={1112}
                        quality={100}
                        className="w-full h-full object-cover rounded-sm"
                      />

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <div className="absolute top-2/4 left-2/4 p-3 rounded-full bg-red-600 text-white z-50">
                            <Trash2 />
                          </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Do you want to delete this product?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              The product will be permanently deleted!
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteImage}>
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </>
                  )}
                </div>
                {!uploadedImageURL && (
                  <Input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleFileChange(e.target.files[0]);
                      }
                    }}
                  />
                )}
              </label>
            </div>
          </FormControl>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default ImageUpload;
