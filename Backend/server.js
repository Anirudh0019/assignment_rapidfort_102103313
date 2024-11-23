const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs').promises;
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(cors());
app.use(express.json());

const uploadDir = path.join(__dirname, 'src', 'uploads');
const convertedDir = path.join(__dirname, 'src', 'converted');

// Ensure upload and converted directories exist
(async () => {
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.mkdir(convertedDir, { recursive: true });
})();

const upload = multer({
  dest: uploadDir,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return cb(new Error('Only .docx files are allowed'));
    }
    cb(null, true);
  },
});

app.post('/convert', upload.single('file'), async (req, res) => {
  const docxFilePath = path.join(uploadDir, req.file.filename);
  const pdfFilePath = path.join(convertedDir, `${req.file.filename}.pdf`);

  try {
    // Read .docx file buffer
    const docxBuffer = await fs.readFile(docxFilePath);

    // Convert .docx to .pdf
    const pdfBuffer = await libre.convertAsync(docxBuffer, '.pdf', undefined);
    await fs.writeFile(pdfFilePath, pdfBuffer);

    // Send converted PDF as a response
    res.download(pdfFilePath, `${path.parse(req.file.originalname).name}.pdf`, async (err) => {
      if (err) {
        console.error('Error sending PDF:', err);
        return res.status(500).send('Error downloading the file');
      }
      
      // Clean up files
      await fs.unlink(docxFilePath).catch(err => console.error('Error deleting DOCX file:', err));
      await fs.unlink(pdfFilePath).catch(err => console.error('Error deleting PDF file:', err));
    });
  } catch (error) {
    console.error('Error during conversion:', error);
    res.status(500).json({ error: 'Conversion failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
