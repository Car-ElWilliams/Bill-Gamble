import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground, Animated } from 'react-native';
import LoadingImage from '../assets/bill-gamble-logo.png';
import { ProgressBar, Colors } from 'react-native-paper';
import Context from '../Context';

export default function LoadingScreen(props) {
	//UseContext
	const { progressDone, setProgressDone } = useContext(Context);

	//?Variables
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
			setProgressLoadTime(0.9);
		}, 2500);
		setTimeout(() => {
			setProgressLoadTime(1);
			setProgressDone(false);
		}, 2700);
	}, []);

	return (
		<View style={styles.container}>
			<ImageBackground source={LoadingImage} style={styles.LoadingImage}>
				<Text style={styles.LoadingText}>BILL GAMBLE </Text>
				<Text style={styles.LoadingSlogan}>SPLITTING THE BILL THE EXCITING WAY</Text>
				<Text style={styles.LoadingBarText}>Loading...</Text>
				<Text style={{ ...styles.LoadingText, fontSize: 12, marginBottom: 12 }}>
					CREATED BY CAREL WILLIAMS
				</Text>
			</ImageBackground>
			<View style={styles.LoadingBarContainer}>
				<ProgressBar style={styles.LoadingBar} progress={progressLoadTime} color={Colors.blue400} />
			</View>
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
		fontSize: 40,
		fontFamily: 'Montserrat_800ExtraBold',
		textAlign: 'center',
		marginTop: '25%',
	},
	LoadingSlogan: {
		color: '#fff',
		fontSize: 10,
		fontFamily: 'Montserrat_900Black_Italic',
		textAlign: 'center',
		marginBottom: '75%',
		marginTop: '2.2%',
	},

	LoadingBar: {
		backgroundColor: 'transparent',
		borderRadius: 1,
		height: 13,
	},

	LoadingBarText: {
		color: '#fff',
		fontSize: 35,
		fontFamily: 'Montserrat_700Bold',
		textAlign: 'center',
		//marginTop: '75%',
	},
});
