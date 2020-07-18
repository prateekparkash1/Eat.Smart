import React from 'react';
import {
    FlatList,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import SwitchButton from '../../components/SwitchButton/SwitchButton'
import styles from './styles';


export default class AllRecipeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            loading: true,
            categories: [],
            cat_loading: true,
            unit: false,
            type: ''
        }
    }

    static navigationOptions = {
        title: 'All Recipes',
    };

    async componentDidMount() {
        try {
            const recipesApiCall = await fetch('https://pacific-coast-24914.herokuapp.com/recipes');
            const recipesapi = await recipesApiCall.json();
            this.setState({ recipes: recipesapi, loading: false });
            const categoriesApiCall = await fetch('https://pacific-coast-24914.herokuapp.com/categories');
            const categoriesapi = await categoriesApiCall.json();
            this.setState({ categories: categoriesapi, cat_loading: false });

        } catch (err) {
            console.log("Error fetching data-----------", err);
        }
    }


    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    changerecipe(item) {
        this.setState({ unit: item })
    }


    getRecipes(categoryId) {
        const recipesArray = [];
        this.state.recipes.map(data => {
            if (data.categoryId == categoryId) {
                recipesArray.push(data);
            }
        });
        return recipesArray;
    }

    getCategoryName(categoryId) {
        let name;
        this.state.categories.map(data => {
            if (data.id == categoryId) {
                name = data.name;
            }
        });
        return name;
    }

    onPressRecipe = item => {
        this.props.navigation.navigate('Recipe', { item });
    };

    renderRecipes = ({ item }) => (
        <TouchableOpacity activeOpacity='0.5' onPress={() => this.onPressRecipe(item)}>
            <View style={styles.container}>
                <Image style={styles.photo} source={{ uri: item.photo_url }} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.category}>{this.getCategoryName(item.categoryId)}</Text>
            </View>
        </TouchableOpacity>
    );

    render() {
        return (
            <View>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 10 }}>
                    <Text>Non Veg</Text>
                    < SwitchButton data={{
                        unit: this.state.unit, changerecipe: this.changerecipe.bind(this)
                    }} />
                </View>
                <FlatList
                    vertical
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={this.shuffle(this.state.recipes
                        .filter(recipe => recipe.veg_filter === this.state.unit).filter(recipe => recipe.meal_type === this.props.navigation.state.params.item))
                    }
                    renderItem={this.renderRecipes}
                    keyExtractor={item => `${item.recipeId}`}
                />
            </View>
        );
    }
}
