const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Ensure upload and converted directories exist
const uploadDir = path.join(__dirname, 'src', 'uploads');
const convertedDir = path.join(__dirname, 'src', 'converted');

// Create directories if they do not exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(convertedDir)) {
  fs.mkdirSync(convertedDir, { recursive: true });
}

// Set up multer for file uploads with file type validation
const upload = multer({
  dest: uploadDir,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return cb(new Error('Only .docx files are allowed'));
    }
    cb(null, true);
  },
});

// Endpoint for converting DOCX to PDF
app.post('/convert', upload.single('file'), (req, res) => {
  const docxFilePath = path.join(uploadDir, req.file.filename);
  const pdfFilePath = path.join(convertedDir, `${req.file.filename}.pdf`);

  // Command to convert DOCX to PDF using LibreOffice
  exec(`libreoffice --headless --convert-to pdf "${docxFilePath}" --outdir "${convertedDir}"`, (error) => {
    if (error) {
      console.error('Error during conversion:', error);
      return res.status(500).json({ error: 'Conversion failed' });
    }

    // Send the converted PDF file to the client
    res.download(pdfFilePath, `${path.parse(req.file.originalname).name}.pdf`, (err) => {
      if (err) {
        console.error('Error sending PDF:', err);
        return res.status(500).send('Error downloading the file');
      }

      // Clean up files after download
      fs.unlink(docxFilePath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting DOCX file:', unlinkErr);
      });
      fs.unlink(pdfFilePath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting PDF file:', unlinkErr);
      });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
