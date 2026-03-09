"use client";

import { CldUploadWidget } from "next-cloudinary";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Image from "next/image";
import { getImagePath } from "@/src/utils";

export default function ImageUpload({ image }: { image: string | undefined }) {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <CldUploadWidget
      uploadPreset="n6l4glcu"
      onSuccess={(result, { widget }) => {
        if (result.event === "success") {
          widget.close();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setImageUrl(result.info?.secure_url);
        }
      }}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <>
            <div className="space-y-2">
              <label htmlFor="" className="text-slate-800">
                Imagen Producto
              </label>
              <div
                onClick={() => open()}
                className="relative cursor-pointer hover:opacity-60 transition-all p-10 mt-2 items-center flex flex-col justify-center gap-4 bg-slate-100"
              >
                <PhotoIcon className="size-10" />
                <p className="text-lg font-semibold">Agregar Imagen</p>
                {imageUrl && (
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      fill
                      style={{ objectFit: "contain" }}
                      src={imageUrl}
                      alt="Imagen del Producto a subir"
                    />
                  </div>
                )}
              </div>
            </div>
            {image && !imageUrl && (
              <div>
                <label htmlFor="">Imagen Actual:</label>
                <div className="relative w-60 h-60">
                  <Image fill src={getImagePath(image)} alt="Imagen Producto" />
                </div>
              </div>
            )}
            <input
              type="hidden"
              name="image"
              defaultValue={imageUrl ? imageUrl : image}
            />
          </>
        );
      }}
    </CldUploadWidget>
  );
}
