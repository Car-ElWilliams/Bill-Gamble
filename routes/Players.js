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
} from 'react-native';
import { Button } from 'react-native-paper';
import Context from '../Context';
import PlayerTrashCan from '../components/PlayerTrashCan';

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
	const [placeholderName, setPlaceholderName] = useState('Eric');

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
							borderTopWidth: 1,
							padding: 10,
							borderColor: 'rgb(255, 55, 55)',
						}}
					>
						<Text
							style={{
								fontSize: 22,
								fontFamily: 'Montserrat_800ExtraBold_Italic',
								justifyContent: 'flex-start',
							}}
						>
							{i + 1}#{'  '}
							<Text
								style={{
									color: 'orange',
									fontSize: 27,
									fontFamily: 'Montserrat_800ExtraBold_Italic',
								}}
							>
								{players}
							</Text>
						</Text>
						<TouchableOpacity
							onPress={() => {
								return [removePlayer(players, i), setPlayerNumberCount(playerArray.length - 1)];
							}}
							style={{
								width: 20,
								height: 34,
								alignSelf: 'center',
								justifyContent: 'flex-end',
								marginLeft: 30,
							}}
						>
							<PlayerTrashCan />
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

	function checkEmptyField() {
		console.log('name of added player', getPlayersFromInput);
		if (getPlayersFromInput === '') {
			return setPlaceholderName('Name?');
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
			return setDisableButton(false);
		}
		return setDisableButton(true);
	}
	//
	return (
		<SafeAreaView style={styles.SafeAreaView} stickyHeaderIndices={[0]}>
			<ScrollView
				//bounces={false}
				contentContainerStyle={{ ...styles.rootContainer, width: '100%' }}
			>
				<KeyboardAvoidingView
					behavior='padding'
					keyboardVerticalOffset={Platform.select({
						ios: () => 0,
						android: () => -225,
					})()}
					style={styles.KeyboardAvoidingView}
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
								maxLength={12}
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
										checkEmptyField(),
									];
								}}
								value={getPlayersFromInput}
								disabled={disablePlayerTextInput}
								style={{ ...styles.PlayerInput }}
								clearButtonMode='always'
							></TextInput>
						</View>
						{playerNumberCount === 6 && <Text>Max players reached</Text>}
						<Button
							onPress={() => {
								return [checkEmptyField()];
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
					</View>
					{/*<Ads />*/}
				</KeyboardAvoidingView>
			</ScrollView>
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
		color: 'rgb(255, 55, 55)',
		fontFamily: 'Montserrat_700Bold',
		fontSize: 37,
		marginTop: 0,
		marginBottom: 40,
	},

	PlayerInput: {
		width: '70%',
		borderWidth: 6,
		borderColor: 'rgb(255, 55, 55)',
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
		borderColor: 'rgb(255, 55, 55)',
		borderWidth: 3.5,
		backgroundColor: '#fff',
		minHeight: 400,
		padding: 15,
		width: '85%',
		borderRadius: 15,
	},

	playerBoardHeader: {
		textAlign: 'center',
		color: 'rgb(255, 55, 55)',
		color: 'orange',
		fontSize: 35,
		fontFamily: 'Montserrat_800ExtraBold_Italic',
		borderColor: 'rgb(255, 55, 55)',
		borderBottomWidth: 3,
		paddingBottom: 13,
	},

	addButton: {
		marginTop: 20,
	},

	BackButton: {
		marginTop: 25,
	},

	DoneButton: {
		marginTop: 70,
		backgroundColor: 'red',
		borderRadius: 40,
		width: '80%',
		alignSelf: 'center',
		color: '#fff',
	},
	DoneButtonText: {
		color: '#fff',
		fontFamily: 'Montserrat_700Bold',
		fontSize: 20,
		padding: 5,
	},
});
