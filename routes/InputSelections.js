import React, { useState, useEffect, useContext, useRef } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Context from '../Context';

export default function BillAmount({ route, navigation }) {
	//UseContext
	const { billValue, setBillValue } = useContext(Context);
	const { setAllPlayerNames } = useContext(Context);
	const { riskyLevel } = useContext(Context);

	//? Variables

	const [getPlayersFromInput, setGetplayersFromInput] = useState('');
	const [playerArray, setPlayerArray] = useState([]);
	const [playerNumberCount, setPlayerNumberCount] = useState(1);

	const [billValidation, setBillValidation] = useState(false);
	const [currentBillValue, setCurrentBillValue] = useState('');

	const { bill } = route.params;

	//? Not getting this to work?
	//const addButton = useRef();
	//useEffect(() => {
	//	console.log(addButton);
	//}, []);

	//! Functions

	useEffect(() => {
		console.log(playerArray);
		setPlayerNumberCount(playerArray.length + 1);
	}, [playerArray]);

	function renderPlayers() {
		return [
			playerArray.map((players, i) => {
				console.log('Players and number count:', players, playerNumberCount);
				return (
					<View key={players + i}>
						<Text>{players}</Text>
						<Button mode='contained' onPress={() => removePlayer(players, i)}>
							Remove
						</Button>
					</View>
				);
			}),
		];
	}

	function removePlayer(playerToRemove, indexToRemove) {
		return setPlayerArray(
			playerArray.filter(player => {
				return player !== playerToRemove;
			})
		);
	}

	function submitAllPlayers() {
		setAllPlayerNames(playerArray);
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

							if (regex.test(e)) {
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
					<TextInput
						label={`Enter player ${playerNumberCount} name`}
						placeholder='Erik'
						onChangeText={e => {
							setGetplayersFromInput(e);
						}}
						value={getPlayersFromInput}
					></TextInput>
					<Button
						onPress={() => {
							return [
								//setPlayerNumberCount(playerNumberCount + 1),
								console.log(playerNumberCount),
								setPlayerArray([...playerArray, getPlayersFromInput]),
							];
						}}
						returnKeyType='next'
					>
						Add
					</Button>
					<Button
						onPress={() => {
							return [submitAllPlayers(), navigation.navigate('Chicken')];
						}}
					>
						Done
					</Button>
					<View>{playerArray.length !== 0 && renderPlayers()}</View>
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
