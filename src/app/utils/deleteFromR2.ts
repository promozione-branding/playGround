import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/config/r2";

export const deleteFromR2 = async (key: string) => {
    if (!key) {
        throw new Error("R2 object key is required");
    }

    try {
        const command = new DeleteObjectCommand({
            Bucket: process.env.CLOUD_FLARE_R2_BUCKET!,
            Key: key,
        });

        await r2.send(command);

        return true;
    } catch (error) {
        console.error("R2 Delete Error:", error);

        throw error;
    }
};