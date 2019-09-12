import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import Home from './Home'
import Signup from './Signup'
import Signin from './Signin'

const AppNavigator = createStackNavigator({
    Home, bank, requests, viewdonors, donor, post, view,
},
    { initialRouteName: "Home" });

const AuthNavigator = createStackNavigator({
    Signup, Signin
},
    { initialRouteName: "Signup" });

export default createAppContainer(createSwitchNavigator(
    {
        App: AppNavigator,
        Auth: AuthNavigator,
    },
    { initialRouteName: "Auth" }
))
