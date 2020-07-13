const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const env = require('dotenv').config();

app.use(cors());
//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Importa rotas
const servicos = require('./routes/servicos'); // Importa rota
const produtos = require('./routes/produtos'); // Importa rota
app.use('/', servicos);

//Acesso a BD
console.log('Conectando ao banco de dados');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection
db.once('open', _ => {
    console.log('Banco conectado:')
})

db.on('error', err => {
    console.error('Erro de conexão:')
})

//Servidor
app.use('/servicos', servicos);
app.use('/produtos', produtos);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Rodando na porta ${PORT}');
});