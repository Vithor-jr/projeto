import React, { useEffect, useState} from 'react';
import { Button, Platform, StyleSheet, Text, View} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  // Endpoint
  const discovery = useAutoDiscovery('https://accounts.google.com');
  
  // Restante do seu código...
  
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '390080111384-162hu0li9ghnda7hhbomd8piu1tqig9k.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      redirectUri: makeRedirectUri({
        native: 'studus:/redirect',
        useProxy: Platform.select({ web: true, default: false }),
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response && response.type === 'success') {
      const { access_token } = response.params;
      console.log('Token de acesso:', access_token);
    }
  }, [response]);

  const [userData, setUserData] = useState(null);

  const logIn = async () => {
    try {
      // Substitua 'FACEBOOK_APP_ID' pelo seu próprio ID de aplicativo do Facebook
      const redirectUrl = `https://www.facebook.com/v13.0/dialog/oauth?client_id=FACEBOOK_APP_ID&redirect_uri=https://www.facebook.com/connect/login_success.html&scope=email,public_profile&response_type=token`;
      const { data } = await axios.get(redirectUrl);
      setUserData(data);
    } catch (error) {
      console.log('Falha no login', error);
    }
  };

  return (
    <View style={styles.container}>
        <Button
        disabled={!request}
        title="Login com Google"
        onPress={() => {
          promptAsync();
        }}
      />

        <Button title="Entrar com Facebook" onPress={logIn} />
        {userData && <Text>Bem-vindo, {userData.name}!</Text>}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
