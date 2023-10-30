// web 659144706918-l25bkdrh4c6smsm0a4ngeraqevg7t1ga.apps.googleusercontent.com
// ios 659144706918-guruvft7gt7m8n3l2pu3gh16t1fd9bo2.apps.googleusercontent.com
// android 659144706918-68bdofvplfmrp16gg8s9g0mk4mjgigms.apps.googleusercontent.com


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-web';
WebBrowser.maybeCompleteAuthSession();
export default function App() {
  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
webClientId: "659144706918-l25bkdrh4c6smsm0a4ngeraqevg7t1ga.apps.googleusercontent.com",
iosClientId: "659144706918-guruvft7gt7m8n3l2pu3gh16t1fd9bo2.apps.googleusercontent.com",
androidClientId: "659144706918-68bdofvplfmrp16gg8s9g0mk4mjgigms.apps.googleusercontent.com"

  });
React.useEffect(() => {
  handleSignInwithGoogle();
}, [response]);
async function handleSignInwithGoogle() {
  const user = await AsyncStorage.getItem("@user");
  if(!user) {
    if(response?.type === "success") {
      await getUserInfo(response.authentication.accessToken);
    }
  }else {
    setUserInfo(JSON.parse(user));
  }
}
const getUserInfo = async (token) => {
  if(!token) return;
  try {
    const response = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: {Authorization: `Bearer ${token}`}
      }
    );
    const user = await response.json();
    await AsyncStorage.setItem("@user", JSON.stringify(user));
    setUserInfo(user);
  } catch(error) {

  }
}
const handleDeleteLocalStorage = async () => {
  try {
    await AsyncStorage.removeItem("@user");
    setUserInfo(null);
  } catch (error) {
    console.log("Error deleting from local storage:", error);
  }
};
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{JSON.stringify(userInfo, null, 2)}</Text>
      <Button title="Signin with Google" onPress={promptAsync} />
      <Button title="Signout" onPress={handleDeleteLocalStorage} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
