import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';

// Screens
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SettingsScreen from './screens/SettingsScreen.js';
import MailScreen from './screens/MailScreen';

//Screen names
const homeName = "Home";
const detailsName = "Pills";
const settingsName = "Settings";
const mailName = "Mail";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'today' : 'today-outline';
            } else if (rn === detailsName) {
              iconName = focused ? 'pills' : 'pills';
            } else if (rn === settingsName) {
              iconName = focused ? 'database' : 'database';
            } else if (rn === mailName) {
              iconName = focused ? 'mail-sharp' : 'mail-outline'
            }
            
            if (iconName === 'database') {
              return <Feather name={iconName} size={size} color={color} />;
            } else if (iconName === "pills") { 
              return <Fontisto name={iconName} size={size} color={color} />; 
              
            }
            else {
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          },
        })}
      >

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={detailsName} component={DetailsScreen} />
        <Tab.Screen name={settingsName} component={SettingsScreen} />
        <Tab.Screen name={mailName} component={MailScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
