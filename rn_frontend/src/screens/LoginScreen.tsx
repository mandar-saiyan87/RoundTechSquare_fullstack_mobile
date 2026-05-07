import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native'

import { validateEmail } from '../utils/emailvalidator'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Ionicons } from "@expo/vector-icons"

function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const handleLogin = () => {
        if (!email.trim() || !password.trim()) {
            setErrorMessage('All fields are required.');
            return;
        }
        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }
        setErrorMessage('');
    };



    return (
        <SafeAreaView className='flex-1 bg-transparent'>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-1 justify-center px-6 bg-white">

                    {/* Heading */}
                    <Text className='text-center mb-8 font-semibold text-sky-400 text-3xl'>TaskFlow</Text>

                    <Text className="text-3xl font-bold text-center mb-2">
                        Welcome Back
                    </Text>

                    <Text className="text-gray-500 text-center mb-10">
                        Login to continue
                    </Text>

                    {/* Error Message */}
                    {errorMessage ? (
                        <View className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex-row items-center">
                            <Ionicons name="alert-circle" size={20} color="#ef4444" />
                            <Text className="text-red-600 ml-2 font-medium flex-1">
                                {errorMessage}
                            </Text>
                        </View>
                    ) : null}

                    {/* Email Input */}

                    <View className="mb-5">
                        <Text className="text-gray-700 mb-2 font-medium">
                            Email
                        </Text>

                        <TextInput
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                if (errorMessage) {
                                    setErrorMessage('');
                                }
                            }}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            className="border border-gray-300 rounded-xl px-4 py-4 text-base"
                        />
                    </View>

                    {/* Password Input */}

                    <View className="mb-6">
                        <Text className="text-gray-700 mb-2 font-medium">
                            Password
                        </Text>

                        <View className="border border-gray-300 rounded-xl flex-row items-center px-4">

                            <TextInput
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    if (errorMessage) {
                                        setErrorMessage('');
                                    }
                                }}
                                secureTextEntry={!showPassword}
                                className="flex-1 py-4 text-base"
                            />

                            <TouchableOpacity
                                onPress={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                <Ionicons
                                    name={
                                        showPassword
                                            ? "eye-off-outline"
                                            : "eye-outline"
                                    }
                                    size={22}
                                    color="gray"
                                />
                            </TouchableOpacity>

                        </View>
                    </View>

                    {/* Login Button */}

                    <TouchableOpacity className="bg-blue-500 rounded-xl py-4" onPress={handleLogin}>
                        <Text className="text-white text-center text-lg font-semibold">
                            Login
                        </Text>
                    </TouchableOpacity>

                    {/* Signup Text */}

                    <View className="flex-row justify-center mt-6">
                        <Text className="text-gray-500">
                            Don’t have an account?
                        </Text>

                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text className="text-blue-500 font-semibold ml-1">
                                Signup
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAwareScrollView>

        </SafeAreaView>
    )
}

export default LoginScreen