const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Conexión a MySQL
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Jc*150416', 
  database: 'ventas_autopartes'
});

conexion.connect((err) => {
  if (err) {
    console.log('Error de conexión:', err);
  } else {
    console.log('Conectado a MySQL ✅');
  }
});

// Obtener productos
app.get('/productos', (req, res) => {
  conexion.query('SELECT * FROM productos', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Crear producto
app.post('/productos', (req, res) => {

  // Validar que venga body
  if (!req.body) {
    return res.status(400).json({ error: 'No hay datos' });
  }

  const { nombre, precio, stock } = req.body;

  // Validar campos
  if (!nombre || !precio || !stock) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const sql = 'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)';

  conexion.query(sql, [nombre, precio, stock], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    res.json({ mensaje: 'Producto creado', id: result.insertId });
  });
});
// Actualizar producto
app.put('/productos/:id', (req, res) => {
  const { nombre, precio, stock } = req.body;
  const id = req.params.id;

  const sql = 'UPDATE productos SET nombre=?, precio=?, stock=? WHERE id=?';
  conexion.query(sql, [nombre, precio, stock, id], (err) => {
    if (err) throw err;
    res.send('Producto actualizado');
  });
});

// Eliminar producto
app.delete('/productos/:id', (req, res) => {
  const id = req.params.id;

  conexion.query('DELETE FROM productos WHERE id=?', [id], (err) => {
    if (err) throw err;
    res.send('Producto eliminado');
  });
});

// Ruta principal
app.get('/', (req, res) => {
  res.send('API de Autopartes funcionando 🚗');
});

// Servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});