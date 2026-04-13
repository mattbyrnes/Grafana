import sharp from "sharp";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

const imageUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-07-09-pSvSZjeLZ9n9K5Y6SSMjCEJAMe6ylY.jpg";
const tempOutputPath = "/tmp/4ever-young-midtown.jpg";

async function cropImage() {
  try {
    // Fetch the image from the URL
    console.log("[v0] Fetching image from URL...");
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();

    // Get image metadata to determine dimensions
    const metadata = await sharp(buffer).metadata();
    console.log(
      `[v0] Original image dimensions: ${metadata.width}x${metadata.height}`
    );

    // Crop to 1200x400 (desktop hero size)
    // For small images, we'll scale up and center
    const targetWidth = 1200;
    const targetHeight = 400;

    console.log(`[v0] Resizing to ${targetWidth}x${targetHeight}...`);
    const croppedImage = await sharp(buffer)
      .resize(targetWidth, targetHeight, {
        fit: "cover",
        position: "center",
      })
      .toFile(tempOutputPath);

    console.log(`[v0] Image successfully cropped and saved to ${tempOutputPath}`);
    console.log(`[v0] Final dimensions: ${croppedImage.width}x${croppedImage.height}`);
    
    // Read the file back to verify
    const fileStats = fs.statSync(tempOutputPath);
    console.log(`[v0] File size: ${fileStats.size} bytes`);
  } catch (error) {
    console.error("[v0] Error cropping image:", error.message);
    process.exit(1);
  }
}

cropImage();
