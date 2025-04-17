import express from 'express';
import { testarConexao } from './db.js'
import cors from 'cors'
import rotasUsuarios from './routes/rotasUsuarios.js'
import rotasCategorias from './routes/rotasCategorias.js'
// import rotasSubcategorias from './routes/rotasSubcategorias.js'
import rotasSubcategorias from './routes/rotasSubcategorias.js';
const app = express()
testarConexao();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API funcionando!')
})

//Rotas Usuarios
app.post('/usuarios', rotasUsuarios.novoUsuario)
app.get('/usuarios', rotasUsuarios.listarUsuarios)
app.delete('/usuarios', rotasUsuarios.deletarUsuarios)
app.put('/usuarios', rotasUsuarios.editarUsuarios)
app.post('/usuarios/login', rotasUsuarios.login)

// Rotas categorias
app.post('/categorias',  rotasCategorias.novaCategoria)
app.get('/categorias', rotasCategorias.listarTodas)
app.delete('/categorias/:id', rotasCategorias.Deletar)
app.put('/categorias/:id', rotasCategorias.atualizarTodosCampos)
app.patch('/categorias/:id', rotasCategorias.Atualizar)
app.get('/categorias/:id', rotasCategorias.ListarporID)

//Rotas Subcategorias
app.post('/subcategorias', rotasSubcategorias.novaSubCategoria)
app.delete('/subcategorias/:id', rotasSubcategorias.deletarSubcategoria)
app.get('/subcategorias', rotasSubcategorias.listarSubcategorias)
app.get('/subcategorias/:id', rotasSubcategorias.ListarporID)
app.put('/subcategorias/:id', rotasSubcategorias.atualizartodosCampos)
app.patch('/subcategorias/:id', rotasSubcategorias.Atualizar)


//Rotas local Transacao
//app.post('/localtransacao', rotaslocalTransacoes.nova)
//app.get('/localtransacao', rotaslocalTransacoes.listar)
//app.get('/localtransacao/:id_local_transacao', rotaslocalTransacoes.listarPorID)
//app.patch('/localtransacao/:id_local_transacao', rotaslocalTransacoes.atualizar)
//app.put('/localtransacao/:id_local_transacao', rotaslocalTransacoes.atualizarTodos)
//app.delete('/localtransacao/:id_local_transacao', rotaslocalTransacoes.deletar)

//Rotas Transacoes
//app.post('/transacoes', rotasTransacoes.nova)
//app.get('/transacoes', rotasTransacoes.listar)
//app.get('/transacoes/:id_transacao', rotasTransacoes.listarPorID)
//app.patch('/transacoes/:id_transacao', rotasTransacoes.atualizar)
//app.put('/transacoes/:id_transacao', rotasTransacoes.atualizarTodos)
//app.delete('/transacoes/:id_transacao', rotasTransacoes.deletar)

const porta = 3000;
app.listen(porta, () => {
    console.log(`Api http://localhost:${porta}`)
})