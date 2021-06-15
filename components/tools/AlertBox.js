import React from 'react';
import { Dialog, Portal, Paragraph, Button } from 'react-native-paper';

export default function AlertBox() {
	const [visible, setVisible] = React.useState(true);

	const hideDialog = () => setVisible(false);

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={hideDialog}>
				<Dialog.Title>Field can not be empty</Dialog.Title>
				<Dialog.Content>{/*<Paragraph>Please enter a numeric number</Paragraph>*/}</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={hideDialog}>Done</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}
