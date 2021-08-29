import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { Audio } from 'expo-av';
import TransparentLogo from '../assets/bill-gamble-logo-transparent.png';
import constantStyle from '../constants/primeColors.js';
import Context from '../Context';

export default function Chicken({ navigation }) {
	const [chickenSound, setChickenSound] = useState(false);

	const { billValue } = useContext(Context);

	const [mounted, setMounted] = useState('');

	useEffect(() => {
		setMounted(true);

		//clean up
		return () => {
			setMounted(false);
		};
	}, []);

	useEffect(() => {
		chickenSound
			? () => {
					return ['Unloading Sound', chickenSound.unloadAsync()];
			  }
			: undefined;
	});

	//! Functions

	async function playSound() {
		('Loading Sound');
		const { sound } = await Audio.Sound.createAsync(
			require('../assets/Chicken-www.fesliyanstudios.com.mp3')
		);
		setChickenSound(sound);
		('Playing Sound');
		await sound.playAsync();
	}

	return (
		<View style={styles.ChickenContainer}>
			<SafeAreaView>
				{/*<Text style={{ ...styles.TextStandard, marginTop: -2, marginBottom: 25, fontSize: 40 }}>
					Gamble Time
				</Text>*/}
				<ImageBackground source={TransparentLogo} style={styles.TransparentLogo}></ImageBackground>
				<Text style={{ ...styles.TextStandard, marginBottom: 55, fontSize: 29 }}>
					START OR{'\n'}CHICKEN OUT?
				</Text>
				<Button
					onPress={() => {
						if (mounted) {
							return [navigation.navigate('Results'), setMounted(false)];
						} else {
							mounted;
						}
					}}
					style={{ ...styles.Buttons, backgroundColor: 'green' }}
					labelStyle={styles.ButtonInnerText}
				>
					<Text>START</Text>
				</Button>
				<Button
					onPress={() => {
						if (mounted) {
							return [navigation.navigate('Home'), playSound(), setMounted(false)];
						} else {
							mounted;
						}
					}}
					style={{ ...styles.Buttons, backgroundColor: 'red', marginBottom: 50 }}
					labelStyle={styles.ButtonInnerText}
				>
					<Text> Chicken out🐔</Text>
				</Button>
				<Text
					style={{
						...styles.TextStandard,
						color: 'white',
						marginTop: -20.5,
						fontSize: 18,
						textDecorationLine: 'underline',
						fontFamily: 'Montserrat_800ExtraBold_Italic',
						position: 'relative',
						top: '7%',
						marginBottom: 25,
					}}
				>
					CASH ON THE LINE{'\n'}
				</Text>
				<Text
					style={{
						color: '	rgb(255,214,0)',
						fontSize: Dimensions.get('window').width < 380 ? 25 : 33,

						alignSelf: 'center',
						fontFamily: 'Montserrat_800ExtraBold_Italic',
						marginBottom: Dimensions.get('window').width < 380 ? 10 : 5,
					}}
				>
					{billValue}
				</Text>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	RiskColor: {
		backgroundColor: 'rgba(255, 60, 60, .95)',
	},
	ChickenContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: constantStyle.primaryThemeColor,
		alignItems: 'center',
	},
	SafeAreaView: {
		marginHorizontal: 0,
	},
	TransparentLogo: {
		width: 120,
		height: 120,
		alignSelf: 'center',
		marginBottom: -10,
		marginTop: 20,
	},
	Buttons: {
		width: 275,
		borderColor: '#fff',
		borderWidth: 2,
		borderRadius: 60,
		alignSelf: 'center',
		marginBottom: 25,
		marginTop: 10,
	},
	ButtonInnerText: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 16.7,
		color: '#fff',
		padding: '3.7%',
	},
	TextStandard: {
		color: '#fff',
		fontSize: 28,
		fontFamily: 'Montserrat_800ExtraBold_Italic',
		textAlign: 'center',
		marginBottom: 45,
		marginTop: 15,
		letterSpacing: 0.9,
	},
});
