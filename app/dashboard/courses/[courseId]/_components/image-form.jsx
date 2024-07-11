"use client";

import { useEffect, useState } from "react";

import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { UploadDropzone } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { updateCourse } from "@/app/actions/course";


const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
const imgBBUploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

export const ImageForm = ({ initialData, courseId }) => {
  const [thumbnail, setThumbnail] = useState(initialData?.imageUrl);
  const [file, setFile] = useState(null);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (file) {
      async function uploadFile() {
        try {
          const formData = new FormData();
          formData.append("image", file[0]);
          console.log(file, formData)
          const response = await fetch(imgBBUploadUrl, {
            method: 'POST',
            body: formData,
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();

          if (result.success) {
            await updateCourse(courseId, { thumbnail: result.data.url });
            setThumbnail(result.data.url);
            toggleEdit();
            router.refresh();
          } else {
            console.error('Image upload failed:', result);
          }
        }
        catch (e) {
          toast.error(e.message);
        }
      }
      uploadFile();
    }
  }, [file])

  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={thumbnail}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <UploadDropzone onUpload={(file) => setFile(file)} />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};
