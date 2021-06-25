import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Ads() {
	return (
		<View style={ads.Ads}>
			<Text style={{ textAlign: 'center' }}>Ads</Text>
		</View>
	);
}

const ads = StyleSheet.create({
	Ads: {
		position: 'absolute',
		bottom: 0,
		backgroundColor: 'lightblue',
		width: '100%',
		height: '5%',
		textAlign: 'center',
	},
});
