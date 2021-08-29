import React, { useState, useEffect, useContext } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	ActivityIndicator,
	Dimensions,
} from 'react-native';
//import LoadingImage from '../assets/bill-gamble-logo.png';
import LoadingImage from '../assets/android-splash-screen.png';
import { ProgressBar, Colors } from 'react-native-paper';
import Context from '../Context';
import constantStyle from '../constants/primeColors.js';

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
			<Text style={styles.LoadingSlogan}>SPLITTING THE BILL THE {'\n'} EXCITING WAY</Text>
			{/*<ActivityIndicator size='large' color='orange' />*/}
			<Text style={{ ...styles.LoadingText, fontSize: 13, flexGrow: 1, marginBottom: 13 }}>
				CREATED BY CAREL WILLIAMS
			</Text>
			<View style={styles.LoadingBarContainer}>
				<ProgressBar
					style={styles.LoadingBar}
					progress={progressLoadTime}
					color={Colors.yellow700}
				/>
			</View>
		</View>
	);
}

let LoadingTextMarginTop;
let TextSizeHeader;
let TextSizeSlogan;

if (Dimensions.get('window').height <= 670) {
	LoadingTextMarginTop = '30%';
	TextSizeHeader = 40;
	TextSizeSlogan = 16;
}
if (Dimensions.get('window').height > 640) {
	LoadingTextMarginTop = '40.5%';
	TextSizeHeader = 45;
	TextSizeSlogan = 20;
}

const styles = StyleSheet.create({
	container: {
		color: '#fff',
		width: '100%',
		height: Dimensions.get('window').height,
		flex: 1,
		backgroundColor: constantStyle.primaryThemeColor,
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
		fontSize: TextSizeHeader,
		fontFamily: 'Montserrat_800ExtraBold',
		textAlign: 'center',
		marginTop: LoadingTextMarginTop,
		flexGrow: 10,
	},
	LoadingSlogan: {
		color: '#fff',
		fontSize: TextSizeSlogan,
		fontFamily: 'Montserrat_900Black_Italic',
		textAlign: 'center',
		marginBottom: '3%',
		marginTop: '55.2%',
	},

	LoadingBar: {
		backgroundColor: 'transparent',
		borderRadius: 1,
		height: 13,
	},
});
