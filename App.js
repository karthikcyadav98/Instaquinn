import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './src/Navigation/Navigation';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const theme = {
	...DefaultTheme,
	roundness: 2,
	colors: {
		...DefaultTheme.colors,
		primary: '#25527A',
		accent: '#2e7d32'
	}
};

const App = () => {
	useEffect(() => {
		SplashScreen.hide();
	}, []);

	return (
		<NavigationContainer>
			<PaperProvider style={{flex: 1}} theme={theme}>
				<Navigation />
			</PaperProvider>
		</NavigationContainer>
	);
};

export default App;
