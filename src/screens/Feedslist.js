import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Image, Text} from 'react-native';
import {api_url} from '../common/Apis';
import axios from 'axios';
import Feeditem from './Feeditem';
import {Appbar} from 'react-native-paper';
import {BallIndicator} from 'react-native-indicators';

const Feedslist = () => {
	const [feedData, setFeedData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		await axios
			.get(api_url)
			.then(async response => {
				console.log(response.data);
				await setFeedData(response.data);
				setLoading(false);
			})
			.catch(err => console.error(err));
	};

	return (
		<View style={{flex: 1}}>
			<Appbar.Header>
				<Image style={styles.logo} source={require('../assets/logo.png')} />
				{Platform.OS === 'android' && <Appbar.Content title="Instaquinn" />}

				{Platform.OS === 'ios' && (
					<View style={{flexDirection: 'row'}}>
						<Text style={styles.title}>Instaquinn</Text>
					</View>
				)}
			</Appbar.Header>

			{isLoading ? (
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<BallIndicator color="#25527A" />
				</View>
			) : (
				<FlatList
					keyExtractor={item => item.id}
					data={feedData}
					renderItem={({item}) => <Feeditem item={item} />}
				/>
			)}
		</View>
	);
};

export default Feedslist;

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
