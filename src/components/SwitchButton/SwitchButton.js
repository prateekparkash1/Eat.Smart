import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";
import styles from './styles';

export default function SwitchButton() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.container}>
            <Switch
                trackColor={{ false: "#767577", true: "#9AD93D" }}
                thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}


            />
        </View>
    );
}