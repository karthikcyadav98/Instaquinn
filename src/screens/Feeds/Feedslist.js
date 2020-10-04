import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {api_url} from '../../common/Apis';
import axios from 'axios';
import Feeditem from './Feeditem';
import {BallIndicator} from 'react-native-indicators';
import Header from '../../common/Header.js';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-tiny-toast';

const Feedslist = () => {
	const [feedData, setFeedData] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [isOnline, setOnline] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		//Data Caching for better user experience
		await AsyncStorage.getItem('feedData').then(data => {
			if (data !== null) {
				setFeedData(JSON.parse(data));
			}
		});

		await axios
			.get(api_url)
			.then(async response => {
				await setFeedData(response.data);

				try {
					await AsyncStorage.setItem('feedData', JSON.stringify(response.data));
				} catch (err) {
					alert('Something went wrong!');
				}

				setLoading(false);
				setOnline(true);
			})
			.catch(err => {
				setLoading(false);
				setOnline(false);
				Toast.show('Cannot refresh feed! Pull Down to Refresh');
			});
	};

	const handleRefresh = async () => {
		setRefreshing(true);
		await getData();
		setRefreshing(false);
	};

	return (
		<View style={{flex: 1}}>
			<Header />
			{isLoading ? (
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<BallIndicator color="#25527A" />
				</View>
			) : (
				<FlatList
					keyExtractor={item => item.id}
					data={feedData}
					renderItem={({item}) => <Feeditem item={item} isOnline={isOnline} />}
					refreshing={refreshing}
					onRefresh={() => {
						handleRefresh();
					}}
				/>
			)}
		</View>
	);
};

export default Feedslist;
