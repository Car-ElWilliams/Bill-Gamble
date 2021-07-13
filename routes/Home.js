import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import Context from '../Context';
import Ads from '../components/Ads';
import TransparentLogo from '../assets/bill-gamble-logo-transparent.png';

export default function Home({ navigation }) {
	const { setriskyLevel } = useContext(Context);
	const { scoreResults } = useContext(Context);

	return (
		<SafeAreaView style={{ ...styles.HomeContainer }}>
			<ImageBackground source={TransparentLogo} style={styles.TransparentLogo}></ImageBackground>

			<Text style={styles.Header}>CHOOSE RISK LEVEL</Text>
			<Button
				style={styles.Buttons}
				labelStyle={styles.ButtonInnerText}
				mode='contained'
				color='#189615'
				onPress={() => {
					return [
						navigation.navigate('Note', {
							risky: false,
							bill: 'bill',
						}),
						setriskyLevel(false),
					];
				}}
			>
				<Text>Normal</Text>
			</Button>
			<Text style={styles.ButtonText}>Win less, lose less</Text>

			<Button
				style={styles.Buttons}
				labelStyle={styles.ButtonInnerText}
				mode='contained'
				color='#D00404'
				onPress={() => {
					return [
						navigation.navigate('Note', {
							risky: true,
							bill: 'bill',
						}),
						setriskyLevel(true),
					];
				}}
			>
				<Text>Risky</Text>
			</Button>
			<Text style={styles.ButtonText}>For the greedy and the brave</Text>
			<Button onPress={() => console.log(scoreResults)}>test</Button>
			{/*<Ads />*/}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	HomeContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		//opacity: 0,
		backgroundColor: 'rgb(255, 55, 55)',
	},

	TransparentLogo: {
		width: 110,
		height: 110,
		alignSelf: 'center',
		marginTop: -40,
	},
	Header: {
		marginTop: 30,
		marginBottom: 80,
		fontSize: 34,
		color: '#fff',
		fontFamily: 'Montserrat_800ExtraBold',
		textAlign: 'center',
	},

	Buttons: {
		width: '60%',
		borderColor: '#fff',
		borderWidth: 2,
		borderRadius: 60,
	},
	ButtonInnerText: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 16,
		padding: '4.5%',
	},
	ButtonText: {
		color: '#fff',
		fontFamily: 'Montserrat_700Bold',
		marginTop: 10,
		marginBottom: 30,
		fontSize: 10,
	},
});
