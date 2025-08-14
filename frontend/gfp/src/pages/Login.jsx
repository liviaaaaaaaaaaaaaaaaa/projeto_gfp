import { UsuarioContext } from "../UsuarioContext";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { enderecoServidor } from "../utils";

export default function Login() {

  const {dadosUsuario, setDadosUsuario} = useContext(UsuarioContext);
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("principal");
  };
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [Lembrar, setLembrar] = useState(false);

  async function botaoEntrar(e) {
    e.preventDefault();

    try {
      if (email == "" || senha == "") {
        throw new Error("Preencha todos os campos!");
      }
      // Autenticando utilizando a API de backend com o fetch
      const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
        method: "POST",
        headers: {"content-type": "application/json", "athorization": "Bearer " + localStorage.getItem('token')},
        body: JSON.stringify({
            email: email,
            senha: senha
        })
      });

      if(resposta.ok){
        const dados = await resposta.json()
        setMensagem('Login bem-sucedido! ✅')
        // Ou navegar para outra página
        handleSubmit()
        localStorage.setItem('UsuarioLogado', JSON.stringify({...dados, Lembrar}))
      } else {
        setMensagem('Email ou senha incorretos ❌')
        throw new Error('Email ou senha incorretos ❌')
      }

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert(error.message);
      return;
    }
  }

useEffect(() => {
         const buscarUsuarioLogado = async () => {
             const usuarioLogado = await localStorage.getItem('UsuarioLogado');
             if(usuarioLogado){
                const usuario = JSON.parse(usuarioLogado);
                if(usuario.lembrar == true){
                  setDadosUsuario(usuario);
                    navigate('/Principal')
                }
             }
         }
         buscarUsuarioLogado();
    }, [])

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.formBox}>
          <h1 style={styles.title}>
            Gerenciamento
            <br />
            Financeiro Pessoal
          </h1>
          <form onSubmit={botaoEntrar}>
            <label htmlFor="username" style={styles.label}>
              Email 📧
            </label>
            <input id="username" type="text" style={styles.input}
              placeholder="Digite seu Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
            <label htmlFor="password" style={styles.label}>
              Senhaa
            </label>
            <input id="password" type="password" style={styles.input}
             placeholder="Digite sua senha"
             value={senha}
             onChange={(e) => setSenha(e.target.value)}
            />

            <div className={styles.between}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <input type="checkbox" style={{marginRight: '5px'}} 
                checked={Lembrar} onChange={(e) => setLembrar(e.target.checked)}/>
              <label>Lembrar-me</label>
              </div>
              <a href="#" className={styles.forgotPassword}>Esqueceu a senha?</a>
            </div>

            <button type="submit" style={styles.button}>
              Entrar
            </button>
          </form>
        </div>
        <div style={styles.imageBox}>
          <img
            src="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-afb4-61f7-abc6-d68bb0e6fb48/raw?se=2025-04-24T19%3A48%3A04Z&sp=r&sv=2024-08-04&sr=b&scid=0673d5fb-68e5-549c-96f1-48a017dfa6e4&skoid=0abefe37-d2bd-4fcb-bc88-32bccbef6f7d&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-24T03%3A38%3A47Z&ske=2025-04-25T03%3A38%3A47Z&sks=b&skv=2024-08-04&sig=dFMtyANXLPD5ISGdm4L34kkr0%2BLRzCEpXUUn1U2IUys%3D"
            alt="Ilustração de login"
            style={styles.image}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#dfe7fd",
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: {
    display: "flex",
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 10px 40px rgba(46, 212, 68, 0.1)",
    maxWidth: "960px",
    width: "100%",
  },
  formBox: {
    padding: "3rem",
    background: "#edf2f7",
    flex: 1,
  },
  imageBox: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to bottom right, #FF69B4, #C71585)",
  },
  image: {
    maxWidth: "90%",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "2rem",
    color: "#2a2a2a",
  },
  label: {
    display: "block",
    fontWeight: "600",
    margin: "1rem 0 0.25rem",
    color: "#3c3c3c",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "none",
    borderBottom: "2px solid #A020F0",
    background: "transparent",
    fontSize: "1rem",
    marginBottom: "1rem",
    outline: "none",
  },
  inputFocus: {
    borderBottom: "2px solidrgb(173, 13, 53)",
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "0.5rem",
    marginBottom: "1.5rem",
    fontSize: "0.9rem",
  },
  link: {
    textDecoration: "none",
    color: "#6a0dad",
  },
  checkbox: {
    marginRight: "0.5rem",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    background: "linear-gradient(90deg, #696969, #696969)",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
  },
};
