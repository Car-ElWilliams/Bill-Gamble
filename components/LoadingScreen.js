import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground, Animated } from 'react-native';
import LoadingImage from '../assets/bill-gamble-logo.png';
import { ProgressBar, Colors } from 'react-native-paper';
import Context from '../Context';

export default function LoadingScreen(props) {
	//UseContext
	const { progressDone, setProgressDone } = useContext(Context);

	//Variables
	const [progressLoadTime, setProgressLoadTime] = useState(0);

	//Functions

	useEffect(() => {
		let mounted = true;

		setTimeout(() => {
			setProgressLoadTime(0.2);
		}, 1000);
		setTimeout(() => {
			setProgressLoadTime(0.6);
		}, 1500);
		setTimeout(() => {
			setProgressLoadTime(1);
			setProgressDone(false);
		}, 2700);
	}, []);

	return (
		<View style={styles.container}>
			<ImageBackground source={LoadingImage} style={styles.LoadingImage}>
				<Text style={styles.LoadingText}>BILL GAMBLE </Text>
				<Text style={styles.LoadingBarText}>Loading...</Text>
			</ImageBackground>
			<ProgressBar style={styles.LoadingBar} progress={progressLoadTime} color={Colors.blue400} />
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
		fontFamily: 'Roboto',
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
		fontFamily: 'Roboto',
		textAlign: 'center',
		//marginTop: '75%',
	},
});
