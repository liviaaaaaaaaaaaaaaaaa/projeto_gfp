import { BD } from "../db.js";

class rotaslocalTransacoes{
    static async listar(req, res) {
        try {
            const resposta = await BD.query("select * from local_transacao");
            res.status(200).json(resposta.rows);
        } catch (error) {
            console.log('erro ao listar local transacao ', error);
            res.status(500).json({ message: "Erro ao listar local transacao",error:error.message });
        }
    }
}