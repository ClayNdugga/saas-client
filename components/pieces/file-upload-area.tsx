"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import apiClient from "@/services/api-client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useDashboard } from "@/contexts/DashboardContext";

interface FileUploadAreaProps {
  onFileUpload: (file: File | null) => void;
}

export function FileUploadArea() {
  // export function FileUploadArea({ onFileUpload }: FileUploadAreaProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const {refetchFiles} = useDashboard()

  const [user] = useAuthState(auth);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
      //   onFileUpload(acceptedFiles[0])
    }
  }, []);
  //   }, [onFileUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  async function handleSubmit() {
    if (!uploadedFile) return;
    setIsSubmitting(true);
    console.log("Submitting file:", uploadedFile.name);

    const formData = new FormData();
    formData.append("file", uploadedFile!);
    console.log(uploadedFile);

    try {
      const uploadRes = await apiClient.post("/api/files", formData);
      // const uploadRes = await axios.post("/api/upload", formData);

      console.log("Uploaded successfully", uploadRes);
      setUploadedFile(null)
      refetchFiles()
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full max-w-md mx-auto">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary"
          }`}
        >
          <input {...getInputProps()} />
          {uploadedFile ? (
            <div className="flex items-center justify-center space-x-2">
              <File className="w-8 h-8 text-primary" />
              <span className="text-sm font-medium">{uploadedFile.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setUploadedFile(null);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div>
              <Upload className="w-12 h-12 mx-auto text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Drag & drop a file here, or click to select one</p>
            </div>
          )}
        </div>
      </div>

      {uploadedFile && (
        <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Uploading...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit File
            </>
          )}
        </Button>
      )}
    </div>
  );
}
