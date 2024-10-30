import multer from "multer";

/**
 * Configure multer storage settings for file uploads
 */
// Set upload destination folder
const destination = "uploads/";

// Configure filename format
const generateFilename = (req, file, cb) => {
    // Extract original filename without extension
    const imageName = `image-${Date.now()}`;
    
    // Save file with original name and .jpg extension
    cb(null, `${imageName}.jpg`);
};

const storage = multer.diskStorage({
    destination,
    filename: generateFilename
});

// Create multer upload instance with storage config
const upload = multer({ storage });

/**
 * Middleware for handling single image file uploads
 * @returns {Function} Multer middleware configured for single 'image' file
 */
const singleFileUpload = upload.single('image');

export {
    singleFileUpload
}