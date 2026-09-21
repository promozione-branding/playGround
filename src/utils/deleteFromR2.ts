import { r2 } from "@/config/r2";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";


export const deleteFromR2 = async (
  key: string | undefined | null
): Promise<boolean> => {
  try {
    if (!key) return false;

    const bucketName = process.env.CLOUD_FLARE_R2_BUCKET;

    if (!bucketName) {
      throw new Error(
        "CLOUD_FLARE_R2_BUCKET environment variable is not defined"
      );
    }

    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await r2.send(command);

    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("R2 Delete Error:", error.message);
    } else {
      console.error("R2 Delete Error:", error);
    }

    return false;
  }
};