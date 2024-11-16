import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, TextInput, FlatList, Text, Alert, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { hp } from '../helpers/comman';

const Navbar = () => {
    const navigation = useNavigation();
    const [searchItems, setSearchItems] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await AsyncStorage.getItem('product');
                const parsedProducts = JSON.parse(products || '[]');
                setFilteredProducts(parsedProducts);
                setProducts(parsedProducts);
            } catch (error) {
                console.error('Failed to load products from storage', error);
            }
        };
        fetchProducts();
    }, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query) {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        } 
    };
    
    const confirmAppClose = () => {
        Alert.alert('Confirm', 'Are you sure you want to close the app?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Close', onPress: () => BackHandler.exitApp() }
        ]);
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.navbar}>
                <TouchableOpacity style={styles.iconButton} onPress={() => {
                    if (searchItems) {
                        setSearchItems(false);
                    } else if (navigation.canGoBack()) {
                        navigation.goBack();
                    } else {
                        confirmAppClose();
                    }
                }}>
                    <Image
                        source={require('../assets/images/back-icon.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                {searchItems && <TextInput
                    style={styles.searchInput}
                    placeholder="Search products..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                />}
                <TouchableOpacity style={styles.searchButton} onPress={() => setSearchItems(!searchItems)}>
                    <Image
                        source={!searchItems ? require('../assets/images/search-icon.png') : require('../assets/images/close-icon.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                style={{ position: 'absolute', top: 65, left: 0, right: 0, backgroundColor: 'white', zIndex: 1000, minHeight: searchItems ? hp(100) : 0 }}
                data={searchItems ? filteredProducts : []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productItem}>
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <Text>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        alignItems: 'center',
    },
    iconButton: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
    },
    searchButton: {
        borderWidth: 1,
        borderColor: '#ededda',
        borderRadius: 10,
        padding: 10,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10,
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: 'black',
        opacity: 1,
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    productImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        resizeMode: 'cover'
    },
});

export default Navbar;
