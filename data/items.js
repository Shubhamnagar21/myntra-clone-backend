const fs = require('node:fs/promises');
const path = require('path');

const filePath = path.join(__dirname, 'items.json');

async function getStoredItems() {
  try {
    const rawFileContent = await fs.readFile(filePath, { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    return data.items ?? [];
  } catch (error) {
    console.error("Error reading items.json:", error);
    return []; // Return an empty array if file reading fails
  }
}

// ⚠️ Writing to items.json WILL NOT WORK on Vercel
function storeItems(items) {
  console.warn("storeItems() will not work on Vercel (read-only filesystem).");
  return fs.writeFile(filePath, JSON.stringify({ items: items || [] }));
}

exports.getStoredItems = getStoredItems;
exports.storeItems = storeItems;
