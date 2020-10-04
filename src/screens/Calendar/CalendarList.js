import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, FlatList, Modal, SafeAreaView} from 'react-native';
import Header from '../../common/Header';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {api_url} from '../../common/Apis';
import {BallIndicator} from 'react-native-indicators';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-tiny-toast';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const CalendarList = () => {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const [currDate, setCurrDate] = useState(new Date());
	const [year, setYear] = useState(currDate.getFullYear());
	const [month, setMonth] = useState(currDate.getMonth());
	const [feedData, setFeedData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [modal, setModal] = useState(false);
	const [modalItem, setModalItem] = useState({});
	const [isOnline, setOnline] = useState(true);

	useEffect(() => {
		getData();
	}, []);

	const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	let nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	var startDay = new Date(year, month, 1).getDay();

	var maxDays = nDays[month];

	var Matrix = [];

	if (month === 2) {
		if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
			nDays[month - 1] = nDays[month - 1] + 1;
		}
	}

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
				Toast.show('Cannot refresh feed! Pull Down to Refresh');
				setOnline(false);
			});
	};

	const genCalendar = () => {
		var matrix = [];

		matrix[0] = weekDays;

		var counter = 1;
		for (var row = 1; row < 7; row++) {
			matrix[row] = [];
			for (var col = 0; col < 7; col++) {
				matrix[row][col] = -1;
				if (row == 1 && col >= startDay) {
					matrix[row][col] = counter++;
				} else if (row > 1 && counter <= maxDays) {
					matrix[row][col] = counter++;
				}
			}
		}

		return matrix;
	};

	const CalImage = item => {
		let cdate = item.toString();
		let cmonth = month.toString();
		if (cdate.length === 1) {
			cdate = '0' + cdate;
		}
		if (cmonth.length === 1) {
			cmonth = '0' + cmonth;
		}

		// mm/dd/yyyy
		cdate = cmonth + '/' + cdate + '/' + year;

		let found = '';
		let modalitem = {};

		feedData.map((item, index) => {
			const formatDate = moment(item.CreatedOnTimestamp).format('L');
			if (formatDate === cdate) {
				found = item.Images;
				modalitem = item;
			}
		});

		return (
			<TouchableOpacity
				onPress={() => {
					setModal(true);
					setModalItem(modalitem);
				}}
			>
				<FlatList
					horizontal={true}
					keyExtractor={(item, index) => index.toString()}
					data={found}
					renderItem={({item}) => (
						<Image
							style={{width: SCREEN_WIDTH * 0.135, height: SCREEN_HEIGHT * 0.095}}
							source={
								isOnline ? found !== '' ? (
									{uri: item.ImageUrl}
								) : (
									require('../../assets/noImage.png')
								) : (
									require('../../assets/loading.png')
								)
							}
						/>
					)}
				/>
			</TouchableOpacity>
		);
	};

	const RowData = () => {
		Matrix = genCalendar();

		return Matrix.map((row, rowIndex) => (
			<View key={rowIndex} style={[styles.dateRow, {backgroundColor: rowIndex === 0 ? '#25527A' : 'white'}]}>
				{row.map((item, index) => (
					<View
						style={[
							styles.dateText,
							{
								borderWidth: rowIndex === 0 || item === -1 ? 0 : 0.5,
								height: rowIndex === 0 ? SCREEN_HEIGHT * 0.03 : SCREEN_HEIGHT * 0.13
							}
						]}
						key={index}
					>
						<Text
							style={{
								color: rowIndex !== 0 ? '#25527A' : 'white',
								marginTop: rowIndex !== 0 ? 20 : 0,
								fontWeight: 'bold'
							}}
						>
							{item !== -1 ? item : ''}
						</Text>
						{rowIndex !== 0 && item !== -1 && CalImage(item)}
					</View>
				))}
			</View>
		));
	};

	const changeMonth = value => {
		if (value === 'left') {
			if (month === 0) {
				setYear(year - 1);
				setMonth(11);
			} else {
				setMonth(month - 1);
			}
		}
		if (value === 'right') {
			if (month === 11) {
				setYear(year + 1);
				setMonth(0);
			} else {
				setMonth(month + 1);
			}
		}
	};

	if (loading) {
		return <BallIndicator color="#25527A" />;
	} else {
		return (
			<View style={{flex: 1}}>
				<Header />
				<View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 15}}>
					<TouchableOpacity
						onPress={() => {
							changeMonth('left');
						}}
					>
						<Icon color="#25527A" size={20} name="caretleft" />
					</TouchableOpacity>
					<View style={{justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{fontSize: 18, fontWeight: 'bold', color: '#25527A'}}>
							{months[month]} &nbsp;
							{year}
						</Text>
					</View>
					<TouchableOpacity
						onPress={() => {
							changeMonth('right');
						}}
					>
						<Icon color="#25527A" size={20} name="caretright" />
					</TouchableOpacity>
				</View>
				<View style={styles.rowdata}>
					<RowData />
				</View>

				<Modal
					// style={{backgroundColor: '#000', shadowColor: '#000'}}
					animationType="slide"
					// transparent={true}
					visible={modal}
					onRequestClose={() => {
						setModal(false);
						setModalItem({});
					}}
				>
					<View style={styles.modalHeader}>
						<TouchableOpacity
							onPress={() => {
								setModal(false);
								setModalItem({});
							}}
						>
							<Icon
								style={{marginLeft: 10, marginTop: Platform.OS === 'ios' ? 30 : 0}}
								size={24}
								name="closecircleo"
								color="white"
							/>
						</TouchableOpacity>
						<Text style={styles.headerText}>
							{moment(modalItem.CreatedOnTimestamp).format('DD/MM/YYYY')}
						</Text>
					</View>
					<SafeAreaView style={styles.modalContainer}>
						<FlatList
							horizontal={true}
							data={modalItem.Images}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({item}) => (
								<View
									style={{
										flex: 1,
										width: SCREEN_WIDTH * 0.7,
										marginLeft: 25,
										marginRight: 25,
										height: SCREEN_HEIGHT
									}}
								>
									<Image
										style={styles.modalImage}
										source={isOnline ? {uri: item.ImageUrl} : require('../../assets/loading.png')}
									/>
									<Text style={{fontWeight: 'bold', fontSize: 25}}>{modalItem.UserId}</Text>
									<Text style={{fontSize: 23}}>{modalItem.description}</Text>
								</View>
							)}
						/>
					</SafeAreaView>
				</Modal>
			</View>
		);
	}
};

export default CalendarList;

const styles = StyleSheet.create({
	dateRow: {
		flexDirection: 'row',
		justifyContent: 'space-around'
		// padding: 10
	},
	dateText: {
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: 'black',
		width: SCREEN_WIDTH * 0.142
	},
	modalContainer: {
		alignItems: 'center'
	},
	modalImage: {
		// marginLeft: 50,
		// marginRight: 20,
		width: SCREEN_WIDTH * 0.7,
		height: SCREEN_HEIGHT * 0.5
	},
	modalHeader: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		height: Platform.OS === 'android' ? SCREEN_HEIGHT * 0.07 : SCREEN_HEIGHT * 0.1,
		backgroundColor: '#25527A',
		marginBottom: 10
	},
	headerText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20,
		marginLeft: 20,
		marginTop: Platform.OS === 'ios' ? 30 : 0
	}
});
