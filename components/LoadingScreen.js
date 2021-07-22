import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground, Animated, Dimensions } from 'react-native';
//import LoadingImage from '../assets/bill-gamble-logo.png';
import LoadingImage from '../assets/NewLogoScreen3.png';
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
			<ImageBackground source={LoadingImage} style={styles.LoadingImage}></ImageBackground>
			<Text style={styles.LoadingText}>BILL GAMBLE</Text>
			{/*<Text style={styles.LoadingSlogan}>SPLITTING THE BILL THE EXCITING WAY</Text>*/}
			{/*<Text style={styles.LoadingBarText}>Loading...</Text>*/}
			<Text style={{ ...styles.LoadingText, fontSize: 14, flexGrow: 1 }}>
				CREATED BY CAREL WILLIAMS
			</Text>
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
		height: Dimensions.get('window').height,
		flex: 1,
	},
	LoadingImage: {
		position: 'absolute',
		flexDirection: 'column',
		alignItems: 'center',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
	},

	LoadingText: {
		color: '#fff',
		fontSize: 40,
		fontFamily: 'Montserrat_800ExtraBold',
		textAlign: 'center',
		marginTop: '35%',
		flexGrow: 10,
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
