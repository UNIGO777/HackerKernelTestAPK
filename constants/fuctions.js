import AsyncStorage from '@react-native-async-storage/async-storage';

export const deleteProduct = (id, products, setProducts) => {
    console.log(id);
    const newProductsArr = products.filter((item) => item.id !== id);
    setProducts(newProductsArr);
    AsyncStorage.setItem('product', JSON.stringify(newProductsArr));
    // Reload the app by navigating to the home screen
    
    
}