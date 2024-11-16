import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthenticationScreen from './authentication';
import AddProductScreen from './add-product';
import HomeScreen from './home';
import Category from './category';

const Stack = createNativeStackNavigator(); 

const Layout = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            setIsAuthenticated(!!token);
        };
        checkToken();
    }, []);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {!isAuthenticated && (
                <Stack.Screen 
                    name='authentication' 
                    component={AuthenticationScreen} 
                    options={{headerShown: false}} 
                />
            )}
            <Stack.Screen 
                name='home' 
                component={HomeScreen} 
                options={{headerShown: false}} 
            />
            <Stack.Screen 
                name='view-category-all-products' 
                component={Category} 
                options={{headerShown: false}} 
            />
            <Stack.Screen 
                name='add-product' 
                component={AddProductScreen} 
                options={{headerShown: false}} 
            /> 
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})

export default Layout;
