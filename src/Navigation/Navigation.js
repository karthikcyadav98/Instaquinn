import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Feedslist from '../screens/Feedslist';

const Stack = createStackNavigator();

const Navigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Feedslist"
				options={{
					title: 'Feedslist',
					headerShown: false
				}}
			>
				{props => <Feedslist {...props} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
};

export default Navigation;
