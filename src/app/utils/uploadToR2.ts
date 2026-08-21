import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/config/r2";
import sharp from "sharp";

interface UploadToR2Params {
    file: Buffer;
    folder: string;
    fileName: string;
    contentType: string;
}

export const uploadToR2 = async ({
    file,
    folder,
    fileName,
    contentType,
}: UploadToR2Params) => {

    let optimizedBuffer = file;
    let finalContentType = contentType;
    let finalFileName = fileName;

    // Optimize images except SVG
    if (
        contentType.startsWith("image/") &&
        !contentType.includes("svg")
    ) {
        try {
            // Change extension to .webp
            const lastDotIndex = fileName.lastIndexOf(".");

            finalFileName =
                lastDotIndex !== -1
                    ? `${fileName.substring(0, lastDotIndex)}.webp`
                    : `${fileName}.webp`;

            finalContentType = "image/webp";

            // Start with 75 quality
            let quality = 75;

            optimizedBuffer = await sharp(file)
                .resize({
                    width: 800,
                    withoutEnlargement: true,
                })
                .webp({
                    quality,
                })
                .toBuffer();

            // Keep reducing quality until <= 50 KB
            while (
                optimizedBuffer.length > 51200 &&
                quality > 20
            ) {
                quality -= 10;

                optimizedBuffer = await sharp(file)
                    .resize({
                        width: 800,
                        withoutEnlargement: true,
                    })
                    .webp({
                        quality,
                    })
                    .toBuffer();
            }

            // If still above 50 KB,
            // reduce dimensions
            if (optimizedBuffer.length > 51200) {
                optimizedBuffer = await sharp(file)
                    .resize({
                        width: 600,
                        withoutEnlargement: true,
                    })
                    .webp({
                        quality: 55,
                    })
                    .toBuffer();
            }

        } catch (error) {
            console.error("Sharp optimization failed:", error);

            throw new Error("Failed to optimize image");
        }
    }

    // R2 object key
    const key = `${folder}/${finalFileName}`;

    // Upload to Cloudflare R2
    const command = new PutObjectCommand({
        Bucket: process.env.CLOUD_FLARE_R2_BUCKET!,
        Key: key,
        Body: optimizedBuffer,
        ContentType: finalContentType,
    });

    await r2.send(command);

    // Return information to save in MongoDB
    return {
        key,
        url: `${process.env.CLOUD_FLARE_R2_PUBLIC_URL}/${key}`,
    };
};