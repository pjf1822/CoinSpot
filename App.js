import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import CoinPage from "./screens/CoinPage";
import Header from "./components/Header";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer style={{ backgroundColor: "yellow" }}>
      <Header />
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="CoinPage"
          component={CoinPage}
          options={{ title: CoinPage.id, headerShown: false }}
        />
      </Stack.Navigator>
      <View style={{ height: 40, width: "100%", backgroundColor: "black" }} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
