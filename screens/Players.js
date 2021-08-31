import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	SafeAreaView,
	TouchableOpacity,
	PixelRatio,
} from 'react-native';

import { Button } from 'react-native-paper';
import Context from '../Context';
import PlayerTrashCan from '../components/PlayerTrashCan';
import constantStyle from '../constants/primeColors.js';
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
	const [placeholderName, setPlaceholderName] = useState('ERIC');
	const [errorMessage, setErrorMessage] = useState('');

	const [showMinimumPlayer, setShowMinimumPlayer] = useState(false);

	let adjustedFontsize = 40;

	if (PixelRatio.get() > 2) {
		adjustedFontsize = 42;
	}

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
	}, [playerArray]);

	function renderPlayers() {
		return [
			playerArray.map((players, i) => {
				return (
					<View
						key={players + i}
						style={{
							flex: 1,
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Text
							style={{
								fontSize: 22,
								fontFamily: 'Montserrat_800ExtraBold_Italic',
								justifyContent: 'flex-start',
								width: '90%',
								color: 'black',
							}}
						>
							{i + 1}#{'  '}
							<Text
								style={{
									color: 'white',
									fontSize: 27,
									fontFamily: 'Montserrat_800ExtraBold_Italic',
									width: '110%',
									//textDecorationLine: 'underline',
									borderWidth: 2,
									borderBottomColor: 'black',
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
	});

	function checkEmptyField(playerName) {
		'name of added player', getPlayersFromInput;
		if (getPlayersFromInput === '') {
			return setPlaceholderName('Name?');
		}
		if (checkIdenticalPlayer(playerName) === true) {
			return false;
		}

		if (playerArray === 6) {
			checkMaxPlayerCountAndAddPlayers();
		}

		if (playerNumberCount >= 1) {
			setShowMinimumPlayer(false);
		}

		playerNumberCount;
		if (playerNumberCount === 5) {
			setErrorMessage('Max players reached');
			errorMessage;
			playerNumberCount;
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
		if (playerArray.length > 1) {
			return [setDisableButton(false)];
		}

		return [setDisableButton(true)];
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
								//fontSize: Dimensions.get('window').width < 412 ? 34 : 40,
								fontSize: adjustedFontsize,
								textAlign: 'center',
								marginTop: 70,
								marginBottom: 55,
							}}
						>
							Enter{'\n'}player names
						</Text>
						{/*<Text
							style={{
								...styles.EnterPlayerText,
								fontSize: 40,
								textAlign: 'center',
							}}
						></Text>*/}
						<View
							style={{
								alignItems: 'center',
							}}
						>
							<TextInput
								maxLength={9}
								ref={playerInputRef}
								label={labelForPlayers}
								placeholder={placeholderName}
								placeholderTextColor='rgba(15, 7, 7, 0.24)'
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
									color: 'white',
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
						<TouchableOpacity
							onPress={() => {
								return [checkEmptyField(getPlayersFromInput)];
							}}
							returnKeyType='next'
							disabled={disablePlayerTextInput}
							style={{ ...styles.addButton }}
						>
							<Text
								style={{
									color: '#fff',
									fontSize: 30,
									fontFamily: 'Montserrat_900Black',
									textDecorationLine: 'underline',
									textAlign: 'center',
								}}
							>
								ADD
							</Text>
						</TouchableOpacity>
						<View style={styles.playerBoardContainer}>
							<View style={styles.playerBoard}>
								<Text style={styles.playerBoardHeader}>PLAYERS</Text>
								<View>{playerArray.length !== 0 && renderPlayers()}</View>
							</View>
						</View>
						<Button
							onPress={() => {
								if (disableButton) {
									setShowMinimumPlayer(true);
								} else {
									setShowMinimumPlayer(false);
									return [submitAllPlayers(), navigation.navigate('Chicken')];
								}
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
									fontFamily: 'Montserrat_700Bold',
									fontSize: 12,
									marginTop: 11,
									marginBottom: -10,
									color: 'white',
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
		flex: -0,
		flexDirection: 'column',
		alignItems: 'center',
		//justifyContent: 'center',
		backgroundColor: constantStyle.primaryThemeColor,
	},

	SafeAreaView: {
		minHeight: '100%',
		backgroundColor: constantStyle.primaryThemeColor,
		marginHorizontal: 0,
	},

	KeyboardAvoidingView: {
		backgroundColor: '#fff',
		flex: -1,
	},

	riskyBanner: {
		width: '100%',
		flex: 1,
		backgroundColor: constantStyle.riskyBannerColor,
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
		color: '#fff',
		fontFamily: 'Montserrat_700Bold',
		fontSize: 40,
		marginTop: 0,
		marginBottom: 40,
	},

	PlayerInput: {
		width: '75%',
		//borderWidth: 2,
		//borderColor: 'rgb(0,0, 0)',
		borderRadius: 16,
		backgroundColor: 'rgba(255, 255, 255,1)',
		padding: 10,
		fontSize: 37,
		fontFamily: 'Montserrat_700Bold',
		color: 'rgb(49,49,49)',
		textAlign: 'center',
	},

	playerBoardContainer: {
		alignItems: 'center',
		marginTop: 60,
	},

	playerBoard: {
		//backgroundColor: 'rgba(255, 255, 255, 1)',
		//borderWidth: 2.5,
		borderRadius: 10,
		padding: 27,
		width: '85%',
		//borderColor: 'black',
	},

	playerBoardHeader: {
		textAlign: 'center',
		color: 'white',
		fontSize: 35,
		fontFamily: 'Montserrat_800ExtraBold_Italic',
		borderColor: 'black',
		borderBottomWidth: 2.5,
		borderRadius: 3.1,
		paddingBottom: 12.5,
		marginBottom: 10,
	},

	addButton: {
		marginTop: 20,
	},

	DoneButton: {
		marginTop: 40,
		borderWidth: 2,
		alignSelf: 'center',
		color: 'red',
	},
	DoneButtonText: {
		color: '#fff',
		fontFamily: 'Montserrat_900Black',
		fontSize: 30,
		padding: 1,
		textDecorationLine: 'underline',
	},

	BackButton: {
		marginTop: 20,
		marginBottom: 20,
	},

	BackButtonText: {
		color: 'rgba(0,0,0,0.77)',
		fontFamily: constantStyle.defaultFont,
		fontSize: Dimensions.get('window').width < 380 ? 14 : 16,
	},
});
