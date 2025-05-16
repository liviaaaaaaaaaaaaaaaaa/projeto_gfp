import { BD } from "../db.js";

class rotasTransacoes{
    static async listar(req, res) {
        try {
            const resposta = await BD.query("select * from transacoes");
            res.status(200).json(resposta.rows);
        } catch (error) {
            console.log('erro ao listar transacoes ', error);
            res.status(500).json({ message: "Erro ao listar transacoes",error:error.message });
        }
    }
    static async listarPorID(req, res) {
        const { id } = req.params;
        try {
            const resposta = await BD.query("select * from transacoes where id_transacao = $1", [id]);
            res.status(200).json(resposta.rows);
        } catch (error) {
            console.log('erro ao listar transacoes ', error);
            res.status(500).json({ message: "Erro ao listar transacoes",error:error.message });
        }
    }
   static async novaTransacao(req, res) {
        const { valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual } = req.body;
        // Validando dados
        if (!valor || !descricao || !data_vencimento || !data_pagamento || !tipo_transacao || !id_conta || !id_categoria || !id_subcategoria || !id_usuario || !num_parcelas || !parcela_atual) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
        }

        try {
            const tipoTransacao = tipo_transacao.toUpperCase();
            const transacao = await BD.query(`
                INSERT INTO transacoes (valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
                [valor, descricao, data_vencimento, data_pagamento, tipoTransacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual]
            );

            res.status(201).json("Transação Cadastrada");
        } catch (error) {
            console.error("Erro ao criar transação:", error);
            res.status(500).json({ message: "Erro ao criar transação", error: error.message });
        }
    }
    static async deletarTransacoes(req, res) {
        const { id } = req.params;
        try {
            const resposta = await BD.query("delete from transacoes where id_transacao = $1", [id]);
            res.status(200).json("transacao deletada com sucesso");
        } catch (error) {
            console.log('erro ao deletar transacoes ', error);
            res.status(500).json({ message: "Erro ao deletar transacao",error:error.message });
        }
    }
    static async atualizarTransacoes(req, res) {
        const { id } = req.params;
        const { valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_categoria, id_subcategoria, id_conta, id_usuario, num_parcelas, parcela_atual } = req.body;
        try {
            const transacoes = await BD.query(`
                UPDATE transacoes SET valor = $1, descricao = $2, data_vencimento = $3, data_pagamento = $4, tipo_transacao = $5, id_categoria = $6, id_subcategoria = $7, id_conta = $8, id_usuario = $9, num_parcela = $19, parcela_atual = $11 WHERE id_transacao = $12 RETURNING *`
                , [valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_categoria, id_subcategoria, id_conta, id_usuario, data_transacao, num_parcelas, parcela_atual, id])
            return res.status(200).json(transacoesAtualizada)
    } catch(error){
        return res.status(500).json({error: "Erro ao atualizar dados da categoria", error: error.message});
    
    }
}
    static async AtualizarTransacoes(req, res){
        const { id } = req.params;
        const { valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_categoria, id_subcategoria, id_conta, id_usuario, num_parcelas, parcela_atual}= req.body;
        try {
            // Inicializar arrays(vetores) para armazenar os campos e valores a serem atualizados
            const campos = []
            const valores = []
            // Verifica quais campos foram fornecidos
            if(valor !== undefined){
                campos.push(`valor = $${valores.length + 1}`)
                valores.push(valor)
            }
            if(descricao !== undefined){
                campos.push(`descricao = $${valores.length + 1}`)
                valores.push(descricao)
            }
            if(data_vencimento !== undefined){
                campos.push(`data_vencimento = $${valores.length + 1}`)
                valores.push(data_vencimento)
            }
            if(data_pagamento !== undefined){
                campos.push(`data_pagamento = $${valores.length + 1}`)
                valores.push(data_pagamento)
            }
            if(tipo_transacao !== undefined){
                campos.push(`tipo_transacao = $${valores.length + 1}`)
                valores.push(tipo_transacao)
            }
           if(id_categoria !== undefined){
            campos.push(`id_categoria = $${valores.length + 1}`)
            valores.push(id_categoria)
            }
            if(id_subcategoria!== undefined){
                campos.push(`id_subcategoria = $${valores.length + 1}`)
                valores.push(id_subcategoria)
            }
            if(id_conta!== undefined){
                campos.push(`id_conta = $${valores.length + 1}`)
                valores.push(id_conta)
            }
            if(id_usuario !== undefined){
                campos.push(`id_usuario = $${valores.length + 1}`)
                valores.push(id_usuario)
            }
            if (data_transacao !== undefined){
                campos.push(`data_transacao = $${valores.length + 1}`)
                valores.push(data_transacao)
            }
            if (num_parcelas !== undefined){
                campos.push(`num_parcelas = $${valores.length + 1}`)
                valores.push(num_parcelas)
            }
            if (parcela_atual !== undefined){
                campos.push(`parcela_atual = $${valores.length + 1}`)
                valores.push(parcela_atual)
            }
            if(campos.length === 0){
                return res.status(400).json({erro: "Nenhum campo foi fornecido" })
            }
            // Montar a query
             const query = `UPDATE transacoes SET ${campos.join(',')}
        WHERE id_transacao = ${id} returning *`
             // Executar a query
             const transacoesAtualizada = await BD.query(query, valores)

             // Verifica se o usuario foi atualizado
             if (transacoes.rows.length === 0) {
                return res.status(404).json({ message: "Transacoes não encontrada" });
            }
                return res.status(200).json(transacoesAtualizada.rows[0]);

           } catch(error){
            return res.status(500).json({error: "Erro ao atualizar dados da categoria", error: error.message});
           }
        
           
        }

        //Criar uma rota que permite filtrar transacoes por data de vencimento ou data de pagamento
        //dentro de um intervalo especifico
        static async filtrarPordata(req, res){
            const {data_inicio, data_fim, tipo_data} = req.query;
            let colunaData;
            if(tipo_data == 'vencimento'){
                colunaData = 'data_vencimento'
            }
            else if(tipo_data == 'pagamento'){
                colunaData = 'data_pagamento'
        }
        else{
            return res.status(400).json({ 
                message: "Tipo de data inválido, use vencimento ou pagamento"
             })
        }
        try{
            const query = `
            SELECT t. *, u.nome AS nome_usuario, ct.nome
            FROM transacoes AS t
            LEFT JOIN usuario AS u ON t.id_usuario = u.id_usuario
            JOIN contas ct ON t.id_conta = ct.id_conta 
            WHERE ${colunaData} BETWEEN $1 AND $2
            ORDER BY ${colunaData} ASC
            `

            const transacoes = await BD.query(query, [data_inicio, data_fim])

            res.status(200).json(transacoes.rows);
        }catch(error){
            console.error('erro ao filtrar transaçao', error);
            res.status(500).json({message: 'Erro ao filtrar transação', error: error.massage});
        }

        }
   static async somarTransacao(req, res) {
  const { tipo, id_usuario } = req.query;

  try {
    const tipo_transacao = tipo.toUpperCase();

    const query = `
      SELECT SUM(valor) AS total
      FROM transacoes
      WHERE tipo_transacao = $1 AND id_usuario = $2
    `;

    const resultado = await BD.query(query, [tipo_transacao, id_usuario]);

    let total = resultado.rows[0].total;
    if (total === null) {
      total = 0;
    }

    res.status(200).json({ total });
  } catch (error) {
    res.status(500).json({message: "Erro ao somar transações",error: error.message});
  }
}

    static async transacoesVencidas(req, res){
        const {id_usuario} = req.query;
        try{
         const query = `SELECT t.valor, t.data_vencimento, t.data_pagamento, *,
         u.nome AS nome_usuario, 
         ct.nome AS nome_categoria,
         sct.nome AS nome_categoria
         FROM transacoes AS t
         LEFT JOIN usuarios u on t.id_usuario 	= u.id_usuario
         LEFT JOIN  contas c ON t.id_conta = c.id_conta
         LEFT JOIN categorias ct ON t.id_categoria = ct.id_categoria
         LEFT JOIN subcategorias sct ON t.id_subcategoria = sct.id_subcategoria
         WHERE t.data_vencimento < CURRENT_DATE -- filtra transacoes vencidas
         AND t.id_usuario = $1
         ORDER BY t.data_vencimento ASC`

         const resultado = await BD.query(query, [id_usuario])

         //Funçao para formatar  data
         const formatarDataBr = (data) => {
             if (!data) return null;
             return new Date(data).toLocaleDateString('pt-BR') //Converte a data no padrao BR
         }
        
         const dadosFormatados = resultado.rows.map(t => ({
            ...t,  ///copia todas as propriedades originais de resultado para o t
            data_transacao: formatarDataBr(t.data_transacao),
            data_vencimento: formatarDataBr(t.data_vencimento),
            data_pagamento: formatarDataBr(t.data_pagamento),	
         }))
         res.status(200).json(dadosFormatados);

        }catch(error){
            console.error("Erro ao buscar transacoes vencidas", error);
            res.status(500).json({message: "Erro ao buscar transacoes vencidas", error: error.message});
            
        }
    }

}



export default rotasTransacoes;