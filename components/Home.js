import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground, Animated } from 'react-native';
import { Button } from 'react-native-paper';
import Context from '../Context';

export default function Home(props) {
	return (
		<View style={styles.HomeContainer}>
			<Text style={styles.Header}>Choose Risk Level</Text>
			<Button mode='contained' color='green'>
				Normal
			</Button>
			<Text>Chances of splitting the bill equally is higher</Text>

			<Button mode='contained' color='red'>
				Risky
			</Button>
			<Text>For the greedy and the brave</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	HomeContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	},
	Header: {
		fontSize: 50,
	},
});
