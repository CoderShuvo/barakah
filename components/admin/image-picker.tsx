"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { MediaLibrary } from "@/components/admin/media-library";
import { Image as ImageIcon } from "lucide-react";

interface ImagePickerProps {
  url: string;
  onUrlChange: (url: string) => void;
  placeholder?: string;
  id?: string;
}

export function ImagePicker({
  url,
  onUrlChange,
  placeholder = "Select or paste image URL",
  id,
}: ImagePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-2 w-full">
      <Input
        id={id}
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1"
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button type="button" variant="outline" className="shrink-0">
            <ImageIcon className="h-4 w-4 mr-2" />
            Media Library
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl w-[90vw] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select Media</DialogTitle>
            <DialogDescription>
              Choose an image from your library or upload a new one.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <MediaLibrary
              isSelectMode
              onSelect={(selectedUrl) => {
                onUrlChange(selectedUrl);
                setOpen(false);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
