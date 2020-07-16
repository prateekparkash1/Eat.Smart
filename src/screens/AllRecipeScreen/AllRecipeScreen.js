import React from 'react';
import {
    FlatList,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

import styles from './styles';
import Recipes from '../../components/Recipes/Recipes';

export default class AllRecipeScreen extends React.Component {

    static navigationOptions = {
        title: 'All Recipes',
    };

    render() {
        return (
            <Recipes />
        )
    }
}
