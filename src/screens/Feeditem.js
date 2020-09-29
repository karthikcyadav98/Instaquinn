import React from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
import moment from 'moment';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Feeditem = ({item}) => {
	const images = item.Images;

	return (
		<Card>
			<Card.Content style={styles.cardHeader}>
				<View style={styles.headerLeft}>
					<Avatar.Image style={styles.profileImg} size={50} source={{uri: item.profilePictureUrl}} />
					<View style={styles.profileTitle}>
						<Text style={styles.profileName}>{item.UserId}</Text>
						{item.Location !== null || (true && <Text style={styles.location}>item.Location</Text>)}
					</View>
				</View>

				<View>
					<Text style={styles.headerDate}>{moment(item.CreatedOnTimestamp).format('ll')}</Text>
				</View>
			</Card.Content>

			<FlatList
				horizontal={true}
				keyExtractor={(item, index) => index}
				data={images}
				renderItem={({item}) => <Card.Cover style={styles.coverImage} source={{uri: item.ImageUrl}} />}
			/>
			{/* <Card.Cover style={styles.coverImage} source={{uri: img.ImageUrl}} /> */}
			{/* <Card.Cover style={styles.coverImage} source={{uri: item.Images[0].ImageUrl}} /> */}
		</Card>
	);
};

export default Feeditem;

const styles = StyleSheet.create({
	cardHeader: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	profileImg: {
		borderWidth: 0.5,
		borderColor: '#25527A'
	},
	profileName: {
		marginLeft: 10,
		fontSize: 20,
		fontWeight: Platform.OS === 'android' ? 'bold' : '500'
	},
	profileTitle: {
		justifyContent: 'center'
		// alignItems: 'center'
	},
	location: {
		color: '#8d8d8d',
		marginLeft: 10,
		fontSize: 15
	},
	headerLeft: {
		flexDirection: 'row'
	},
	headerDate: {
		color: '#8d8d8d',
		marginRight: 10
	},
	coverImage: {
		marginTop: 10,
		height: SCREEN_HEIGHT * 0.5,
		resizeMode: 'contain',
		width: SCREEN_WIDTH
	}
});
