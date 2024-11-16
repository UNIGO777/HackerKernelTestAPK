import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { products } from '../constants/products';
import Home from './home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentication from './authentication';

const Stack = createNativeStackNavigator();

const Index = () => {
    const navigation = useNavigation();
    const [token, setToken] = useState('');
    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            const currentRoute = navigation?.getState()?.routes[navigation?.getState()?.index]?.name;
            setToken(token || '');
            

            
        };

        checkToken();
    },[]);

    return (
       <NavigationContainer>
            <Stack.Navigator>
            {token ? <Stack.Screen name='home' component={Home} /> : <Stack.Screen name='authentication' component={Authentication} />}
        </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({})

export default Index;
