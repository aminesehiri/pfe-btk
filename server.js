const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Define storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // We'll create the directory in the route handler
    cb(null, '');
  },
  filename: function (req, file, cb) {
    console.log(`Uploading file: ${file.originalname}`);
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', (req, res, next) => {
  // Handle form data and create directory
  const form = upload.single('file');
  form(req, res, (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).send('Error uploading file');
    }

    const { dashboardName, description, firstName, lastName, pin } = req.body;
    if (!dashboardName) {
      return res.status(400).send('Dashboard name is required');
    }

    const sanitizedDashboardName = dashboardName.replace(/[^a-zA-Z0-9]/g, '_'); // Sanitize folder name
    const dir = path.join(`C:/Users/shiri/OneDrive/Bureau/amine/site/uploads_excels/${sanitizedDashboardName}`);
    console.log(`Destination directory: ${dir}`);

    if (!fs.existsSync(dir)) {
      console.log(`Directory does not exist. Creating...`);
      try {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Directory created successfully.`);
      } catch (err) {
        console.error(`Error creating directory: ${err}`);
        return res.status(500).send('Error creating directory');
      }
    } else {
      console.log(`Directory already exists.`);
    }

    // Move the uploaded file to the directory
    const filePath = path.join(dir, req.file.originalname);
    fs.rename(req.file.path, filePath, (err) => {
      if (err) {
        console.error('Error moving file:', err);
        return res.status(500).send('Error moving file');
      }

      const noteContent = `Titre: ${dashboardName}\nDescription: ${description}\nPrénom: ${firstName}\nNom: ${lastName}\nPIN: ${pin}\nDate de la demande: ${new Date().toISOString().split('T')[0]}\n`;
      const notePath = path.join(dir, 'info.txt');

      // Save the text file with information
      console.log(`Saving text file with info at: ${notePath}`);
      fs.writeFile(notePath, noteContent, (err) => {
        if (err) {
          console.error('Error writing to note file:', err);
          return res.status(500).send('Internal Server Error');
        }
        console.log('Text file created successfully.');
        res.send('File uploaded and info saved successfully');
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
