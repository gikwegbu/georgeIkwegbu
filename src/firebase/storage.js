import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./config";

/**
 * Upload a file to Firebase Storage.
 * @param {File} file
 * @param {string} folder
 * @param {function} onProgress (optional callback for progress 0-100)
 * @returns {Promise<{ downloadUrl: string, fullPath: string }>}
 */
export async function uploadFileToStorage(file, folder = "projects", onProgress = null) {
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const fullPath = `${folder}/${timestamp}_${safeName}`;
  const storageRef = ref(storage, fullPath);

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (onProgress && snapshot.totalBytes > 0) {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          onProgress(progress);
        }
      },
      (error) => {
        console.error("Storage upload error:", error);
        reject(error);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({ downloadUrl, fullPath });
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

/**
 * Delete a file from Firebase Storage using its download URL or storage path.
 * @param {string} urlOrPath
 */
export async function deleteStorageFile(urlOrPath) {
  if (!urlOrPath) return;

  try {
    let storageRef;
    if (urlOrPath.startsWith("gs://") || urlOrPath.startsWith("http")) {
      storageRef = ref(storage, urlOrPath);
    } else {
      storageRef = ref(storage, urlOrPath);
    }
    await deleteObject(storageRef);
  } catch (error) {
    // If file is not found or is external (e.g. dev.to / dev-to-uploads), ignore error gracefully
    if (error.code !== "storage/object-not-found") {
      console.warn("Could not delete file from Firebase Storage:", error);
    }
  }
}
