import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsuarioContext } from '../UsuarioContext';
export default function Principal({navigation}) {
    const { dadosUsuario, setDadosUsuario, carregando } = useContext(UsuarioContext);

    const navigate = useNavigate();
    useEffect( () =>{
        if (!dadosUsuario && !carregando){
            navigate('/login');
        }
    }, [dadosUsuario, carregando, navigate]);
    const botaoLogout =  () => {
       try{
           localStorage.removeItem('UsuarioLogado');
           setDadosUsuario(null);
           navigate('/');
       }catch(error){
        console.error('Erro ao deslogar', error);
       }
    };
    return (
        <div>
          <div style={{display: 'flex', flexDirection: 'row',
            justifyContent: 'space-between', alignItems: 'center'}}>
                <p>Usuário: {dadosUsuario?.nome}</p>
                <button onClick={botaoLogout}>Sair</button>
          </div>
          <div style={{padding: '20px'}}>
             <h2>Principal</h2>
          </div>
        </div>
    )
}