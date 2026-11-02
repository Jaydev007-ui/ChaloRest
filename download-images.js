const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const images = [
  {
    name: 'highway-hero.jpg',
    url: 'https://images.unsplash.com/photo-1761265228803-3c5ca8c0821e?auto=format&fit=crop&w=2400&q=85',
    fallback: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=2400&q=85'
  },
  {
    name: 'shared-accommodation.jpg',
    url: 'https://images.unsplash.com/photo-1768289269971-6171457bed13?auto=format&fit=crop&w=1400&q=85',
    fallback: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1400&q=85'
  },
  {
    name: 'truck-highway.jpg',
    url: 'https://images.unsplash.com/photo-1563380362065-5a92d7d1c3a8?auto=format&fit=crop&w=1400&q=85',
    fallback: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1400&q=85'
  },
  {
    name: 'motorcycle-road.jpg',
    url: 'https://images.unsplash.com/photo-1774012988769-758cd715d986?auto=format&fit=crop&w=1400&q=85',
    fallback: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1400&q=85'
  },
  {
    name: 'partner-hotel.jpg',
    url: 'https://images.unsplash.com/photo-1586114660116-60f888e9dc68?auto=format&fit=crop&w=1400&q=85',
    fallback: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85'
  }
];

function download(url, dest, cb) {
  const file = fs.createWriteStream(dest);
  const req = https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      file.close();
      return download(res.headers.location, dest, cb);
    }
    if (res.statusCode !== 200) {
      file.close();
      return cb(new Error(`Status ${res.statusCode}`));
    }
    res.pipe(file);
    file.on('finish', () => {
      file.close(() => cb(null));
    });
  });
  req.on('error', (err) => {
    fs.unlink(dest, () => {});
    cb(err);
  });
}

async function run() {
  for (const item of images) {
    const dest = path.join(targetDir, item.name);
    console.log(`Downloading ${item.name}...`);
    try {
      await new Promise((resolve, reject) => {
        download(item.url, dest, (err) => {
          if (err) {
            console.warn(`Primary failed for ${item.name}: ${err.message}. Trying fallback...`);
            download(item.fallback, dest, (err2) => {
              if (err2) reject(err2);
              else resolve();
            });
          } else {
            resolve();
          }
        });
      });
      console.log(`Saved ${item.name} (${fs.statSync(dest).size} bytes)`);
    } catch (e) {
      console.error(`Failed ${item.name}:`, e);
    }
  }
}

run();
