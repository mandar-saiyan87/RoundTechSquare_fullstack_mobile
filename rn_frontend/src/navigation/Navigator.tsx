import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    CreateTaskScreen,
    TasksScreen,
    LoginScreen,
    SignupScreen
} from '../screens'

const Stack = createNativeStackNavigator()

export default function Navigator() {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Signup' component={SignupScreen} />
            <Stack.Screen name='Tasks' component={TasksScreen} />
            <Stack.Screen name='CreateTask' component={CreateTaskScreen} />
        </Stack.Navigator>
    )
}