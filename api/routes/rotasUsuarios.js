import { BD } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET_KEY = "chave_api_gfp";
class rotasUsuarios {

  static async novoUsuario(req, res) {
    const { nome, email, senha, tipo_acesso, ativo } = req.body;

    const saltRounds = 10;

    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

    try {
      // const usuario  = await BD.query(`
      // insert into usuarios (nome, email, senha, tipo_acesso) values ($1, $2, $3, $4, $5)`,
      //  [nome, email, senhaCri+ptografada,tipo_acesso]);

      const query = `insert into usuarios (nome, email, senha, tipo_acesso) values ($1, $2, $3, $4)`

      const valores = [nome, email, senhaCriptografada, tipo_acesso]
      const resposta = await BD.query(query, valores)


      res.status(201).json('usuario cadastrado')
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }

  }

  static async listarUsuarios(req, res) {
    try {
      const resposta = await BD.query("select * from usuarios where ativo = true");
      res.status(200).json(resposta.rows);
    } catch (error) {
      console.log('erro ao listar usuarios ', error);
      res.status(500).json({ message: "Erro ao listar usuários", error: error.message });
    }
  }
  static async editarUsuarios(req, res) {
    const { nome, email, senha, tipo_acesso, id } = req.body;

    const saltRounds = 10;

    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
    try {
      const resposta = await BD.query("update usuarios set nome = $1, email = $2, senha = $3, tipo_acesso= $4 where id_usuario = $5", [nome, email, senhaCriptografada, tipo_acesso, id]);
      res.status(200).json("usuario editado com sucesso");
    } catch (error) {
      console.log('erro ao editar usuario ', error);
      res.status(500).json({ message: "Erro ao listar usuários", error: error.message });
    }
  }

  //rota de atualização(Atualizar campo q for passado)
  static async atualizar(req, res) {
    const { id } = req.params;
    const { nome, email, senha, tipo_acesso } = req.body;
    try {
      const campos = [];
      const valores = [];

      if (nome !== undefined) {
        campos.push(`nome = $${valores.length + 1}`)
        valores.push(nome)
      }
      if (email !== undefined) {
        campos.push(`email = $${valores.length + 1}`)
        valores.push(email)
      }
      if (senha !== undefined) {
        campos.push(`senha = $${valores.length + 1}`)
        const saltRounds = 10;
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
        valores.push(senhaCriptografada)

      }
      if (tipo_acesso !== undefined) {
        campos.push(`tipo_acesso = $${valores.length + 1}`)
        valores.push(tipo_acesso)
      }

      if (campos.length === 0) {
        return res.status(400).json({ erro: "Nenhum campo fornecido" })
      }

      const query = `UPDATE usuarios 
              SET ${campos.join(', ')}
              WHERE id_usuario = ${id}
              RETURNING *`

      const usuario = await BD.query(query, valores)

      if (usuario.rows.length === 0) {
        return res.status(404).json({ Menssagem: "usuario nao encontrado" })
      }
      return res.status(200).json(usuario.rows[0])

    } catch (error) {
      return res.status(500).json({ error: "erro ao atualizar dados do usuario"})
    }
  }
  static async deletarUsuarios(req, res) {
    const { id } = req.params;
    try {
      const resposta = await BD.query("update usuarios set ativo = false where id_usuario=$1 ", [id]);
      res.status(200).json("usuario deletado com sucesso");
    } catch (error) {
      console.log('erro ao deletar usuario ', error);
      res.status(500).json({ message: "Erro ao listar usuários", error: error.message });
    }
  }
  static async login(req, res) {
    const { email, senha } = req.body;

    try {
      const resultado = await BD.query(
        `SELECT *
                   FROM usuarios
                   WHERE email = $1 and ativo = true`,
        [email]
      );
      if (resultado.rows.length === 0) {
        return res.status(401).json({ message: "Email ou senha inválidos" });
      }
      const usuario = resultado.rows[0];
      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        return res.status(401).json("senha inválidos");
      }

      
      //gerar um novo token para o usuario
      const token = jwt.sign(
        {
          id_usuario: usuario.id_usuario,
          nome: usuario.nome,
          email: usuario.email,
        },
        SECRET_KEY,
        //{ expiresIn: "1h" }
      );

      return res.status(200).json({
        token,
        id_usuario: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        tipo_acesso: usuario.tipo_acesso
      });
      // return res.status(200).json({ message: "Login realizado com sucesso" });
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      res.status(500).json({ message: "Erro ao realizar login"});
    }
  }


static async deletar(req, res) {
  const { id } = req.body;
  try {
    const resposta = await BD.query("UPDATE usuarios SET ativo = false WHERE id_usuario = $1", [id]);
    res.status(200).json("usuario deletado com sucesso");
  } catch (error) {
    res.status(500).json({ message: "Erro ao desativar usuário", error: error.message });
  }
}

static async filtrarUsuarios(req, res){
                const {nome} = req.query;
                try{
                    const query = `SELECT * FROM usuarios
                    WHERE nome like $1 and ativo = true order by nome desc`;
                    const valores = [`%${nome}%`];

                    const resposta = await BD.query(query, valores);
                    return res.status(200).json(resposta.rows);
                }catch(error){
                    console.error('erro ao filtrar usuarios', error);
                    return res.status(500).json({message: 'Erro ao filtrar usuarios', error: error.massage})
                }
                }
}
// middleware(função) para proteger rotas privadas
export function autenticarToken(req, res, next) {
  // Extrair do token o cabeçalho da requisição
  // const token = req.headers.authorization?.replace('Bearer ', '')
  const token = req.headers['authorization']

  // Verificar se o token foi fornecido
  if (!token) return res.status(401).json({ error: "Token não fornecido" })

  // Verificar a validade do token
  // jwt.verify que verifica se o token é legitimo
  jwt.verify(token.split(' ')[1], SECRET_KEY, (error, usuario) => {
    if (error) return res.status(error).json({ error: "Token Invalido" })

    // Se o token for válido, adiciona os dados do usuario(decodificados no token)
    // Tornando essas informações disponiveis nas rotas que precisam de autenticação
    req.usuario = usuario
    next()
  })

   
}
export default rotasUsuarios;