const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000; // Change the port to 5000 or any other available port

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'C:/Users/shiri/OneDrive/Bureau/amine/site/uploads_excels');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
