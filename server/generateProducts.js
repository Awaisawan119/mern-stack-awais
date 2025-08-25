const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

// ---- CONFIG ----
const BASE_DIR = path.join(__dirname, "public"); // Adjust if public folder is in a different location
const OUTPUT_FILE = "products.json";
const MONGO_URI = "mongodb+srv://awais119:cuiwah119@awaiscluster.yjmalsk.mongodb.net/myDatabase?retryWrites=true&w=majority";
const DB_NAME = "myDatabase"; // Your DB name
const COLLECTION_NAME = "items"; // Your collection name

// ---- HELPER FUNCTIONS ----
function generatePrice(min = 1000, max = 5000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatName(filename, category, index) {
  let name = filename.split(".")[0];
  if (name.startsWith("images-")) {
    return `${category.charAt(0).toUpperCase() + category.slice(1)} Item ${index + 1}`;
  }
  return name.replace(/[-_]/g, " ");
}

function createSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

async function main() {
  const categories = fs.readdirSync(BASE_DIR).filter(f => fs.lstatSync(path.join(BASE_DIR, f)).isDirectory());
  let products = [];

  categories.forEach(category => {
    const folderPath = path.join(BASE_DIR, category);
    const files = fs.readdirSync(folderPath).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
    files.sort();

    for (let i = 0; i < files.length; i += 2) {
      const img1 = files[i];
      const img2 = files[i + 1] || files[i];
      const name = formatName(img1, category, i / 2);

      products.push({
        name: name,
        slug: createSlug(name),
        price: generatePrice(),
        category: category,
        description: `Premium ${category} product`,
        image: [
          { filename: img1 },
          { filename: img2 }
        ]
      });
    }
  });

  // Save products to JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(products, null, 2));
  console.log(`✅ Generated ${products.length} products in ${OUTPUT_FILE}`);

  // ---- Insert into MongoDB ----
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Clear old data (optional)
    await collection.deleteMany({});
    console.log("🗑 Cleared old data from collection.");

    // Insert new products
    await collection.insertMany(products);
    console.log("✅ Products inserted into MongoDB successfully!");
  } catch (err) {
    console.error("❌ MongoDB Insert Error:", err.message);
  } finally {
    await client.close();
  }
}

main();
