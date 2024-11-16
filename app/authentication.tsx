import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

import { theme } from "../constants/theme";
import { wp, hp } from "../helpers/comman";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
// import { createStackNavigator } from '@react-navigation/stack';
const Authentication = ({login}: {login: () => void}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
    };
    
    useEffect(() => {
      const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          navigation.navigate('home' as never);
        }
      };
      checkToken();
    }, []);

  const handleLogin = () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields",
      });
      return;
    }

    if (!validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Invalid email format",
      });
      return;
    }

    setLoading(true);
    axios
      .post("https://reqres.in/api/login", {
        email: email.toLowerCase(),
        password: password,
      })
      .then((response) => {
      // handle success
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Logged in successfully",
        });
        AsyncStorage.setItem("token", response.data.token);
        navigation.navigate("home" as never);
      }).then(() => {
        // Refresh the app by resetting the navigation state
        navigation.reset({
          index: 0,
          routes: [{ name: 'home' }],
        });
          })
       
      .catch((error) => {
      // handle error
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Login failed",
        });
    }).finally(() => {
          setLoading(false)
      })
  
  };

  const showFeatureNotWorkingToast = () => {
    Toast.show({
      type: "info",
      text1: "Info",
      text2: "This feature is not working currently",
    });
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/login-img.png")}
          style={styles.image}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login</Text>
        </View>
        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/images/email-icon.png")}
            style={[styles.icon, { opacity: 0.5 }]}
          />
          <TextInput
            style={[styles.input, { fontWeight: "bold" }]}
            placeholder="Email ID"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/images/lock-icon.png")}
            style={[styles.icon, { opacity: 0.5 }]}
          />
          <View style={styles.input}>
            <TextInput
              style={{ fontWeight: "bold", width: "90%" }}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Image
                source={
                  isPasswordVisible
                    ? require("../assets/images/eye-off-icon.png")
                    : require("../assets/images/eye-icon.png")
                }
                style={[styles.icon, { opacity: 0.5 }]}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={showFeatureNotWorkingToast}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          disabled={loading}
          onPress={handleLogin}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <View style={styles.orLine}></View>
          <Text style={styles.or}>OR</Text>
          <View style={styles.orLine}></View>
        </View>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={showFeatureNotWorkingToast}
        >
          <Image
            source={require("../assets/images/google-icon.png")}
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Login with Google</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          New to Logistics?{" "}
          <Text
            style={styles.registerLink}
            onPress={showFeatureNotWorkingToast}
          >
            Register
          </Text>
        </Text>
      </View>
      
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: wp(90),
    height: hp(35),
    marginBottom: 20,
  },
  titleContainer: {
    width: "100%",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
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
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  forgotPassword: {
    marginTop: 10,
    textAlign: "right",
    color: "#007BFF",
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,

    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  or: {
    textAlign: "center",
    marginVertical: 20,
    width: "10%",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ededed",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: "black",
  },
  registerText: {
    marginTop: 20,
    textAlign: "center",
  },
  registerLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default Authentication;
