import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { wp, hp } from "../helpers/comman";
import { useNavigation } from "@react-navigation/native";

const ListShowcase = ({
  products,
  type,
  deleteProduct,
}: {
  products: any;
  type: string;
  deleteProduct: (id: number) => void;
  }) => {
  const navigation = useNavigation()
  const deleteConfirmation = (item: any) => {
    Alert.alert(
      "Delete Confirmation",
      `Are you sure you want to delete this ${item.name} with price ${item.price}?`,
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
    );
  };

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

  return (
    <>
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          {type} <Text style={styles.productCount}>{products?.length}</Text>
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('view-category-all-products' as never, {category: type} as never)}>
            <Text style={styles.showAll}>Show all</Text>
          </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        style={{ paddingBottom: 10 }}
      />
      {products.length === 0 && (
        <Text style={styles.noProducts}>No products found</Text>
      )}
      </View>
      
    
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  
  noProducts: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  productInfo: {
    alignItems: "flex-start",
    width: "100%",
  },
  showAll: {
    color: "#0B57D0",
    fontWeight: "bold",
  },
  productCount: {
    color: "gray",
    marginLeft: 10,
    fontSize: 20,
  },
  productContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    alignItems: "center",
    width: wp(43),
  },
  productImage: {
    width: "100%",
    height: hp(20),
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
  productName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  productPrice: {
    color: "gray",
  },
});

export default ListShowcase;
