// Use ES module import syntax
import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";
import admin from "firebase-admin";
import cors from "cors";

// Initialize admin SDK
admin.initializeApp();

// Initialize CORS middleware
const corsHandler = cors({ origin: true });

// Define your function
export const handleFileUpload = onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      if (req.method === "POST") {
        const { file, title, description } = req.body;

        if (!file || !title || !description) {
          res.status(400).send("Missing file, title, or description.");
          return;
        }

        const storageRef = admin.storage().bucket().file(`images/${file.name}`);
        await storageRef.save(file.buffer, { contentType: file.mimetype });

        const downloadURL = await storageRef.getSignedUrl({ action: 'read', expires: '03-09-2491' });

        const newArticle = {
          title,
          description,
          imageUrl: downloadURL[0],
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        await admin.firestore().collection("news").add(newArticle);

        res.status(200).send("File uploaded successfully!");
      } else {
        res.status(405).send("Method Not Allowed");
      }
    } catch (error) {
      console.error("Error in file upload:", error);
      res.status(500).send("Error processing the file upload");
    }
  });
});
