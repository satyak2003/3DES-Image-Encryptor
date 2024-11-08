const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;


const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

//multer
const upload = multer({ dest: uploadDir });


app.use(express.static('public'));
app.use(express.json()); // For JSON requests (key handling)

//index
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Encryption Page
app.get('/encrypt', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'encrypt.html'));
});

// Generate Key
app.get('/generate-key', (req, res) => {
  const key = crypto.randomBytes(24).toString('hex'); // Generate 24-byte key
  res.json({ key });
});

// Encryption Route
app.post('/encrypt', upload.single('image'), (req, res) => {
  const key = Buffer.from(req.body.key, 'hex');
  const imageData = fs.readFileSync(req.file.path);

  const cipher = crypto.createCipheriv('des-ede3', key, null);
  const encryptedData = Buffer.concat([cipher.update(imageData), cipher.final()]);

  const encryptedPath = path.join(uploadDir, 'encrypted_image.enc');
  fs.writeFileSync(encryptedPath, encryptedData);

  fs.unlinkSync(req.file.path); // Clean up uploaded file

  res.json({ filePath: `/download/encrypted_image.enc` });
});

// Download for Encrypted File
app.get('/download/:filename', (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  res.download(filePath, (err) => {
    if (err) console.error('Download error:', err);
    fs.unlinkSync(filePath); // Clean up after download
  });
});

// Decryption Page
app.get('/decrypt', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'decrypt.html'));
});

// Decryption Route
app.post('/decrypt', upload.single('image'), (req, res) => {
  const key = Buffer.from(req.body.key, 'hex');
  const encryptedData = fs.readFileSync(req.file.path);

  try {
    const decipher = crypto.createDecipheriv('des-ede3', key, null);
    const decryptedData = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

    const decryptedPath = path.join(uploadDir, 'decrypted_image.png');
    fs.writeFileSync(decryptedPath, decryptedData);

    fs.unlinkSync(req.file.path); // Clean up uploaded file

    res.json({ filePath: `/download/decrypted_image.png` });
  } catch (error) {
    res.status(400).send('Invalid key or corrupted file.');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
