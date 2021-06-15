import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Context from '../Context';

export default function BillAmount({ route, navigation }) {
	//UseContext
	const { billValue, setBillValue } = useContext(Context);

	//? Variables

	const [gamblePlayers, setGamblePlayers] = useState([]);

	const [billValidation, setBillValidation] = useState(false);
	const [currentBillValue, setCurrentBillValue] = useState(null);

	const { risky, bill } = route.params;

	//! Functions
	const [renderAPlayer, setRenderAPlayer] = useState(null);
	function renderPlayers() {
		gamblePlayers;
		gamblePlayers.map(player => {
			return <Text>{player}</Text>;
		});
	}

	return (
		<View style={styles.container}>
			{risky ? (
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
					></TextInput>
					<Button
						onPress={() => {
							return [
								setBillValue(currentBillValue),
								//setWhichPage(() => ({
								//	bill: false,
								//	players: true,
								//	chicken: false,
								//})),
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
						label={`Enter player ${1} name`}
						placeholder='Erik'
						onChangeText={e => {
							setGamblePlayers(prev => [...prev, e]);
						}}
					></TextInput>
					<Button onPress>Add</Button>
					<Button>Done</Button>
					<View>
						<Text>{renderAPlayer}</Text>
					</View>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({});
