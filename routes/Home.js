import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground, Animated } from 'react-native';
import { Button } from 'react-native-paper';
import Context from '../Context';
import Ads from '../components/Ads';
import TransparentLogo from '../assets/bill-gamble-logo-transparent.png';

export default function Home({ navigation }) {
	const { riskyLevel, setriskyLevel } = useContext(Context);

	return (
		<View style={styles.HomeContainer}>
			<ImageBackground source={TransparentLogo} style={styles.TransparentLogo}></ImageBackground>

			<Text style={styles.Header}>Choose Risk Level</Text>
			<Button
				style={styles.Buttons}
				mode='contained'
				color='#189615'
				onPress={() => {
					return [
						navigation.navigate('InputSelections', {
							risky: false,
							bill: 'bill',
						}),
						setriskyLevel(false),
					];
				}}
			>
				<Text style={styles.ButtonInnerText}>Normal</Text>
			</Button>
			<Text style={styles.ButtonText}>Win less, lose less</Text>

			<Button
				style={styles.Buttons}
				mode='contained'
				color='#D00404'
				onPress={() => {
					return [
						navigation.navigate('InputSelections', {
							risky: true,
							bill: 'bill',
						}),
						setriskyLevel(true),
					];
				}}
			>
				<Text style={styles.ButtonInnerText}>Risky</Text>
			</Button>
			<Text style={styles.ButtonText}>For the greedy and the brave</Text>
			<Ads />
		</View>
	);
}

const styles = StyleSheet.create({
	HomeContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgb(255, 87, 87)',
	},

	TransparentLogo: {
		width: 110,
		height: 110,

		alignSelf: 'center',
		marginTop: -50,
	},
	Header: {
		marginTop: 30,
		marginBottom: 69,
		fontSize: 36,
		color: '#fff',
		fontFamily: 'Montserrat_700Bold',
		textAlign: 'center',
	},

	Buttons: {
		width: '60%',
		padding: '2.5%',
		borderColor: '#fff',
		borderWidth: 2,
		borderRadius: 60,
	},
	ButtonInnerText: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 16,
	},
	ButtonText: {
		color: '#fff',
		fontFamily: 'Montserrat_700Bold',
		marginTop: 10,
		marginBottom: 25,
		fontSize: 10,
	},
});
