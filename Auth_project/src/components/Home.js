import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import FontSize from '../../constants/FontSize';
import Colors from '../../constants/Colors';
import Spacing from '../../constants/Spacing';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height } = Dimensions.get("window")

const Home = ({ navigation }) => {
    const detectLogin = async () => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            navigation.replace("ApiList")
        }

    }
    useEffect(() => {
        detectLogin()
    }, [])
    return (
        <SafeAreaView>
            <View>
                <ImageBackground
                    style={{
                        height: height / 2.5,
                    }}
                    source={require("../../assets/welcome-image.png")}
                    resizeMode='contain'
                />
            </View>
            <View>
                <Text
                    style={{
                        fontSize: FontSize.xxLarge,
                        color: Colors.primary,
                        textAlign: "center",
                        fontWeight: "bold"
                    }}>
                    Discover Your role
                </Text>
            </View>
            <View>
                <Text
                    style={{
                        fontSize: FontSize.medium,
                        color: Colors.text,
                        textAlign: "center",
                        marginTop: Spacing * 2,
                        paddingHorizontal: Spacing * 3,
                    }}>
                    Explore all the existing roles or update in our Application
                </Text>
            </View>
            <View
                style={{
                    paddingHorizontal: Spacing * 2,
                    paddingVertical: Spacing * 5,
                    flexDirection: "row"
                }}
            >
                <TouchableOpacity style={{
                    backgroundColor: Colors.primary,
                    paddingHorizontal: Spacing * 1.5,
                    paddingVertical: Spacing * 1.5,
                    width: "50%",
                    borderRadius: Spacing,

                }}>
                    <Text
                        onPress={() => navigation.replace('Login')}
                        style={{
                            color: Colors.onPrimary,
                            fontSize: FontSize.large,
                            textAlign: "center"
                        }}
                    >Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    paddingHorizontal: Spacing * 1.5,
                    paddingVertical: Spacing * 1.5,
                    width: "50%",
                    borderRadius: Spacing,

                }}>
                    <Text
                        onPress={() => navigation.replace('Signup')}
                        style={{
                            color: Colors.text,
                            fontSize: FontSize.large,
                            textAlign: "center"
                        }}
                    >Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Home