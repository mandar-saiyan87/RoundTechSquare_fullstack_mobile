import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text } from 'react-native'

function LoginScreen() {
    return (
        <SafeAreaView className='flex-1 bg-transparent'>
            <View>
                <Text>LoginScreen</Text>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen