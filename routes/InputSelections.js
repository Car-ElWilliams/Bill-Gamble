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
import RecieptSVG from '../components/RecieptSVG';

export default function BillAmount({ route, navigation }) {
	//UseContext
	const { billValue, setBillValue } = useContext(Context);
	const { setAllPlayerNames } = useContext(Context);
	const { riskyLevel } = useContext(Context);

	//? Variables
	const playerInputRef = useRef();

	const [getPlayersFromInput, setGetplayersFromInput] = useState('');
	const [playerArray, setPlayerArray] = useState([]);
	const [playerNumberCount, setPlayerNumberCount] = useState('');

	const [billValidation, setBillValidation] = useState(false);
	const [currentBillValue, setCurrentBillValue] = useState('');

	const { bill } = route.params;

	const [disableButton, setDisableButton] = useState(true);
	const [disablePlayerTextInput, setDisablePlayerTextInput] = useState(false);
	const [disableNextButton, setDisableNextButton] = useState(true);

	const [labelForPlayers, setLabelForPlayers] = useState(`Enter player ${playerNumberCount} name`);

	//? Not getting this to work?
	//const addButton = useRef();
	//useEffect(() => {
	//	console.log(addButton);
	//}, []);

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

	useEffect(() => {
		enableNextButton();
	}, [currentBillValue]);

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
	});

	function enableAddButton() {
		console.log(playerArray.length);
		console.log(disableButton);
		if (playerArray.length > 1) {
			console.log('setttt');
			return setDisableButton(false);
		}
		return setDisableButton(true);
	}

	function enableNextButton() {
		const regex = new RegExp(/^[0-9\b]+$/);

		if (currentBillValue === '') {
			return setDisableNextButton(true);
		}

		return setDisableNextButton(false);
	}

	return (
		<View style={styles.rootContainer}>
			<SafeAreaView style={styles.SafeAreaView}>
				<KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={0}>
					<ScrollView bounces={false}>
						{riskyLevel ? (
							<View id='Banner-Risky' style={styles.riskyBanner}>
								<Text style={styles.riskyBannerText}>Risk Level: HIGH</Text>
							</View>
						) : (
							<View id='Banner-Normal' style={{ backgroundColor: 'green', height: '25%' }}>
								<Text style={{ color: 'white', textAlign: 'center' }}>Risk Level: Normal</Text>
							</View>
						)}

						{/*Bill amount*/}
						{bill && (
							<View style={styles.SecondRootContainer}>
								<View style={styles.RecieptSVGContainer}>
									<RecieptSVG />
								</View>

								<Text style={styles.BillAmountText}>Enter bill total </Text>

								<TextInput
									label='Enter Bill Amount'
									placeholder='500'
									keyboardType='number-pad'
									onChangeText={e => {
										const regex = new RegExp(/^[0-9\b]+$/);

										if (regex.test(e) || e === '') {
											setCurrentBillValue(e);
										}
									}}
									error={billValidation}
									value={currentBillValue}
									style={styles.BillInput}
									textAlign='center'
									maxLength={9}
								></TextInput>
								<Text
									style={{
										color: 'orange',
										fontFamily: 'Montserrat_600SemiBold_Italic',
										fontSize: 13,
										marginTop: 9,
									}}
								>
									Show me the money...
								</Text>
								<Button
									style={styles.nextButton}
									onPress={() => {
										return [
											setBillValue(currentBillValue),

											navigation.setParams({ bill: false, players: true }),
											console.log(route.params),
										];
									}}
									disabled={disableNextButton}
								>
									<Text style={{ color: '#fff', fontFamily: 'Montserrat_700Bold', fontSize: 20 }}>
										Next
									</Text>
								</Button>
								<Button
									style={styles.BackButton}
									onPress={() => {
										return navigation.navigate('Home');
									}}
								>
									<Text
										style={{
											color: '#000',
											fontFamily: 'Montserrat_700Bold',
											fontSize: 12,
										}}
									>
										Back
									</Text>
								</Button>
							</View>
						)}
					</ScrollView>
				</KeyboardAvoidingView>
				{route.params.players && (
					<View style={styles.rootContainer}>
						<Button onPress={() => navigation.setParams({ bill: true, players: false })}>
							Back
						</Button>
						<TextInput
							ref={playerInputRef}
							label={labelForPlayers}
							placeholder='Erik'
							//autoFocus={true}
							onChangeText={e => {
								setGetplayersFromInput(e);
							}}
							onSubmitEditing={() => {
								return [setPlayerArray([...playerArray, getPlayersFromInput]), clearText()];
							}}
							value={getPlayersFromInput}
							disabled={disablePlayerTextInput}
						></TextInput>
						<Button
							onPress={() => {
								return [
									console.log(playerNumberCount),
									setPlayerArray([...playerArray, getPlayersFromInput]),
									clearText(),
									setPlayerNumberCount(playerArray.length + 1),
								];
							}}
							returnKeyType='next'
							disabled={disablePlayerTextInput}
						>
							Add
						</Button>
						<Button
							disabled={disableButton}
							onPress={() => {
								return [submitAllPlayers(), navigation.navigate('Chicken')];
							}}
						>
							Done
						</Button>
						<View>{playerArray.length !== 0 && renderPlayers()}</View>
						<Ads />
					</View>
				)}
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
	BillAmountText: {
		color: '#FF5757',
		fontFamily: 'Montserrat_700Bold',
		fontSize: 37,
		marginTop: 0,
		marginBottom: 40,
	},

	BillInput: {
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
		backgroundColor: '#FF5757',

		borderRadius: 40,
		width: '60%',
	},

	BackButton: {
		marginTop: 25,
	},
});
