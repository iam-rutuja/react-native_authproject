import React, { useState } from 'react'
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View ,ToastAndroid } from 'react-native'
import axios from 'axios'
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spacing from '../../constants/Spacing'
import FontSize from '../../constants/FontSize'
import Colors from '../../constants/Colors'




const Signup = ({ navigation }) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    })
    const { name, email, password } = values;
    const handleChange = (value, name) => {
        setValues({ ...values, [name]: value })
    }
    const clickSubmit = () => {

        axios({
            method: 'POST',
            url: `http://10.0.2.2:5000/api/signup`,
            data: { name, email, password }
        }).then(async (res) => {
            try {
                await AsyncStorage.setItem('token', res.data.token)
                console.log('SIGNUP SUCCESS', res)
                navigation.replace('Login')
                Alert.alert(res.data.message)

            } catch (error) {
                Alert(error)
            }

            setValues({ ...values, name: '', email: '', password: '' })

        }).catch((error) => {
            setValues({ ...values })
            Alert.alert(error.response.data.error)
           
        })
    }
    return (
        <KeyboardAwareScrollView>
        <Toast/>
            <SafeAreaView>


                <View
                    style={{
                        padding: Spacing * 2,
                    }}
                >

                    <View
                        style={{
                            alignItems: 'center'
                        }}
                    >

                        <Text
                            style={{
                                fontSize: FontSize.xLarge,
                                color: Colors.primary,
                                fontWeight: 'bold',
                                marginVertical: Spacing * 3,
                            }}
                        >
                            Signup page
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                color: Colors.text,
                                textAlign: "center"

                            }}
                        >
                            create an account to explore TODO list
                        </Text>
                    </View>


                    <View
                        style={{
                            marginVertical: Spacing * 3,
                        }}
                    >
                        <TextInput
                            placeholder='Full Name'
                            placeholderTextColor={Colors.darkText}
                            onChangeText={value => handleChange(value, "name")}
                            value={name}
                            style={{
                                fontSize: FontSize.small,
                                padding: Spacing * 1.5,
                                backgroundColor: Colors.lightPrimary,
                                borderRadius: Spacing,
                                marginVertical: Spacing
                            }}
                        />
                        <TextInput
                            placeholder='Email'
                            placeholderTextColor={Colors.darkText}
                            onChangeText={value => handleChange(value, "email")}
                            value={email}
                            style={{
                                fontSize: FontSize.small,
                                padding: Spacing * 1.5,
                                backgroundColor: Colors.lightPrimary,
                                borderRadius: Spacing,
                                marginVertical: Spacing
                            }}
                        />
                        <TextInput
                            placeholder='Password'
                            placeholderTextColor={Colors.darkText}
                            onChangeText={value => handleChange(value, "password")}
                            value={password}
                            secureTextEntry
                            style={{
                                fontSize: FontSize.small,
                                padding: Spacing * 1.5,
                                backgroundColor: Colors.lightPrimary,
                                borderRadius: Spacing,
                                marginVertical: Spacing
                            }}
                        />
                    </View>


                    <TouchableOpacity
                        style={{
                            padding: Spacing * 1.5,
                            backgroundColor: Colors.primary,
                            marginVertical: Spacing * 3,
                            borderRadius: Spacing,
                            shadowColor: Colors.primary,
                        }}
                    >
                        <Text
                            onPress={clickSubmit}
                            style={{
                                fontWeight: '800',
                                textAlign: "center",
                                color: Colors.onPrimary,
                                fontSize: FontSize.large
                            }}>
                            Sign up
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => navigation.replace('Login')}
                        style={{
                            padding: Spacing,
                        }}>
                        <Text
                            style={{
                                color: Colors.text,
                                fontSize: FontSize.small,
                                textAlign: "center"
                            }}
                        >Already have an account</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default Signup