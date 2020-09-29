import React from 'react';
import {Appbar} from 'react-native-paper';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';

const Header = () => {
	return (
		<Appbar.Header>
			<Image style={styles.logo} source={require('../assets/logo.png')} />
			{Platform.OS === 'android' && <Appbar.Content title="Instaquinn" />}

			{Platform.OS === 'ios' && (
				<View style={{flexDirection: 'row'}}>
					<Text style={styles.title}>Instaquinn</Text>
				</View>
			)}
		</Appbar.Header>
	);
};

export default Header;

const styles = StyleSheet.create({
	logo: {
		width: Platform.OS === 'android' ? '13%' : '13%',
		height: Platform.OS === 'android' ? '85%' : '100%'
	},
	title: {
		fontWeight: '600',
		color: 'white',
		fontSize: Platform.OS === 'android' ? 22 : 20,
		marginLeft: 10
	}
});
