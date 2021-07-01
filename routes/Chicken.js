import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import { Audio } from 'expo-av';
import TransparentLogo from '../assets/bill-gamble-logo-transparent.png';
import Context from '../Context';

export default function Chicken({ navigation }) {
	const [chickenSound, setChickenSound] = useState(false);

	const { billValue } = useContext(Context);

	useEffect(() => {
		return chickenSound
			? () => {
					console.log('Unloading Sound');
					chickenSound.unloadAsync();
			  }
			: undefined;
	}, []);

	//! Functions

	async function playSound() {
		console.log('Loading Sound');
		const { sound } = await Audio.Sound.createAsync(
			require('../assets/Chicken-www.fesliyanstudios.com.mp3')
		);
		setChickenSound(sound);
		console.log('Playing Sound');
		await sound.playAsync();
	}

	return (
		<View style={styles.HomeContainer}>
			<SafeAreaView>
				<Text style={{ ...styles.TextStandard, marginTop: -2, marginBottom: 25 }}>Gamble Time</Text>
				<ImageBackground source={TransparentLogo} style={styles.TransparentLogo}></ImageBackground>
				<Text style={styles.TextStandard}>START OR {'\n'} CHICKEN OUT?</Text>
				<Button
					onPress={() => navigation.navigate('Results')}
					style={{ ...styles.Buttons, backgroundColor: 'green' }}
				>
					<Text style={styles.ButtonInnerText}>Let's go</Text>
				</Button>
				<Button
					onPress={() => {
						return [navigation.navigate('Home'), playSound()];
					}}
					style={{ ...styles.Buttons, backgroundColor: 'red' }}
				>
					<Text style={styles.ButtonInnerText}> Chicken out🐔</Text>
				</Button>
				<Text
					style={{
						...styles.TextStandard,
						color: 'white',
						marginTop: -10.5,
						fontSize: 12,
						position: 'relative',
						top: '7%',
					}}
				>
					Amount being gambled: <Text style={{ color: 'gold' }}>{billValue}</Text>
				</Text>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	RiskColor: {
		backgroundColor: 'rgba(255, 60, 60, .95)',
	},
	HomeContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: 'rgba(255, 56, 56, .95)',
		alignItems: 'center',
	},
	SafeAreaView: {
		marginHorizontal: 0,
	},
	TransparentLogo: {
		width: 350,
		height: 110,
		alignSelf: 'center',
	},
	Buttons: {
		width: 280,
		padding: '2.5%',
		borderColor: '#fff',
		borderWidth: 2,
		borderRadius: 60,
		alignSelf: 'center',
		marginBottom: 15,
		marginTop: 10,
	},
	ButtonInnerText: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 16,
		color: '#fff',
	},
	TextStandard: {
		color: '#fff',
		fontSize: 28,
		fontFamily: 'Montserrat_700Bold',
		textAlign: 'center',
		marginBottom: 45,
		marginTop: 15,
		letterSpacing: 0.9,
	},
});
