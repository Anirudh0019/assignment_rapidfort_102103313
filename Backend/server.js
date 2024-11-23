const express = require('express');
const cors = require('cors'); // Import cors
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname,'dist')));
app.use(cors()); // Enable CORS
// app.use(express.json);
// Ensure upload and converted directories exist
const uploadDir = path.join(__dirname, 'src', 'uploads');
const convertedDir = path.join(__dirname, 'src', 'converted');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(convertedDir)) {
  fs.mkdirSync(convertedDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return cb(new Error('Only .docx files are allowed'));
    }
    cb(null, true);
  },
});

app.post('/convert', upload.single('file'), (req, res) => {
  const docxFilePath = path.join(uploadDir, req.file.filename);
  const pdfFilePath = path.join(convertedDir, `${req.file.filename}.pdf`);

  exec(`libreoffice --headless --convert-to pdf "${docxFilePath}" --outdir "${convertedDir}"`, (error) => {
    if (error) {
      console.error('Error during conversion:', error);
      return res.status(500).json({ error: 'Conversion failed' });
    }

    res.download(pdfFilePath, `${path.parse(req.file.originalname).name}.pdf`, (err) => {
      if (err) {
        console.error('Error sending PDF:', err);
        return res.status(500).send('Error downloading the file');
      }

      fs.unlink(docxFilePath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting DOCX file:', unlinkErr);
      });
      fs.unlink(pdfFilePath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting PDF file:', unlinkErr);
      });
    });
  });
});

// app.get('*',(req,res)=>{
//   res.sendFile(path.resolve('dist','index.html'));
// })

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
