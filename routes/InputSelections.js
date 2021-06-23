import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Context from '../Context';
import Ads from '../components/Ads';

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
					if (indexToRemove === index && playerToRemove === player) {
						console.log(indexToRemove, index, playerToRemove, player);
						return index !== indexToRemove;
					}
					return playerToRemove === player;
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

	return (
		<View style={styles.container}>
			{riskyLevel ? (
				<View id='Banner-Risky' style={{ backgroundColor: 'red', height: '15%' }}>
					<Text style={{ color: 'white', textAlign: 'center' }}>Risk Level: High</Text>
				</View>
			) : (
				<View id='Banner-Risky' style={{ backgroundColor: 'green', height: '15%' }}>
					<Text style={{ color: 'white', textAlign: 'center' }}>Risk Level: Normal</Text>
				</View>
			)}

			{/*Bill amount*/}

			{bill && (
				<View>
					<TextInput
						label='Enter Bill Amount'
						placeholder='500'
						keyboardType='number-pad'
						onChangeText={e => {
							const regex = new RegExp(/^[0-9\b]+$/);

							if (regex.test(e) || e === '') {
								setCurrentBillValue(e);
								setBillValidation(false);
							} else {
								setBillValidation(true);
							}
						}}
						error={billValidation}
						value={currentBillValue}
					></TextInput>
					<Button
						onPress={() => {
							return [
								setBillValue(currentBillValue),

								navigation.setParams({ bill: false, players: true }),
								console.log(route.params),
							];
						}}
						disabled={billValidation}
					>
						Next
					</Button>
					<Text>{billValue}</Text>
				</View>
			)}
			{route.params.players && (
				<View id=''>
					<Button onPress={() => navigation.setParams({ bill: true, players: false })}>Back</Button>
					<TextInput
						ref={playerInputRef}
						label={labelForPlayers}
						placeholder='Erik'
						autoFocus={true}
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
		</View>
	);
}

const styles = StyleSheet.create({
	removeButton: {
		backgroundColor: 'red',
	},
});
