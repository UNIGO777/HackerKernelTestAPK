import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, FlatList } from 'react-native';
import Navbar from '../components/Navbar';
import ScreenWrapper from '../components/ScreenWrapper';
import { hp, wp } from '../helpers/comman';
import { deleteProduct as deleteProductFunc } from '../constants/fuctions';
import { useNavigation } from '@react-navigation/native';

  




    const Category = ({route}: {route: any}) => {
        const { category } = route.params;
        const [products, setProducts] = useState([]);
        const navigation = useNavigation();

    const deleteConfirmation = (item: any) => {
        Alert.alert('Delete', `Are you sure you want to delete this product with name ${item.name} and price ${item.price} in category ${item.category}?`, 
            [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Delete",
                  onPress: () => deleteProduct(item.id),
                  style: "destructive",
                },
            ]
        )
    }

    const deleteProduct = (id: number) => {
        deleteProductFunc(id, products, setProducts);
        navigation.navigate('home' as never);
    }

    const renderProduct = ({ item }: { item: any }) => (

    
        <View style={styles.productContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteConfirmation(item)}
          >
            <Image
              source={require("../assets/images/delete-icon.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}.00</Text>
          </View>
        </View>
    );

    useEffect(() => {
        const getProducts = async () => {
            const response = await AsyncStorage.getItem('product');
            if (response) {
                setProducts(JSON.parse(response));
            }
        }
        getProducts();
    }, []);
    return (
        <ScreenWrapper>
            <Navbar />
            <View style={{flex: 1, paddingTop: 20, minHeight: hp(90)}}>
            <Text style={{fontSize: 20, fontWeight: 'bold',  marginBottom: 20, textTransform: 'uppercase', padding: 10}}>{category}</Text>
            <FlatList
                    data={products.filter((item: any) => item.category === category)}
                    style={{marginHorizontal: 10}}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderProduct}
                    keyExtractor={(item) => item.id.toString()}
            />
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
        padding: 10,
        marginRight: 10,
        marginBottom: 10,
    alignItems: "center",
    width: wp(46),
  },
  productImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    objectFit: "contain",
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  productInfo: {
    alignItems: "flex-start",
    width: "100%",
  },
  productName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  productPrice: {
    color: "gray",
  },
});

export default Category;
