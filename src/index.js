const express = require('express');
const rotas = require('./rotas');
const app = express();

//direi ao servidor que as REQ's devem ser em formato JSON:
app.use(express.json());

app.use(rotas);

app.listen(3000);