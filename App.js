import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {
    startScreen,
    ContactUsScreen,
    RegisterScreen,
    SearchScreen,
} from "./src/screens";
import PodcastScreen from "./src/screens/podcast";

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
                <Stack.Screen name="startScreen" component={startScreen}/>
                <Stack.Screen name="ContactUsScreen" component={ContactUsScreen}/>
                <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
                <Stack.Screen name="SearchScreen" component={SearchScreen}/>
                <Stack.Screen name="podcast" component={PodcastScreen}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
}