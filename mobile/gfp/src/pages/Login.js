import {View, Text, Button} from 'react-native';

export default function Login({navigation}) {
    return (
        <View>
            <Text> Login</Text>
            <Button title="Entrar" onPress={() => navigation.navigate("MenuDrawer")}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#6dd5fa',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    });
  