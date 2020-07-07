
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';

export default function App() {
  return (
    <AppContainer />
  );
}



// import React from 'react';
// import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
// import AppContainer from './src/navigations/AppNavigation';
// import * as Facebook from 'expo-facebook';

// export default function App() {


//   async function logIn() {
//     try {
//       await Facebook.initializeAsync('2753963464882148');
//       const {
//         type,
//         token,
//         expires,
//         permissions,
//         declinedPermissions,
//       } = await Facebook.logInWithReadPermissionsAsync({
//         permissions: ['public_profile'],
//       });
//       if (type === 'success') {
//         // Get the user's name using Facebook's Graph API
//         const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
//         Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
//       } else {
//         // type === 'cancel'
//       }
//     } catch ({ message }) {
//       alert(`Facebook Login Error: ${message}`);
//     }
//   }

//   return (
//     <>
//       <SafeAreaView>
//         <Button
//           onPress={logIn} title="Learn More"
//         />
//       </SafeAreaView>
//     </>
//   )
// }