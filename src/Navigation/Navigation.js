import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Bottom Navigation
import BottomNav from './BottomNav';

const Stack = createStackNavigator();

const Navigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="BottomNav"
				options={{
					title: 'BottomNav',
					headerShown: false
				}}
			>
				{props => <BottomNav {...props} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
};

export default Navigation;
