import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
	return (
		<NavigationContainer>
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text style={{fontWeight: 'bold', fontSize: 20}}>Insta Clone App</Text>
			</View>
		</NavigationContainer>
	);
};

export default App;
