type UploadStatus = {
    id: string;
    status: string;
    progress: number;
    error?: string | null; // error is optional and can be null
  };
  
  "use client";
  
  import React, { useState, useCallback } from "react";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { Progress } from "@/components/ui/progress";
  import { Loader2, Upload, CheckCircle, XCircle, Folder, RefreshCcw } from "lucide-react";
  import { supabase } from "@/lib/supabase";
  
  // Helper Functions
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)); // Corrected delay function
  
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000;
  
  async function fetchWithRetry(url: string, options: RequestInit, retries = MAX_RETRIES) {
    try {
      const response = await fetch(url, options);
  
      if (response.status === 401 && retries > 0) {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) throw new Error("Session expired");
  
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${session.access_token}`,
        };
  
        await delay(RETRY_DELAY);
        return fetchWithRetry(url, options, retries - 1);
      }
  
      return response;
    } catch (error) {
      if (retries > 0) {
        await delay(RETRY_DELAY);
        return fetchWithRetry(url, options, retries - 1);
      }
      throw error;
    }
  }
  
  const errorMessages: Record<string, string> = {
      "Missing required files": "Some required files (e.g., VRM or metadata) are missing for one or more avatars.",
      "Failed to get VRM upload URL": "Unable to generate a URL for uploading the VRM file.",
      "Failed to get image upload URL": "Unable to generate a URL for uploading the thumbnail image.",
      "Failed to create avatar record": "Error saving avatar details to the database.",
  };
  
  const getFriendlyErrorMessage = (error: string) =>
    errorMessages[error] || "An unexpected error occurred. Please try again.";
  
  export default function BulkAvatarUploader() {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadStatuses, setUploadStatuses] = useState<UploadStatus[]>([]); // Typed as UploadStatus[]
    const [processed, setProcessed] = useState({ success: 0, failed: 0, total: 0 });
  
    const getFileContentType = (file: File): string => {
      const extension = file.name.split(".").pop()?.toLowerCase();
      return extension === "vrm"
        ? "application/octet-stream"
        : extension === "gif"
        ? "image/gif"
        : file.type || "application/octet-stream";
    };
  
    const handleFolderSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;
  
      setSelectedFiles(files);
      setUploadStatuses([]);
      setProcessed({ success: 0, failed: 0, total: 0 });
      setIsProcessing(false);
    };
  
    const retryFailedUploads = async () => {
      const failedGroups = selectedFiles
        ? Array.from(selectedFiles).filter((_, index) => uploadStatuses[index]?.status === "error")
        : [];
      if (!failedGroups.length) return;
  
      setIsProcessing(true);
      const updatedStatuses = uploadStatuses.map((status) => {
        if (status.status === "error") {
          status.status = "pending";
          status.progress = 0;
          status.error = null;
        }
        return status;
      });
      setUploadStatuses(updatedStatuses);
  
      await processFiles();
    };
  
    const processFiles = useCallback(async () => {
      if (!selectedFiles) return;
    
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error("Not authenticated");
    
        setIsProcessing(true);
        const fileGroups = new Map();
    
        Array.from(selectedFiles).forEach((file) => {
          const match = file.name.match(/^\d+/);
          if (!match) return;
    
          const id = match[0];
          const group = fileGroups.get(id) || {};
          if (file.name.endsWith(".vrm")) group.vrm = file;
          else if (file.name.includes("-image.")) group.image = file;
          else if (file.name.includes("-metadata.json")) group.metadata = file;
    
          fileGroups.set(id, group);
        });
    
        const statuses: UploadStatus[] = []; // Declare the statuses array with the correct type
        setProcessed((prev) => ({ ...prev, total: fileGroups.size }));
    
        for (const [id, group] of fileGroups) {
          const status: UploadStatus = { id: `Avatar ${id}`, status: "pending", progress: 0, error: null }; // Initialize error as null
          statuses.push(status);
          setUploadStatuses(statuses); // Set statuses after modification
    
          try {
            if (!group.metadata || !group.vrm) throw new Error("Missing required files");
    
            const jsonText = await group.metadata.text();
            const jsonData = JSON.parse(jsonText);
    
            status.status = "uploading";
            status.progress = 33;
            setUploadStatuses(statuses);
    
            const vrmResponse = await fetchWithRetry("/api/upload", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.access_token}`,
              },
              body: JSON.stringify({
                fileName: group.vrm.name,
                fileType: getFileContentType(group.vrm),
              }),
            });
    
            if (!vrmResponse.ok) throw new Error("Failed to get VRM upload URL");
    
            const { url: vrmUrl, publicUrl: vrmPublicUrl } = await vrmResponse.json();
    
            await fetchWithRetry(vrmUrl, {
              method: "PUT",
              body: group.vrm,
              headers: { "Content-Type": "application/octet-stream" },
            });
    
            status.progress = 66;
            setUploadStatuses(statuses);
    
            let imagePublicUrl = jsonData.thumbnailUrl;
            if (group.image) {
              const imageResponse = await fetchWithRetry("/api/upload", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({
                  fileName: group.image.name,
                  fileType: getFileContentType(group.image),
                }),
              });
    
              if (!imageResponse.ok) throw new Error("Failed to get image upload URL");
    
              const { url: imageUrl, publicUrl } = await imageResponse.json();
    
              await fetchWithRetry(imageUrl, {
                method: "PUT",
                body: group.image,
                headers: { "Content-Type": getFileContentType(group.image) },
              });
    
              imagePublicUrl = publicUrl;
            }
    
            status.progress = 90;
            setUploadStatuses(statuses);
    
            const avatarResponse = await fetchWithRetry("/api/assets", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.access_token}`,
              },
              body: JSON.stringify({
                name: jsonData.name,
                project: "100Avatars",
                description: jsonData.description,
                thumbnailUrl: imagePublicUrl,
                modelFileUrl: vrmPublicUrl,
                format: "VRM",
                polygonCount: jsonData.polygonCount || 0,
                materialCount: jsonData.materialCount || 0,
                isPublic: true,
                isDraft: false,
                metadata: { ...jsonData.metadata, originalTags: jsonData.tags || [] },
              }),
            });
    
            if (!avatarResponse.ok) throw new Error("Failed to create avatar record");
    
            status.status = "success";
            status.progress = 100;
            setProcessed((prev) => ({ ...prev, success: prev.success + 1 }));
          } catch (error) {
            if (error instanceof Error) {
              status.status = "error";
              status.error = getFriendlyErrorMessage(error.message || "Unknown error");
            } else {
              status.status = "error";
              status.error = "Unknown error";
            }
            setProcessed((prev) => ({ ...prev, failed: prev.failed + 1 }));
          }
    
          setUploadStatuses(statuses);
          await delay(500);
        }
      } catch (error) {
        console.error("Processing error:", error);
      } finally {
        setIsProcessing(false);
      }
    }, [selectedFiles]);
  
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Bulk Avatar Upload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* UI code remains the same */}
          </CardContent>
        </Card>
      </div>
    );
  }
  