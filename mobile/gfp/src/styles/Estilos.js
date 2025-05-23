export const corPrincipal = '#A020F0';
export const corSecundaria = '#2980b9';
export const corTextos = '#f2f2f2';
export const corTextos2 = '#999';
export const corPreto = '#222';
export const corFundo = '#8B008B';
export const corFundo2 = '#262626';
export const corBorda = '#262626';


const Estilos = {
    conteudo : {
        flex : 1,
        width : '100%',
        backgroundColor: corFundo
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    input: {
        backgroundColor: '#f4f6f',
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 45,
        fontSize: 16,
        color: corPreto,
        borderWidth: 1,
        borderColor: corBorda,
    },
    inputActive: {
        borderColor: corPrincipal,
        backgroundColor: 'rgba(52, 152, 219, 0.05)',
    },
    inputIcon: {
        position: 'absolute',
        left: 15,
        top: 15,
        zIndex: 1,
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 15,
        zIndex: 1,
    },
    botao: {
        width: '100%',
        height: 55,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 24,
    },
    degradeBotao: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botaoTexto: {
        color: corTextos,
        fontSize: 16,
        fontWeight: 'bold',
    },

    conteudoHeader:{
        flex: 1,
        backgroundColor: '#DA70D6',
       },

       conteudoCorpo: {
        flex: 1,
        backgroundColor: '#F0FFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20
         },

         imagemLista:{
            width: 50,
            height: 50,
            marginRight: 10,
         },
         itemLista:{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#FF69B4',
            paddingVertical: 7,
         },
         textContainer: {
            flex: 1,
         },
         nomeLista:{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#8A2BE2',
         },
        inputCad:{
            marginTop: 5,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: '#FF69B4',
            borderRadius: 5,
            padding: 10,
            backgroundColor: '#F0FFFF',
         },
}

export default Estilos;