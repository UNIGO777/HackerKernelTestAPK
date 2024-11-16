import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../components/Navbar';
import ListShowcase from '../components/ListShocase';
import { FlatList } from 'react-native';
import { hp } from '../helpers/comman';
import { products as productsArr } from '../constants/products';
import { deleteProduct as deleteProductFuction } from '../constants/fuctions';

const Home = () => {
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();
    const handleLogout = () => {
        
       AsyncStorage.removeItem('token').then(() => {
        navigation.navigate("authentication" as never);
       })
    }
    useEffect(() => {
        const checkProduct = async () => {
            const product = await AsyncStorage.getItem('product');

            if (!product) {
                AsyncStorage.setItem('product', JSON.stringify(productsArr));
                setProducts(productsArr as never[]);
            }
        }
        checkProduct();
        AsyncStorage.getItem('product').then((res) => {
            setProducts(JSON.parse(res || '[]'));
        })
    }, [])

    const deleteProduct = (id: number) => {
        deleteProductFuction(id, products, setProducts);
    }

    

    const renderListShowcase = ({ item }: { item: any }) => (
        <ListShowcase products={item.products} deleteProduct={deleteProduct} type={item.type} />
    );

    const data = [
        { type: 'product', products: products.filter((item: any) => item.category === 'product') },
        { type: 'asseceries', products: products.filter((item: any) => item.category === 'asseceries') }
    ];

    return (
        <><ScreenWrapper>
            <Navbar />
            <View style={{ minHeight: hp(90) }}>
            <View style={styles.container}>
                <Text style={styles.title}>Hi-Fi Shop & Service</Text>
                <Text style={styles.subtitle}>Audio shop on Rustaveli Ave 57.</Text>
                <Text style={styles.description}>This shop offers both products and services</Text>
            </View>
            <FlatList
                data={data}
                renderItem={renderListShowcase}
                keyExtractor={(item) => item.type}
                style={styles.listContainer}
                />
            </View>
        </ScreenWrapper>
            <TouchableOpacity style={styles.addIconContainer} onPress={() => navigation.navigate('add-product' as never)}>
                <Image source={require('../assets/images/add-icon.png')} style={styles.addIcon} />
            </TouchableOpacity>
            
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'gray',
        marginBottom: 5,
    },
    addIconContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 1000,
        backgroundColor: '#0B57D0',
        padding: 15,
        borderRadius: 50,
    },
    addIcon: {
        width: 30,
        height:30,
    },
    description: {
        fontSize: 13,
        color: 'gray',
        fontWeight: 'bold',
    },
    listContainer: {
        flexDirection: 'column',
    }
})

export default Home;
