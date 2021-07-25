import React, { useState, useEffect, useContext } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	SafeAreaView,
	Switch,
	Platform,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import { Button } from 'react-native-paper';
import Context from '../Context';
import Ads from '../components/Ads';
import TransparentLogo from '../assets/bill-gamble-logo-transparent.png';
import TrophySVG from '../components/TrophySVG.js';
import { Montserrat_200ExtraLight } from '@expo-google-fonts/montserrat';

export default function Home({ navigation }) {
	const { setriskyLevel } = useContext(Context);
	const { scoreResults } = useContext(Context);
	const { allPlayerNames } = useContext(Context);

	const [showSavedScore, setShowSavedScore] = useState(false);

	function showOrHideScore() {
		if (showSavedScore) {
			return setShowSavedScore(false);
		}
		return setShowSavedScore(true);
	}

	function renderAllPlayers() {
		if (allPlayerNames) {
			console.log(scoreResults);
			return allPlayerNames.map((players, i) => {
				console.log(players, 'test');
				return (
					<View key={players + i}>
						<Text
							style={{
								color: 'white',
								fontSize: 20.2,
								fontFamily: 'Montserrat_600SemiBold',
								marginTop: 20,
								textAlign: 'center',
							}}
						>
							{players} pays <Text style={{ color: 'orange' }}>{scoreResults[i]}</Text>
						</Text>
					</View>
				);
			});
		}
	}

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

			{scoreResults.length > 0 && (
				<TouchableOpacity
					onPress={() => {
						return [showOrHideScore(), console.log(showSavedScore)];
					}}
					style={{
						height: 'auto',
						backgroundColor: 'orange',
						borderColor: 'white',
						borderWidth: 1.25,
						borderRadius: 50,
						width: 65,
						height: 65,
						position: 'absolute',
						left: 15,
						top: Dimensions.get('window').height - 80,
					}}
				>
					<TrophySVG style={{ width: 35, height: 35 }} />
				</TouchableOpacity>
			)}
			{showSavedScore && (
				<TouchableOpacity
					onPress={() => {
						return [showOrHideScore(), console.log(showSavedScore)];
					}}
					style={{
						flex: 1,
						position: 'absolute',
						height: '75%',
						width: '80%',
						backgroundColor: 'black',
						top: '8%',
						left: '10%',
						alignItems: 'center',
						alignSelf: 'center',
						borderRadius: 20,
						elevation: Platform.OS === 'android' ? 101 : 0,
					}}
				>
					<Text
						style={{
							color: 'white',
							fontSize: 30,
							fontFamily: 'Montserrat_700Bold',
							marginTop: 20,
						}}
					>
						Score Results
					</Text>
					{renderAllPlayers()}
				</TouchableOpacity>
			)}

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
		marginTop: 15,
		marginBottom: 75,
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
		position: 'relative',
		zIndex: 2,
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
	TrophyLogo: {
		width: 100,
		height: 110,
	},
});
