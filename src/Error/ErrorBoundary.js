import React, {Component} from 'react';
import {View, Text} from 'react-native';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = {hasError: false};
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return {hasError: true};
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		logErrorToMyService(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<View styl={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<Text>Something Went Wrong! Come back again!</Text>
				</View>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
