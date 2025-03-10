// uploadFile.js
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

const uploadFile = async (file) => {
    try {
        const storageRef = ref(storage, `images/${file.name}`); // Include 'images/' prefix
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
    } catch (error) {
        console.error("Firebase upload error:", error);
        return {
            data: {
                success: false,
                message: error.message || "Upload failed",
            },
        };
    }
};

export default uploadFile;