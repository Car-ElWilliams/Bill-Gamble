import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Animated } from 'react-native';
import LoadingImage from '../assets/bill-gamble-logo.png';
import { ProgressBar, Colors } from 'react-native-paper';

export default function LoadingScreen() {
	const [progressLoadTime, setProgressLoadTime] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			setProgressLoadTime(0.2);
		}, 1000);
		setTimeout(() => {
			setProgressLoadTime(0.6);
		}, 1500);
		setTimeout(() => {
			setProgressLoadTime(1);
		}, 2700);
	}, []);

	if (progressLoadTime === 1) {
		console.log('done');
	}

	return (
		<View style={styles.container}>
			<ImageBackground source={LoadingImage} style={styles.LoadingImage}>
				<Text style={styles.LoadingText}>BILL GAMBLE </Text>
				<Text style={styles.LoadingBarText}>Loading...</Text>
				{/*<View id='LoadingBar' style={styles.LoadingBar}>*/}
				{/*<Animated.View style={styles.InnerLoadingBar}></Animated.View>*/}
				{/*</View>*/}
			</ImageBackground>
			<ProgressBar
				style={styles.LoadingBar}
				progress={progressLoadTime}
				color={Colors.blue400}
				//indeterminate={true}
			/>
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
		backgroundColor: 'white',
		borderRadius: 10,
		height: 5,
	},

	LoadingBarText: {
		color: '#fff',
		fontSize: 35,
		fontFamily: 'Menlo',
		textAlign: 'center',
		//marginTop: '75%',
	},
});
