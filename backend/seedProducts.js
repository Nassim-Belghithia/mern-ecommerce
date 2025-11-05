require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// Product data from frontend
const products = [
  {
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "product_1.png",
    new_price: 50.0,
    old_price: 80.5,
  },
  {
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "product_2.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "product_3.png",
    new_price: 60.0,
    old_price: 100.5,
  },
  {
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "product_4.png",
    new_price: 100.0,
    old_price: 150.0,
  },
  {
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "product_5.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "product_6.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "product_7.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "product_8.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "product_9.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "product_10.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "product_11.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "product_12.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    image: "product_13.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    image: "product_14.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    image: "product_15.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    image: "product_16.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    image: "product_17.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    image: "product_18.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    image: "product_19.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    image: "product_20.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    image: "product_21.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    image: "product_22.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    image: "product_23.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    image: "product_24.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "kid",
    image: "product_25.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "kid",
    image: "product_26.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "kid",
    image: "product_27.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "kid",
    image: "product_28.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "kid",
    image: "product_29.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "kid",
    image: "product_30.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "kid",
    image: "product_31.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "kid",
    image: "product_32.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "kid",
    image: "product_33.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "kid",
    image: "product_34.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "kid",
    image: "product_35.png",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "kid",
    image: "product_36.png",
    new_price: 85.0,
    old_price: 120.5,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to database');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert products
    await Product.insertMany(products);
    console.log(`Successfully seeded ${products.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();

