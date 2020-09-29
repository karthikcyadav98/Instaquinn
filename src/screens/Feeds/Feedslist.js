import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {api_url} from '../../common/Apis';
import axios from 'axios';
import Feeditem from './Feeditem';
import {BallIndicator} from 'react-native-indicators';
import Header from '../../common/Header.js';

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
				await setFeedData(response.data);
				setLoading(false);
			})
			.catch(err => console.error(err));
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
					renderItem={({item}) => <Feeditem item={item} />}
				/>
			)}
		</View>
	);
};

export default Feedslist;
