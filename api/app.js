import express from 'express';
import { testarConexao } from './db.js'
import cors from 'cors'
import rotasUsuarios, { autenticarToken } from './routes/rotasUsuarios.js'
import rotasCategorias from './routes/rotasCategorias.js'
// import rotasSubcategorias from './routes/rotasSubcategorias.js'
import rotasSubcategorias from './routes/rotasSubcategorias.js';
// import rotaslocalTransacoes from './routes/rotaslocalTransacoes.js';
import RotasContas from './routes/rotasContas.js';
import rotasTransacoes from './routes/rotasTransacoes.js';
// import rotasTransacoes from './routes/rotasTransacoes.js';
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
app.delete('/usuarios/:id', autenticarToken, rotasUsuarios.deletarUsuarios)
app.patch('/usuarios/:id', autenticarToken, rotasUsuarios.atualizar)
app.put('/usuarios', rotasUsuarios.editarUsuarios)
app.post('/usuarios/login', rotasUsuarios.login)
app.post('/usuarios', autenticarToken, rotasUsuarios.listarUsuarios)
app.get('/usuarios/:id', autenticarToken, rotasUsuarios.filtrarUsuarios)

// Rotas categorias
app.post('/categorias', autenticarToken,rotasCategorias.novaCategoria)
app.get('/categorias/filtrarCategorias', rotasCategorias.filtrarCategoria)
app.get('/categorias', rotasCategorias.listarTodas)
app.delete('/categorias/:id', rotasCategorias.Deletar)
app.put('/categorias/:id', rotasCategorias.atualizarTodosCampos)
app.patch('/categorias/:id', rotasCategorias.Atualizar)
app.get('/categorias/:id', rotasCategorias.ListarporID)

//Rotas Subcategorias
app.post('/subcategorias', rotasSubcategorias.novaSubCategoria)
app.delete('/subcategorias/:id', rotasSubcategorias.deletarSubcategoria)
app.get('/subcategorias/filtrarSubcategorias', rotasSubcategorias.filtrarSubcategorias)
app.get('/subcategorias', rotasSubcategorias.listarSubcategorias)
app.get('/subcategorias/:id', rotasSubcategorias.ListarporID)
app.put('/subcategorias/:id', rotasSubcategorias.atualizartodosCampos)
app.patch('/subcategorias/:id', rotasSubcategorias.Atualizar)



// //Rotas local Transacao
//app.post('/transacao', rotasTransacoes.novaTransacao)
//app.get('/transacao/filtroData', rotaslocalTransacoes.listar)
// app.get('/transacao', rotaslocalTransacoes.listar)
// app.get('/localtransacao/:id_local_transacao', rotaslocalTransacoes.listarPorID)
// app.patch('/localtransacao/:id_local_transacao', rotaslocalTransacoes.atualizar)
// app.put('/localtransacao/:id_local_transacao', rotaslocalTransacoes.atualizarTodos)
// app.delete('/localtransacao/:id_local_transacao', rotaslocalTransacoes.deletar)

// //Rotas Transacoes
app.post('/transacoes', rotasTransacoes.novaTransacao)
app.get('/transacoes/somarTransacao', rotasTransacoes.somarTransacao)
app.get('/transacao/filtroData', rotasTransacoes.filtrarPordata)
app.get('/transacoes/vencidas/:id_usuario', rotasTransacoes.transacoesVencidas)
// app.get('/transacoes', rotasTransacoes.listar)
// app.get('/transacoes/:id_transacao', rotasTransacoes.listarPorID)
// app.patch('/transacoes/:id_transacao', rotasTransacoes.atualizar)
// app.put('/transacoes/:id_transacao', rotasTransacoes.atualizarTodos)
// app.delete('/transacoes/:id_transacao', rotasTransacoes.deletar)

// Rotas Contas
app.post('/contas', RotasContas.novaConta)
app.get('/contas/filtrarContas', RotasContas.filtrarContas)
app.get('/contas', RotasContas.ListarContas)
app.get('/contas/:id_conta', RotasContas.BuscarId)
app.patch('/contas/:id_conta', RotasContas.AtualizarContas)
app.put('/contas/:id_conta', RotasContas.atualizarTodosCampos)
app.delete('/contas/:id_conta', RotasContas.deletar)


const porta = 3000;
app.listen(porta, () => {
    console.log(`Api http://localhost:${porta}`)
})