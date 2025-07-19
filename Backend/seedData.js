const mongoose = require('mongoose');
const Product = require('./models/product');

// ✅ Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://huzaifa:9047huzaifa@pakistanmart.48nbdww.mongodb.net/pakistanmart?retryWrites=true&w=majority')
    .then(() => console.log("✅ MongoDB Atlas Connected for Seeding"))
    .catch((err) => console.error("❌ DB Connection Error", err));

// ✅ Sample Items
const paperItems = [
    'Notebooks',
    'Sticky Notes',
    'Printing Paper',
    'Diaries',
    'Art Paper',
    'Envelopes',
];

const techItems = [
    'Headphones',
    'USB Cables',
    'Power Banks',
    'Smart Watches',
    'Mouse',
    'Phone Stands',
];

const sampleDescriptions = [
    "Top-quality and perfect for daily use.",
    "High performance and sleek design.",
    "Crafted with care and long-lasting material.",
    "Customer favorite with excellent reviews.",
    "Stylish, durable, and affordable.",
    "Best in class comfort and features."
];

const images = {
    'Notebooks': 'https://source.unsplash.com/featured/?notebook',
    'Sticky Notes': 'https://source.unsplash.com/featured/?sticky-notes',
    'Printing Paper': 'https://source.unsplash.com/featured/?printing-paper',
    'Diaries': 'https://source.unsplash.com/featured/?diary',
    'Art Paper': 'https://source.unsplash.com/featured/?artpaper',
    'Envelopes': 'https://source.unsplash.com/featured/?envelope',
    'Headphones': 'https://source.unsplash.com/featured/?headphones',
    'USB Cables': 'https://source.unsplash.com/featured/?usb',
    'Power Banks': 'https://source.unsplash.com/featured/?powerbank',
    'Smart Watches': 'https://source.unsplash.com/featured/?watch',
    'Mouse': 'https://source.unsplash.com/featured/?mouse',
    'Phone Stands': 'https://source.unsplash.com/featured/?phonestand',
};

// ✅ Generate 100 Dummy Products
const dummyProducts = Array.from({ length: 100 }).map((_, index) => {
    const isPaper = Math.random() < 0.5;
    const category = isPaper ? 'Paper Products' : 'Tech Products';
    const items = isPaper ? paperItems : techItems;
    const name = items[Math.floor(Math.random() * items.length)];

    return {
        name: `Huzaifa ${name} #${index + 1}`,
        description: sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)],
        price: Math.floor(Math.random() * 9500) + 500,
        image: images[name] || 'https://source.unsplash.com/featured/?product',
        category,
    };
});

// ✅ Seed Function
const seedDB = async () => {
    try {
        await Product.deleteMany({});
        await Product.insertMany(dummyProducts);
        console.log("🌱 Seeded 100 Huzaifa Store Products with categories successfully!");
    } catch (error) {
        console.error("❌ Seeding Failed:", error.message);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
