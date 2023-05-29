/* eslint-disable prettier/prettier */
import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { theme } from "./src/core/theme";
import {
  startScreen,
  ContactUsScreen,
  RegisterScreen,
} from "./src/screens";

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="startScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="startScreen" component={startScreen} />
          <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          
        </Stack.Navigator>
      </NavigationContainer>
  );
}