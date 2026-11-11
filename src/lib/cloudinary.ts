import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary server-side
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
  secure: true,
});

export { cloudinary };

export const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

/**
 * Generate a cryptographically signed signature for direct client-to-Cloudinary upload.
 * Keeps the API secret strictly server-side.
 */
export function generateUploadSignature(folder: string = "cole_man/photographs") {
  if (!process.env.CLOUDINARY_API_SECRET || !process.env.CLOUDINARY_API_KEY) {
    // Return dummy payload for demo/development when env vars aren't populated yet
    return {
      timestamp: Math.round(new Date().getTime() / 1000),
      signature: "mock_signature_dev_mode",
      apiKey: process.env.CLOUDINARY_API_KEY || "mock_key",
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || "demo",
      folder,
      isConfigured: false,
    };
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  const paramsToSign: Record<string, string | number> = {
    folder,
    timestamp,
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET
  );

  return {
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    folder,
    isConfigured: true,
  };
}

/**
 * Delete an asset from Cloudinary by its public ID.
 */
export async function deleteCloudinaryAsset(publicId: string): Promise<boolean> {
  if (!isCloudinaryConfigured) {
    console.info(`[Cloudinary Mock] Pretended deletion for publicId: ${publicId}`);
    return true;
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
    });
    return result.result === "ok";
  } catch (error) {
    console.error(`Failed to delete Cloudinary asset ${publicId}:`, error);
    return false;
  }
}

/**
 * Helper to build optimized Cloudinary URLs with dynamic transformations (WebP, f_auto, q_auto)
 */
export function getOptimizedImageUrl(
  urlOrPublicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: "fill" | "limit" | "fit" | "scale";
    quality?: "auto" | number;
    format?: "auto" | "webp" | "avif";
  } = {}
): string {
  // If it's already a full non-cloudinary URL (e.g., Unsplash mock data), return it directly with query params
  if (urlOrPublicId.startsWith("http") && !urlOrPublicId.includes("cloudinary.com")) {
    return urlOrPublicId;
  }

  const { width, height, crop = "fill", quality = "auto", format = "auto" } = options;

  if (urlOrPublicId.startsWith("http") && urlOrPublicId.includes("/upload/")) {
    // Inject transformations into existing Cloudinary URL
    const transformParts: string[] = [`f_${format}`, `q_${quality}`];
    if (width) transformParts.push(`w_${width}`);
    if (height) transformParts.push(`h_${height}`);
    if (crop) transformParts.push(`c_${crop}`);

    const transformStr = transformParts.join(",");
    return urlOrPublicId.replace("/upload/", `/upload/${transformStr}/`);
  }

  if (isCloudinaryConfigured && !urlOrPublicId.startsWith("http")) {
    return cloudinary.url(urlOrPublicId, {
      width,
      height,
      crop,
      quality,
      fetch_format: format,
      secure: true,
    });
  }

  return urlOrPublicId;
}

