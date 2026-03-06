"use client";

import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  MEDIA_BUCKET,
  MAX_FILE_SIZE,
  type MediaFile,
} from "@/lib/media-constants";
import { listMedia, deleteMedia } from "@/server/media-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Loader2,
  UploadCloud,
  Copy,
  Trash2,
  Image as ImageIcon,
  Check,
} from "lucide-react";

interface MediaLibraryProps {
  onSelect?: (url: string) => void;
  isSelectMode?: boolean;
}

export function MediaLibrary({
  onSelect,
  isSelectMode = false,
}: MediaLibraryProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchMedia();
  }, []);

  async function fetchMedia() {
    setLoading(true);
    const { data, error } = await listMedia();
    if (error) {
      toast.error("Failed to load media");
    } else {
      setFiles(data as MediaFile[]);
    }
    setLoading(false);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File is too large (max 5MB)");
      return;
    }

    setUploading(true);

    // Clean filename: basic alphanumeric + dashes replacement to avoid crazy bucket paths
    const ext = file.name.split(".").pop();
    const cleanName = file.name
      .replace(`.${ext}`, "")
      .replace(/[^a-z0-9]/gi, "-")
      .toLowerCase();
    const filename = `${Date.now()}-${cleanName}.${ext}`;

    const { error } = await supabase.storage
      .from(MEDIA_BUCKET)
      .upload(filename, file, { cacheControl: "3600", upsert: false });

    if (error) {
      console.error("Upload error:", error);
      toast.error(`Upload failed: ${error.message}`);
    } else {
      toast.success("File uploaded successfully");
      fetchMedia();
    }

    if (inputRef.current) inputRef.current.value = "";
    setUploading(false);
  }

  async function handleDelete(filename: string, id: string) {
    if (
      !confirm(
        "Are you sure you want to delete this file completely? This cannot be undone and may break images embedded on the site.",
      )
    )
      return;

    setDeletingId(id);
    const { error } = await deleteMedia(filename);
    if (error) {
      toast.error(`Delete failed: ${error}`);
    } else {
      toast.success("File deleted");
      setFiles((prev) => prev.filter((f) => f.id !== id));
    }
    setDeletingId(null);
  }

  function handleCopy(url: string, id: string) {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("URL copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  }

  function formatBytes(bytes: number) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024,
      dm = 2,
      sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Media Library</h2>
          {isSelectMode && (
            <p className="text-sm text-muted-foreground">
              Select an image to use, or upload a new one.
            </p>
          )}
        </div>
        <div>
          <input
            type="file"
            ref={inputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
          />
          <Button
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="w-full md:w-auto"
          >
            {uploading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <UploadCloud className="mr-2 h-4 w-4" />
            )}
            Upload Image
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : files.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <ImageIcon className="h-12 w-12 mb-4 opacity-50" />
            <p>No media files found directly.</p>
            <p className="text-sm">Upload your first image to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {files.map((file) => (
            <Card
              key={file.id}
              className="overflow-hidden group hover:ring-2 hover:ring-primary/50 transition-all"
            >
              <div
                className="aspect-square relative bg-muted cursor-pointer"
                onClick={() => isSelectMode && onSelect?.(file.url)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />

                {/* Hover overlay actions */}
                <div
                  className={`absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 ${isSelectMode ? "pointer-events-none" : ""}`}
                >
                  {!isSelectMode && (
                    <>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-24 pointer-events-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(file.url, file.id);
                        }}
                      >
                        {copiedId === file.id ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        Copy URL
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="w-24 pointer-events-auto"
                        disabled={deletingId === file.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(file.name, file.id);
                        }}
                      >
                        {deletingId === file.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4 mr-2" />
                        )}
                        Delete
                      </Button>
                    </>
                  )}
                  {isSelectMode && (
                    <div className="text-white font-medium flex items-center bg-black/50 px-3 py-1.5 rounded-full pointer-events-auto">
                      <Check className="h-4 w-4 mr-2" /> Select
                    </div>
                  )}
                </div>
              </div>
              <div className="p-3 text-xs bg-card border-t">
                <p
                  className="truncate font-medium text-foreground"
                  title={file.name}
                >
                  {file.name}
                </p>
                <div className="flex justify-between text-muted-foreground mt-1 text-[10px]">
                  <span>{formatBytes(file.size)}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
