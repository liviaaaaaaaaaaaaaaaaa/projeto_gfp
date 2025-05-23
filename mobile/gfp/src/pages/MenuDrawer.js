import { createDrawerNavigator } from "@react-navigation/drawer";
import Principal from "./Principal";
import Contas from "./Contas";
import Categorias from "./Categorias";

const Drawer = createDrawerNavigator();

export default function MenuDrawer() {
    return (
        <Drawer.Navigator
        //estilizando as barras de navegação do drawer
        screenOptions={{
            headerStyle:{
                backgroundColor: '#8B008B',
                elevation: 0,
            },
            headerTintColor: '#f2f2f2'
        }}
        >
            <Drawer.Screen name="Principal" component={Principal}/>
             <Drawer.Screen name="Contas" component={Contas}/>
             <Drawer.Screen name="Categorias" component={Categorias}/>
        </Drawer.Navigator>
    );
}

