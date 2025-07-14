"use client";

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    // Handle file processing here
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: 10 * 1024 * 1024, // 10 MB
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-3xl font-bold">AI RAG Assistant</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Card>
            <div {...getRootProps()} className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <input {...getInputProps()} />
              {uploadProgress ? (
                <div className="text-blue-500">Uploading: %</div>
              ) : (
                <p className="text-gray-500">Drag and drop a PDF file here, or click to select one</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
