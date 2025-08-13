// backend/cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const folder = req.body.category || 'products';
        return {
            folder,
            allowed_formats: ['jpg', 'jpeg', 'png'],
            // Use original name + timestamp to avoid overwriting
            public_id: `${file.originalname.split('.')[0]}-${Date.now()}`,
        };
    },
});

module.exports = { cloudinary, storage };
