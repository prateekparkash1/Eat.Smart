import React, { useState } from "react";
import { View, Switch, StyleSheet, Text } from "react-native";
import styles from './styles';

export default class SwitchButton extends React.Component {

    // const [isEnabled, setIsEnabled] = useState(false);
    constructor(props) {
        super(props);
        this.state = {
            isEnabled: false
        }
    }

    toggleSwitch = () => {
        this.setState(state => ({
            isEnabled: !state.isEnabled,
        }));

        this.props.data.changerecipe(this.state.isEnabled);

    }

    render() {
        return (
            <View style={styles.container}>
                <Switch
                    trackColor={{ false: "#767577", true: "#9AD93D" }}
                    thumbColor={this.state.isEnabled ? "#fff" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={this.toggleSwitch}
                    value={this.state.isEnabled}
                />
            </View>
        );

    }
}