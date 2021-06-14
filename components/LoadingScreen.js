import React, { useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, Animated } from 'react-native';
import LoadingImage from '../assets/bill-gamble-logo.png';

export default function LoadingScreen() {
	let animation = useRef(new Animated.Value(0));

	const width = animation.current.interpolate({
		inputRange: [0, 100],
		outputRange: ['0%', '100%'],
		extrapolate: 'clamp',
	});
	return (
		<View style={styles.container}>
			<ImageBackground source={LoadingImage} style={styles.LoadingImage}>
				<Text style={styles.LoadingText}>BILL GAMBLE </Text>
				<Text style={styles.LoadingBarText}>Loading...</Text>
				<View id='LoadingBar' style={styles.LoadingBar}>
					<Animated.View style={styles.InnerLoadingBar}></Animated.View>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		color: '#fff',
		width: '100%',
		height: '100%',
	},
	LoadingImage: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	},

	LoadingText: {
		color: '#fff',
		fontSize: 70,
		fontFamily: 'Menlo',
		textAlign: 'center',
		marginTop: '25%',
		marginBottom: '75%',
	},

	LoadingBar: {
		borderWidth: 2,
		borderRadius: 10,
		height: '1%',
		width: '60%',
		backgroundColor: 'white',
		borderColor: 'transparent',
		marginTop: '2%',
	},

	InnerLoadingBar: {
		position: 'absolute',
		borderWidth: 2,
		borderRadius: 10,
		height: '170%',
		width,
		backgroundColor: 'blue',
		borderColor: 'transparent',
		top: -2,
		left: -2,
		alignItems: 'flex-start',
	},

	LoadingBarText: {
		color: '#fff',
		fontSize: 35,
		fontFamily: 'Menlo',
		textAlign: 'center',
		//marginTop: '75%',
	},
});
