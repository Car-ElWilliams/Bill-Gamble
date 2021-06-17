import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function Chicken({ navigation }) {
	return (
		<View style={styles.HomeContainer}>
			<Button onPress={() => navigation.navigate('Results')}>Let's go</Button>
			<Button onPress={() => navigation.navigate('Home')}>Chicken out🐔</Button>
		</View>
	);
}

const styles = StyleSheet.create({});
