import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { render } from 'react-dom';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	SafeAreaView,
} from 'react-native';
import { Button } from 'react-native-paper';
import Context from '../Context';
import Ads from '../components/Ads';

export default function BillAmount({ route, navigation }) {
	//UseContext
	const { setAllPlayerNames } = useContext(Context);
	const { riskyLevel } = useContext(Context);

	//? Variables
	const playerInputRef = useRef();

	const [getPlayersFromInput, setGetplayersFromInput] = useState('');
	const [playerArray, setPlayerArray] = useState([]);
	const [playerNumberCount, setPlayerNumberCount] = useState('');

	const [disableButton, setDisableButton] = useState(true);
	const [disablePlayerTextInput, setDisablePlayerTextInput] = useState(false);

	const [labelForPlayers, setLabelForPlayers] = useState(`Enter player ${playerNumberCount} name`);

	//! Functions

	useEffect(() => {
		enableAddButton();

		if (playerArray.length === 7) {
			setLabelForPlayers('Max Players Reached');
		} else {
			setLabelForPlayers(`Enter player ${playerNumberCount + 1} name`);
		}

		if (playerArray.length === 7) {
			setDisablePlayerTextInput(true);
		} else {
			setDisablePlayerTextInput(false);
		}

		console.log(playerArray.length, playerNumberCount);
	}, [playerArray]);

	function renderPlayers() {
		return [
			playerArray.map((players, i) => {
				console.log('Players and number count:', players, playerNumberCount);
				return (
					<View key={players + i}>
						<Text>{players}</Text>
						<Button
							mode='contained'
							onPress={() => {
								return [removePlayer(players, i), setPlayerNumberCount(playerArray.length - 1)];
							}}
						>
							Remove
						</Button>
					</View>
				);
			}),
		];
	}

	function removePlayer(playerToRemove, indexToRemove) {
		return [
			setPlayerArray(
				playerArray.filter((player, index) => {
					//Works...
					return index !== indexToRemove;
				})
			),
		];
	}

	function submitAllPlayers() {
		setAllPlayerNames(playerArray);
	}

	const clearText = useCallback(() => {
		playerInputRef.current.setNativeProps({ text: '' });

		//console.log(playerInputRef.current.text);
	});

	useEffect(() => {
		let unmounted = false;
		setGetplayersFromInput('');
		return () => {
			return (unmounted = true);
		};
	}, []);

	function enableAddButton() {
		console.log(playerArray.length);
		console.log(disableButton);
		if (playerArray.length > 1) {
			console.log('setttt');
			return setDisableButton(false);
		}
		return setDisableButton(true);
	}

	return (
		<View style={styles.rootContainer}>
			<SafeAreaView style={styles.SafeAreaView} stickyHeaderIndices={[0]}>
				<KeyboardAvoidingView
					behavior='padding'
					keyboardVerticalOffset={Platform.select({
						ios: () => 0,
						android: () => -225,
					})()}
					style={styles.KeyboardAvoidingView}
				>
					<ScrollView bounces={false}>
						{riskyLevel ? (
							<View id='Banner-Risky' style={styles.riskyBanner}>
								<Text style={styles.riskyBannerText}>Risk Level: HIGH</Text>
							</View>
						) : (
							<View id='Banner-Normal' style={{ ...styles.riskyBanner, backgroundColor: 'green' }}>
								<Text style={{ ...styles.riskyBannerText, backgroundColor: 'green' }}>
									Risk Level: NORMAL
								</Text>
							</View>
						)}

						<View style={{ ...styles.SecondRootContainer }}>
							<Text
								style={{
									...styles.EnterPlayerText,
									fontSize: 40,
									marginBottom: -5,
								}}
							>
								Enter
							</Text>
							<Text
								style={{
									...styles.EnterPlayerText,
									fontSize: 40,
									textAlign: 'center',
								}}
							>
								player names
							</Text>
							<TextInput
								ref={playerInputRef}
								label={labelForPlayers}
								placeholder='Erik'
								//autoFocus={true}
								onChangeText={e => {
									setGetplayersFromInput(e);
								}}
								onSubmitEditing={() => {
									return [
										setPlayerArray([...playerArray, getPlayersFromInput]),
										clearText(),
										setGetplayersFromInput(''),
									];
								}}
								value={getPlayersFromInput}
								disabled={disablePlayerTextInput}
								style={{ ...styles.PlayerInput, textAlign: 'center' }}
							></TextInput>
							<Button
								onPress={() => {
									return [
										console.log(playerNumberCount),
										setPlayerArray([...playerArray, getPlayersFromInput]),
										setPlayerNumberCount(playerArray.length + 1),
										clearText(),
										setGetplayersFromInput(''),
									];
								}}
								returnKeyType='next'
								disabled={disablePlayerTextInput}
								style={{ ...styles.nextButton }}
							>
								<Text style={{ color: '#fff', fontSize: 28 }}>Add</Text>
							</Button>
							<Button
								disabled={disableButton}
								onPress={() => {
									return [submitAllPlayers(), navigation.navigate('Chicken')];
								}}
							>
								<Button
									style={{
										color: '#000',
										fontFamily: 'Montserrat_700Bold',
										fontSize: 12,
									}}
								>
									Back
								</Button>
								Done
							</Button>
							<View>{playerArray.length !== 0 && renderPlayers()}</View>
						</View>
						<Ads />
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</View>
	);
}

const heightRiskLevelBanner = Platform.OS === 'ios' ? 55 : 70;
const marginTopRiskLevelBanner = Platform.OS === 'ios' ? -10 : 10;

const styles = StyleSheet.create({
	removeButton: {
		backgroundColor: 'red',
	},
	rootContainer: {
		//flex: 1,
		//flexDirection: 'column',
		//justifyContent: 'center',
		backgroundColor: '#D00404',
	},
	SecondRootContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: '#fff',
		minHeight: 600,
		maxHeight: 900,
	},

	SafeAreaView: {
		marginHorizontal: 0,
	},

	KeyboardAvoidingView: {
		backgroundColor: '#fff',
		flex: -1,
	},

	RecieptSVGContainer: {
		width: '100%',
		maxWidth: '52.5%',
		maxHeight: '35%',
		backgroundColor: 'green',
		backgroundColor: '#fff',
		marginTop: 7.5,
	},

	riskyBanner: {
		flex: 1,
		backgroundColor: '#D00404',
		height: heightRiskLevelBanner,
		justifyContent: 'center',
	},
	riskyBannerText: {
		alignItems: 'center',
		color: '#fff',
		textAlign: 'center',
		fontFamily: 'Montserrat_700Bold',
		fontSize: 19,
		marginTop: marginTopRiskLevelBanner,
	},
	EnterPlayerText: {
		color: '#FF5757',
		fontFamily: 'Montserrat_700Bold',
		fontSize: 37,
		marginTop: 0,
		marginBottom: 40,
	},

	PlayerInput: {
		width: '70%',
		borderWidth: 6,
		borderColor: '#FF5757',
		borderRadius: 20,
		backgroundColor: '#fff',
		padding: 10,
		fontSize: 30,
		fontFamily: 'Montserrat_700Bold',
		color: 'orange',
	},

	nextButton: {
		marginTop: 70,
		padding: 5,
		backgroundColor: 'rgb(255, 55, 55)',
		borderRadius: 40,
		width: '60%',
	},

	BackButton: {
		marginTop: 25,
	},
});
