import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CopyX, Plus, Upload } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/db/supabase/client";
import { useAuth } from "@/context/auth.context";
import { FileUpload } from "../ui/file-upload";
import { SpaceComp } from "./select-space";
import { getFileUrl, storeResource } from "@/func/func";

export default function FileUploadComp({ disabled }: { disabled: boolean }) {
  const { user } = useAuth();
  const [UOpen, setUOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isFile, setIsFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [space, setSpace] = useState<string | null>(null);
  const [contentType, setContentType] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  //   const [path, setPath] = useState<string | null>(null);
  const supabase = createClient();

  const handleFileRemove = () => {
    setFiles([]);
    setIsFile(false);
    setUploading(false);
    setResetKey((prevKey) => prevKey + 1);
  };

  const handleResAdd = async () => {
    if (user && contentType && uploadedFileUrl && space) {
      try {
        setLoading(true);
        const response = await fetch("/api/ai/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: contentType,
            content: uploadedFileUrl,
            namespace: space,
          }),
        });

        if (!response.ok) {
          setLoading(false);
          throw new Error("Failed to save resource");
        }

        await storeResource(
          user?.id,
          title!,
          contentType!,
          uploadedFileUrl!,
          space!,
        );
        // await deleteFile(path!);
        setLoading(false);
        setUOpen(false);
        const currentDate = new Date().toLocaleString();
        toast.success(`Resource has been saved!`, {
          description: currentDate,
        });
      } catch (error) {
        console.error("Error saving resource:", error);
        toast.error("Failed to save resource. Please try again.");
      }
    } else {
      toast.error("Please fill all the required fields.");
    }
  };

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    setIsFile(uploadedFiles.length > 0);
  };

  const handleUpload = async () => {
    if (!files.length) return;

    setUploading(true);

    for (const file of files) {
      setTitle(file.name);
      const fileType = file.type.split("/")[1];

      let folderPath;
      if (fileType === "pdf") {
        setContentType("pdf");
        folderPath = "PDFs";
      } else if (fileType === "csv") {
        setContentType("csv");
        folderPath = "CSVs";
      } else {
        toast("Unsupported File Type", {
          description: "We don't support this file type.",
        });
        handleFileRemove();
        return;
      }

      const filePath = `${folderPath}/${file.name}`;

      try {
        // if (filePath) {
        //   setPath(filePath);
        // }
        const { error } = await supabase.storage
          .from("orbit") // Replace with your Supabase Storage bucket name
          .upload(filePath, file);

        if (error) {
          throw error;
        }

        const fileUrl = await getFileUrl(filePath);
        if (fileUrl) {
          setUploadedFileUrl(fileUrl);
        }

        toast.success("Upload Complete", {
          description: `${file.name} has been successfully uploaded.`,
        });
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Upload Failed", {
          description: `Failed to upload ${file.name}. Please try again.`,
        });
      } finally {
        setUploading(false);
        handleFileRemove();
      }
    }
  };

  useEffect(() => {}, [uploadedFileUrl]);

  return (
    <Dialog open={UOpen} onOpenChange={setUOpen}>
      <DialogTrigger asChild>
        <div className="flex w-auto h-full items-center justify-end">
          <Button
            size="icon"
            className="h-10 w-10 rounded-full bg-[#2c2c2c] hover:bg-[#3c3c3c] border-none"
            disabled={disabled}
          >
            <Plus className="h-8 w-8 text-gray-400" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col w-full max-h-96 items-end justify-center">
        <DialogHeader className="w-full max-w-4xl mx-auto h-full">
          <DialogTitle className="font-bold text-muted dark:text-white text-2xl">
            {uploadedFileUrl ? "Add to space" : "Upload file"}
          </DialogTitle>
          <DialogDescription>
            {uploadedFileUrl
              ? "If you will not add to space this file be deleted."
              : "Drag or drop your file here or click to upload."}
          </DialogDescription>
          {uploadedFileUrl ? (
            <SpaceComp onSpaceSelect={(space) => setSpace(space)} />
          ) : (
            <FileUpload
              key={resetKey}
              onChange={handleFileUpload}
              isDisabled={isFile || uploading}
            />
          )}
        </DialogHeader>
        <DialogFooter className="flex flex-row w-full items-center justify-between">
          {!uploadedFileUrl && (
            <Button
              type="button"
              variant="secondary"
              disabled={!isFile || uploading}
              onClick={handleFileRemove}
            >
              <CopyX className="size-5 mr-2" />
              Remove
            </Button>
          )}
          {uploadedFileUrl ? (
            <Button onClick={handleResAdd} disabled={loading}>
              {loading ? "Adding to space..." : "Add to space"}
            </Button>
          ) : (
            <Button
              type="button"
              disabled={!isFile || uploading}
              onClick={handleUpload}
            >
              <Upload className="size-5 mr-2" />
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
