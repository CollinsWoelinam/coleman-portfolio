"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, CheckCircle2, AlertCircle, Loader2, X, RefreshCw } from "lucide-react";

interface PhotoUploaderProps {
  onUploadSuccess: (result: {
    imageUrl: string;
    publicId: string;
    width: number;
    height: number;
    format: string;
  }) => void;
  initialImageUrl?: string;
}

export default function PhotoUploader({
  onUploadSuccess,
  initialImageUrl,
}: PhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(initialImageUrl || "");
  const [error, setError] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type & size
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPEG, PNG, WebP).");
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setError("File exceeds maximum allowed size (25MB).");
      return;
    }

    setError("");
    setUploading(true);
    setUploadProgress("Acquiring Cloudinary signature...");

    // Create immediate local preview
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    try {
      // 1. Fetch secure signature from Next.js backend
      const signRes = await fetch("/api/admin/cloudinary-sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: "cole_man/photographs" }),
      });

      if (!signRes.ok) {
        throw new Error("Unable to obtain secure upload signature.");
      }

      const signData = await signRes.json();

      // If Cloudinary is configured, upload directly from browser to Cloudinary
      if (signData.isConfigured && signData.cloudName && signData.apiKey) {
        setUploadProgress("Uploading directly to Cloudinary CDN...");
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", signData.apiKey);
        formData.append("timestamp", String(signData.timestamp));
        formData.append("signature", signData.signature);
        formData.append("folder", signData.folder);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadRes.ok) {
          const errData = await uploadRes.json();
          throw new Error(errData.error?.message || "Cloudinary upload failed");
        }

        const data = await uploadRes.json();
        setPreviewUrl(data.secure_url);
        onUploadSuccess({
          imageUrl: data.secure_url,
          publicId: data.public_id,
          width: data.width,
          height: data.height,
          format: data.format,
        });
      } else {
        // Fallback / Development mode when real Cloudinary API keys are not supplied yet
        setUploadProgress("Mock upload completed (Dev Mode)");
        const simulatedPublicId = `cole_man/dev_${Date.now()}`;
        onUploadSuccess({
          imageUrl: localUrl,
          publicId: simulatedPublicId,
          width: 1600,
          height: 1067,
          format: file.type.split("/")[1] || "jpg",
        });
      }

      setUploading(false);
      setUploadProgress("");
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload image.");
      setUploading(false);
    }
  };

  const handleClear = () => {
    setPreviewUrl("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <div className="p-3.5 rounded bg-rose-950/40 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {previewUrl ? (
        <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden bg-[#181818] border border-[#2E2E2E]">
          <Image
            src={previewUrl}
            alt="Upload Preview"
            fill
            className="object-contain"
          />

          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-full bg-[#121212]/80 text-[#F5F5F0] hover:bg-[#84936A] hover:text-[#121212] transition shadow"
              title="Replace image"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="p-2 rounded-full bg-[#121212]/80 text-[#F5F5F0] hover:bg-rose-900 transition shadow"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-3 left-3 bg-[#121212]/90 backdrop-blur-sm px-3 py-1 rounded text-[11px] font-mono text-[#84936A] border border-[#84936A]/30">
            Image Ready for Publishing
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-[#2E2E2E] hover:border-[#84936A] rounded-sm p-12 text-center cursor-pointer transition bg-[#181818]/60 hover:bg-[#1E1E1E]/60 space-y-4"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-[#242424] flex items-center justify-center text-[#84936A]">
            {uploading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <UploadCloud className="w-6 h-6" />
            )}
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-[#F5F5F0]">
              {uploading ? uploadProgress : "Click to select a photograph to upload"}
            </p>
            <p className="text-xs text-[#737373]">
              Supports high-resolution JPEG, PNG, TIFF, or WebP up to 25MB.
            </p>
          </div>

          <p className="text-[10px] font-mono uppercase tracking-wider text-[#84936A]">
            Direct Signed Cloudinary Upload
          </p>
        </div>
      )}
    </div>
  );
}

