import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Sccrenns
import Feedslist from '../screens/Feeds/Feedslist';
import CalendarList from '../screens/Calendar/CalendarList';

const Tab = createMaterialBottomTabNavigator();

const BottomNav = () => {
	return (
		<Tab.Navigator barStyle={{backgroundColor: '#25527A'}} initialRouteName="Feedslist" activeColor="#fff">
			<Tab.Screen
				name="Feedslist"
				options={{
					tabBarColor: '#25527A',
					tabBarLabel: 'Feeds',
					tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />
				}}
			>
				{props => <Feedslist {...props} />}
			</Tab.Screen>

			<Tab.Screen
				name="CalendarList"
				options={{
					tabBarColor: '#25527A',
					tabBarLabel: 'Calendar',
					tabBarIcon: ({color}) => <Icon name="calendar" color={color} size={26} />
				}}
			>
				{props => <CalendarList {...props} />}
			</Tab.Screen>
		</Tab.Navigator>
	);
};

export default BottomNav;
