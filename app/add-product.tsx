import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import Toast from "react-native-toast-message";
import Navbar from "../components/Navbar";
import { theme } from "../constants/theme";
import { wp, hp } from "../helpers/comman";
import { useNavigation } from "@react-navigation/native";


const AddProduct = () => {
  const [category, setCategory] = useState("product");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
    
  const confirmAddProduct = () => { 
    if (!category || !name || !price || !image) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields",
      });
      return;
    }
    Alert.alert("Confirm", `Are you sure you want to add this product with name ${name} and price ${price} in category ${category}?`, [
      {text: "Cancel", style: "cancel"},
      {text: "Add", onPress: handleAddProduct}
    ])
  }

  const handleAddProduct = async () => {
    setLoading(true);
    try {
      const products = await AsyncStorage.getItem('product') ? JSON.parse(await AsyncStorage.getItem('product') || '[]') : [];
      const similarProduct = products.find((product: any) => product.name.toLowerCase() === name.toLowerCase());
      if (similarProduct) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "A similar product already exists",
        });
        setLoading(false);
        return;
      }
      const generateUniqueId = () => {
        let newId = 1;
        while (products.some((product: any) => product.id === newId)) {
          newId++;
        }
        return newId;
      };
      const newId = generateUniqueId();
      const newProduct = {
        id: newId,
        category,
        name,
        price,
        image,
      };
      products.splice(0, 0, newProduct); 
      await AsyncStorage.setItem('product', JSON.stringify(products));
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Product added successfully",
      });
      navigation.navigate("home" as never);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to add product",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to pick image",
      });
    }
  };

  return (
      <ScreenWrapper>
          <Navbar />
      <View style={styles.container}>
        <Text style={styles.title}>Add Product</Text>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={category}
            style={{height: 50, width: wp(75)}}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="Product" value="product" />
            <Picker.Item label="Accessories" value="asseceries" />
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { fontWeight: "bold" }]}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { fontWeight: "bold" }]}
            placeholder="Price in USD"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={handleImagePick} style={styles.imagePickerButton}>
            <Text style={[styles.imagePickerButtonText, {color: '#007BFF'}]}>Pick an Image</Text>
          </TouchableOpacity>
        </View>
        {image ? <Image source={{ uri: image }} style={styles.imagePreview} /> : null}
        <TouchableOpacity
          style={styles.addButton}
          disabled={loading}
          onPress={()=>confirmAddProduct()}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.addButtonText}>Add Product</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    minHeight: hp(90),
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingLeft: 10,
    width: "100%",
  },
  input: {
    display: "flex",
    flexDirection: "row",
    width: wp(75),
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "gray",
    borderBottomWidth: 1,
    borderRadius: 5,
    height: 40,
  },
  addButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  imagePickerButton: {
    borderColor: "#007BFF",
    borderWidth: 2,
    marginTop: 10,
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: wp(75),
  },
  imagePickerButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
});

export default AddProduct;
