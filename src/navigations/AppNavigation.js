import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/Home/HomeScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import RecipeScreen from '../screens/Recipe/RecipeScreen';
import RecipesListScreen from '../screens/RecipesList/RecipesListScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import IngredientScreen from '../screens/Ingredient/IngredientScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import IngredientsDetailsScreen from '../screens/IngredientsDetails/IngredientsDetailsScreen';


const Tab = createBottomTabNavigator();


const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Cuisines: CategoriesScreen,
    Recipe: RecipeScreen,
    RecipesList: RecipesListScreen,
    Ingredient: IngredientScreen,
    Search: SearchScreen,
    IngredientsDetails: IngredientsDetailsScreen
  },
  {
    initialRouteName: 'Home',
    defaulfNavigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        backgroundcolor: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
      }
    })
  }
);


const DrawerStack = createDrawerNavigator(
  {
    Main: MainNavigator
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'Main',
    drawerWidth: 250,
    contentComponent: DrawerContainer
  }
);


export default AppContainer = createAppContainer(DrawerStack);

console.disableYellowBox = true;