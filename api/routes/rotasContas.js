import { BD } from "../db.js";

class RotasContas {
    static async novaConta(req, res) {
        const { nome, saldo, conta_padrao, tipo_conta} = req.body;

        try {
            const Contas = await BD.query(`INSERT INTO contas (nome, saldo, ativo, conta_padrao, tipo_conta) VALUES ($1, $2, true, $3, $4) RETURNING *`,
            [nome, saldo, conta_padrao, tipo_conta]);
            return res.status(201).json(Contas[0]);
        } catch (error) {
            console.error("Erro ao criar contatransalção", error);
            return res.status(500).json({ error: "Erro ao criar LocalTransacao", message: error.message });
            

    }
}  
    static async ListarContas(req, res) {
        try {
            const Contas = await BD.query(`SELECT * FROM contas`);
            return res.status(200).json(Contas.rows); // Retorna lista de LocalTransacao
        } catch (error) {
        console.error("Erro ao listar contas");
            return res.status(500).json({ error: "Erro ao listar contas", message: error.message });
        }
    }
    static async BuscarId(req, res) {
        const { id } = req.params;
        try {
            const Contas = await BD.query(`SELECT * FROM contas  WHERE id_contas = $1`, [id]);
            // Verifica se a LocalTransacao foi encontrada
            if (Contas.rows.length === 0) {
                return res.status(404).json({ message: "contas não encontrada" });
            }
            return res.status(200).json(Contas.rows[0]); // Retorna a LocalTransacao encontrada
            } catch (error) {
                return res.status(500).json({ error: "Erro ao listar contas", message: error.message });
            }
            }
        static async AtualizarContas(req, res) {
            const { id } = req.params;
        const { nome, saldo, ativo, conta_padrao, tipo_conta} = req.body;
        try {
            // Inicializar arrays(vetores) para armazenar os campos e valores a serem atualizados
            const campos = []
            const valores = []
            // Verifica quais campos foram fornecidos
            if(nome !== undefined){
                campos.push(`nome = $${valores.length + 1}`)
                valores.push(nome)
            }
            if(saldo!== undefined){
                campos.push(`saldo = $${valores.length + 1}`)
                valores.push(saldo)
            }
            if(ativo!== undefined){
                campos.push(`ativo = $${valores.length + 1}`)
                valores.push(ativo)
            }
            if(conta_padrao!== undefined){
                campos.push(`conta_padrao = $${valores.length + 1}`)
                valores.push(conta_padrao)
            }
            if(tipo_conta!== undefined){
                campos.push(`tipo_conta = $${valores.length + 1}`)
                valores.push(tipo_conta)
            }
            if (campos.length === 0){
                return res.status(400).json({erro: "Informe os campos a serem atualizados"})
            }
           
            // Montar a query
            const query = `UPDATE contas SET ${campos.join(',')}
            WHERE id_conta = ${id} returning *`
           
            // Executar a query
            const conta = await BD.query(query, valores)
   
            // Verifica se a conta foi atualizada
            if(conta.rows.length === 0){
                return res.status(404).json({erro: "conta não encontrada"})
            }
            return res.status(200).json(conta.rows[0])
        } catch(error){
            return res.status(500).json({error: "Erro ao atualizar dados da conta", error: error.message});
        }
    }
    static async atualizarTodosCampos(req, res) {
        const { id } = req.params;
        const { nome, saldo, ativo, conta_padrao, tipo_conta } = req.body;
        try {
            const conta = await BD.query(`UPDATE contas SET nome = $1, saldo = $2, ativo = $3, conta_padrao = $4, tipo_conta = $5 WHERE id_conta = $6 RETURNING *`,
            [nome, saldo, ativo, conta_padrao, tipo_conta, id]);
            return res.status(200).json(conta.rows[0]);
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar LocalTransacao", message: error.message });
        }
    }
    static async deletar(req, res) {
        const { id } = req.params;
        try {
            const conta = await BD.query(`update contas set ativo = false WHERE id_conta = $1 RETURNING *`, [id]);
            // Verifica se a conta foi encontrada
            if (conta.rows.length === 0) {
                return res.status(404).json({ message: "conta não encontrada" });
            }
            return res.status(200).json(conta.rows[0]); // Retorna a conta deletada
            } catch (error) {
                return res.status(500).json({ error: "Erro ao deletar conta", message: error.message });
            }
            }   
            static async filtrarContas(req, res){
                const {nome} = req.params;
                try{
                    const query = `SELECT * FROM contas
                    WHERE nome like $1 and ativo = true order by nome desc`;
                    const valores = [`%${nome}%`];

                    const resposta = await BD.query(query, valores);
                    return res.status(200).json(resposta.rows);
                }catch(error){
                    console.error('erro ao filtrar categorias', error);
                    return res.status(500).json({message: 'Erro ao filtrar catgegorias', error: error.massage})
                }
                }
            }



export default RotasContas;

