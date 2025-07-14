"use client";

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [error, setError] = useState<string>("");
  const [summary, setSummary] = useState<string>("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setError("");
      setUploadProgress(true)
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      setSummary(data.summary);

    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setUploadProgress(false);
    }

  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: 10 * 1024 * 1024, // 10 MB
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">AI RAG Assistant</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="p-6 mb-8">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? "border-blue-500"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            >
              <input {...getInputProps()} />
              {uploadProgress ? (
                <div className="text-blue-500">Uploading: %</div>
              ) : (
                <p className="text-gray-500">Drag and drop a PDF file here, or click to select one</p>
              )}
            </div>
          </Card>
          {error && <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-4">{error}</div>}
          {summary && (
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Document Summary</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {summary}
              </p>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
