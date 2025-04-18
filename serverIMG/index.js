const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('node:fs');

const app = express();

// Habilitar CORS antes de definir las rutas
app.use(cors({
  origin: ['http://localhost:4000', 'http://localhost:5173'], // Agrega los dominios permitidos
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const upload = multer({ dest: 'uploads/' });

const saveImage = (file) => {
  try {
    const newPath = `../kurochat/public/uploads/${file.originalname}`;
    const returnPath = `/uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return returnPath;
  } catch (error) {
    console.error('Error al guardar la imagen:', error);
    return null;
  }
};

// Ruta para subir archivos
app.post('/upload', upload.single('file'), (req, res) => {
  const path = saveImage(req.file);
  
  if (!path) {
    return res.status(500).json({ error: 'Error al guardar la imagen' });
  }

  res.json({ path: path, status: 200 });
});

// Iniciar el servidor
app.listen(4000, () => {
  console.log('Servidor corriendo en el puerto 4000');
});
