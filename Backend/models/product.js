const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },          // make name required
    description: { type: String, default: '' },
    price: { type: Number, required: true },         // make price required
    image: { type: String, default: '' },            // Cloudinary URL
    category: { type: String, default: 'General' },  // default category
}, { timestamps: true });                            // createdAt & updatedAt

module.exports = mongoose.model('Product', productSchema);
