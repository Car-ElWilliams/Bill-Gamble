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
	Dimensions,
	r,
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

	const [billValidation, setBillValidation] = useState(false);
	const [currentBillValue, setCurrentBillValue] = useState('');

	const { bill } = route.params;

	const [disableNextButton, setDisableNextButton] = useState(true);

	//! Functions

	useEffect(() => {
		enableNextButton();
	}, [currentBillValue]);

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
									return [setBillValue(currentBillValue), navigation.navigate('Players')];
								}}
								disabled={disableNextButton}
								labelStyle={styles.NextButtonInnerText}
							>
								<Text>Next</Text>
							</Button>

							<Button
								onPress={() => {
									return navigation.navigate('Home');
								}}
								labelStyle={styles.BackButtonText}
								style={styles.BackButton}
							>
								<Text>Back</Text>
							</Button>
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
//const windowHeight = Dimensions.get('screen').height;

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

	KeyboardAvoidingView: {
		backgroundColor: '#fff',
		flex: -1,
	},

	SafeAreaView: {
		marginHorizontal: 0,
	},

	RecieptSVGContainer: {
		width: '100%',
		maxWidth: '52.5%',
		minHeight: '25%',
		maxHeight: '30%',
		backgroundColor: 'green',
		backgroundColor: '#fff',
		marginTop: 15.5,
		marginBottom: 15.5,
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
		backgroundColor: '#FF5757',
		borderRadius: 40,
		width: '60%',
	},

	NextButtonInnerText: {
		color: '#fff',
		fontFamily: 'Montserrat_700Bold',
		fontSize: 20,
		padding: 5,
	},

	BackButton: {
		marginTop: 25,
	},

	BackButtonText: {
		color: '#000',
		fontFamily: 'Montserrat_700Bold',
		fontSize: 12,
	},
});
