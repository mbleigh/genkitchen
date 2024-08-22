import React, { ChangeEvent, ChangeEventHandler, useRef, useState, useEffect } from "react";

export default function FileField({
  name,
  onChange,
}: {
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePaste = (event: ClipboardEvent) => {
    const items = event.clipboardData?.items || [];

    for (let i = 0; i < items.length; i++) {
      console.log(items[i]);
      if (items[i].type.includes("image")) {
        const blob = items[i].getAsFile();
        if (blob) {
          const file = new File([blob], "pasted-image.png", { type: "image/png" });
          setFile(file);
          setPreview(URL.createObjectURL(file));

          // Update the file input
          if (fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInputRef.current.files = dataTransfer.files;

            // Trigger onChange event
            const changeEvent = new Event("change", { bubbles: true });
            fileInputRef.current.dispatchEvent(changeEvent);
          }
        }
        break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  useEffect(() => {
    // Clean up the preview URL when the component unmounts or when a new file is selected
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
    }

    onChange?.(event);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label htmlFor="dropzone-file" className="block w-full">
        {preview && (
          <img
            src={preview}
            alt="Uploaded file preview"
            className="w-full h-auto rounded-lg shadow-md"
          />
        )}
        {!preview && (
          <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 w-full">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 "
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
              <p className="mb-2 text-sm text-gray-500 ">
                <span className="font-semibold">Click to upload</span> or paste an image
              </p>
              <p className="text-xs text-gray-500 ">PNG or JPG (MAX. 6MB)</p>
            </div>
          </div>
        )}
        <input
          ref={fileInputRef}
          id="dropzone-file"
          type="file"
          name={name}
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
      </label>
    </div>
  );
}
