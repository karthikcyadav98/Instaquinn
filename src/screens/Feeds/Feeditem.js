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
						{item.Location !== null && <Text style={styles.location}>{item.Location}</Text>}
					</View>
				</View>

				<View style={{justifyContent: 'center'}}>
					<Text style={styles.headerDate}>{moment(item.CreatedOnTimestamp).format('ll')}</Text>
				</View>
			</Card.Content>

			<FlatList
				horizontal={true}
				keyExtractor={(item, index) => index.toString()}
				data={images}
				renderItem={({item}) => <Card.Cover style={styles.coverImage} source={{uri: item.ImageUrl}} />}
				getItemLayout={(data, index) => ({
					length: SCREEN_WIDTH,
					offset: SCREEN_WIDTH * index,
					index
				})}
				snapToInterval={SCREEN_WIDTH}
				decelerationRate="fast"
				bounces={false}
				pagingEnabled={true}
			/>

			<Card.Content>
				<View style={{flexDirection: 'row', margin: 5}}>
					<Text style={{color: 'black'}}>{item.description}</Text>
				</View>
			</Card.Content>
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
		fontSize: 20,
		fontWeight: Platform.OS === 'android' ? 'bold' : '500'
	},
	profileTitle: {
		justifyContent: 'center',
		marginLeft: 15
	},
	location: {
		color: '#8d8d8d',
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
