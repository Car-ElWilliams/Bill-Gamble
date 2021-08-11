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
	TouchableOpacity,
	Touchable,
} from 'react-native';
import { Button } from 'react-native-paper';
import Context from '../Context';
import PlayerTrashCan from '../components/PlayerTrashCan';

import Ads from '../components/Ads';

export default function BillAmount({ route, navigation }) {
	//UseContext
	const { allPlayerNames, setAllPlayerNames } = useContext(Context);
	const { riskyLevel } = useContext(Context);

	//? Variables
	const playerInputRef = useRef();

	const [getPlayersFromInput, setGetplayersFromInput] = useState('');
	const [playerArray, setPlayerArray] = useState([]);
	const [playerNumberCount, setPlayerNumberCount] = useState('');

	const [disableButton, setDisableButton] = useState(true);
	const [disablePlayerTextInput, setDisablePlayerTextInput] = useState(false);

	const [labelForPlayers, setLabelForPlayers] = useState(`Enter player ${playerNumberCount} name`);
	const [placeholderName, setPlaceholderName] = useState('Eric');
	const [errorMessage, setErrorMessage] = useState('');

	const [showMinimumPlayer, setShowMinimumPlayer] = useState(false);

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

		//console.log(playerArray.length, playerNumberCount);
	}, [playerArray]);

	function renderPlayers() {
		return [
			playerArray.map((players, i) => {
				//console.log('Players and number count:', players, playerNumberCount);
				return (
					<View
						key={players + i}
						style={{
							flex: 1,
							flexDirection: 'row',
							borderBottomWidth: 1,
							padding: 12,
							borderColor: 'rgb(255, 40, 40)',
							alignItems: 'center',
						}}
					>
						<Text
							style={{
								fontSize: 22,
								fontFamily: 'Montserrat_800ExtraBold_Italic',
								justifyContent: 'flex-start',
								width: '90%',
							}}
						>
							{i + 1}#{'  '}
							<Text
								style={{
									color: 'orange',
									fontSize: 27,
									fontFamily: 'Montserrat_800ExtraBold_Italic',
									width: '110%',
								}}
							>
								{players}
							</Text>
						</Text>
						<TouchableOpacity
							onPress={() => {
								return [removePlayer(players, i), setPlayerNumberCount(playerArray.length - 1)];
							}}
							style={{ padding: 12 }}
						>
							<TouchableOpacity
								style={{
									width: 20,
									height: 34,
									alignSelf: 'center',
									justifyContent: 'flex-end',
									//marginLeft: 12,
								}}
								onPress={() => {
									return [removePlayer(players, i), setPlayerNumberCount(playerArray.length - 1)];
								}}
							>
								<PlayerTrashCan />
							</TouchableOpacity>
						</TouchableOpacity>
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

	function checkEmptyField(playerName) {
		console.log('name of added player', getPlayersFromInput);
		if (getPlayersFromInput === '') {
			return setPlaceholderName('Name?');
		}
		if (checkIdenticalPlayer(playerName) === true) {
			return false;
		}

		if (playerArray === 6) {
			checkMaxPlayerCountAndAddPlayers();
		}

		console.log(playerNumberCount);
		if (playerNumberCount === 5) {
			setErrorMessage('Max players reached');
			console.log(errorMessage);
			console.log(playerNumberCount);
		}

		return [checkMaxPlayerCountAndAddPlayers(), setPlaceholderName('')];
	}

	function checkMaxPlayerCountAndAddPlayers() {
		if (playerNumberCount <= 5) {
			return [
				setPlayerArray([...playerArray, getPlayersFromInput]),
				setPlayerNumberCount(playerArray.length + 1),
				clearText(),
				setGetplayersFromInput(''),
				React.memo(() => {
					return setDisablePlayerTextInput(false);
				}),
			];
		}
		if (playerNumberCount === 6) {
			setErrorMessage('Max players reached');
		} else {
			setErrorMessage();
		}
		return [setDisablePlayerTextInput(true)];
	}

	useEffect(() => {
		let unmounted = false;
		setGetplayersFromInput('');
		return () => {
			return (unmounted = true);
		};
	}, []);

	function enableAddButton() {
		//console.log(playerArray.length);
		//console.log(disableButton);
		if (playerArray.length > 1) {
			//console.log('setttt');
			return [setDisableButton(false), setShowMinimumPlayer(false)];
		}
		return [setDisableButton(true), setShowMinimumPlayer(true)];
	}

	function checkIdenticalPlayer(name) {
		if (playerArray.includes(name)) {
			setErrorMessage('Identical player exists');
			return true;
		} else {
			setErrorMessage('');
			return false;
		}
	}

	//
	return (
		<SafeAreaView style={styles.SafeAreaView} stickyHeaderIndices={[0]}>
			<KeyboardAvoidingView
				behavior='padding'
				keyboardVerticalOffset={Platform.select({
					ios: () => 0,
					android: () => -200,
				})()}
				style={styles.KeyboardAvoidingView}
			>
				<ScrollView
					//bounces={false}
					contentContainerStyle={{ ...styles.rootContainer, width: '100%' }}
				>
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

					<View>
						<Text
							style={{
								...styles.EnterPlayerText,
								fontSize: 40,
								//marginBottom: -5,
								textAlign: 'center',
								marginTop: 70,
								marginBottom: 55,
							}}
						>
							Enter player names
						</Text>
						{/*<Text
							style={{
								...styles.EnterPlayerText,
								fontSize: 40,
								textAlign: 'center',
							}}
						></Text>*/}
						<View style={{ alignItems: 'center' }}>
							<TextInput
								maxLength={9}
								ref={playerInputRef}
								label={labelForPlayers}
								placeholder={placeholderName}
								//autoFocus={true}
								onChangeText={e => {
									setGetplayersFromInput(e);
								}}
								onSubmitEditing={() => {
									return [
										//setPlayerArray([...playerArray, getPlayersFromInput]),
										//clearText(),
										//setGetplayersFromInput(''),
										checkEmptyField(getPlayersFromInput),
									];
								}}
								value={getPlayersFromInput}
								disabled={disablePlayerTextInput}
								style={{ ...styles.PlayerInput }}
								clearButtonMode='always'
							></TextInput>
						</View>
						{playerNumberCount === 6 && (
							<Text
								style={{
									textAlign: 'center',
									color: 'black',
									fontSize: 10.8,
									fontFamily: 'Montserrat_600SemiBold',
									marginTop: 5,
									marginBottom: -5,
								}}
							>
								{errorMessage}
							</Text>
						)}
						{errorMessage === 'Identical player exists' && (
							<Text
								style={{
									textAlign: 'center',
									color: 'black',
									fontSize: 11,
									fontFamily: 'Montserrat_600SemiBold',
									marginTop: 5,
									marginBottom: -5,
								}}
							>
								{errorMessage}
							</Text>
						)}
						<Button
							onPress={() => {
								return [checkEmptyField(getPlayersFromInput)];
							}}
							returnKeyType='next'
							disabled={disablePlayerTextInput}
							style={{ ...styles.addButton }}
						>
							<Text style={{ color: '#000', fontSize: 20, fontFamily: 'Montserrat_900Black' }}>
								Add
							</Text>
						</Button>
						<View style={styles.playerBoardContainer}>
							<View style={styles.playerBoard}>
								<Text style={styles.playerBoardHeader}>Players</Text>
								<View>{playerArray.length !== 0 && renderPlayers()}</View>
							</View>
						</View>
						<Button
							disabled={disableButton}
							onPress={() => {
								return [submitAllPlayers(), navigation.navigate('Chicken')];
							}}
							style={styles.DoneButton}
							labelStyle={styles.DoneButtonText}
						>
							<Text>Done</Text>
						</Button>
						{showMinimumPlayer && (
							<Text
								style={{
									textAlign: 'center',
									fontFamily: 'Montserrat_600SemiBold',
									fontSize: 10,
									marginTop: 11,
									marginBottom: -10,
									color: 'black',
								}}
							>
								Minimum 2 players
							</Text>
						)}
					</View>

					<Button
						onPress={() => {
							return navigation.navigate('Note');
						}}
						labelStyle={styles.BackButtonText}
						style={styles.BackButton}
					>
						<Text>Back</Text>
					</Button>
					{/*<Ads />*/}
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
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
		//backgroundColor: '#D00404',
		//},
		flex: -0,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		//minHeight: 600,
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
		width: '100%',
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
		color: 'rgb(255, 40, 40)',
		fontFamily: 'Montserrat_700Bold',
		fontSize: 37,
		marginTop: 0,
		marginBottom: 40,
	},

	PlayerInput: {
		width: '70%',
		borderWidth: 6,
		borderColor: 'rgb(255, 40, 40)',
		borderRadius: 20,
		backgroundColor: '#fff',
		padding: 10,
		fontSize: 30,
		fontFamily: 'Montserrat_700Bold',
		color: 'orange',
		textAlign: 'center',
	},

	playerBoardContainer: {
		alignItems: 'center',
		marginTop: 60,
	},

	playerBoard: {
		//borderColor: 'rgb(255, 40, 40)',
		//borderWidth: 3.5,
		backgroundColor: '#fff',
		//minHeight: 400,
		padding: 27,
		width: '100%',
		//borderRadius: 15,
	},

	playerBoardHeader: {
		textAlign: 'center',
		color: 'rgb(255, 40, 40)',
		color: 'orange',
		fontSize: 35,
		fontFamily: 'Montserrat_800ExtraBold_Italic',
		borderColor: 'rgb(255, 40, 40)',
		borderBottomWidth: 5,
		paddingBottom: 20,
	},

	addButton: {
		marginTop: 20,
	},

	DoneButton: {
		marginTop: 55,
		backgroundColor: 'red',
		borderRadius: 40,
		width: 280,
		alignSelf: 'center',
		color: '#fff',
	},
	DoneButtonText: {
		color: '#fff',
		fontFamily: 'Montserrat_700Bold',
		fontSize: 20,
		padding: 5,
	},

	BackButton: {
		marginTop: 35,
	},

	BackButtonText: {
		color: '#000',
		fontFamily: 'Montserrat_700Bold',
		fontSize: 12,
		paddingBottom: 30,
	},
});
