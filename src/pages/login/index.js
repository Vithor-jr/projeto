import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  Modal
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../login/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Componente de Mensagem de Erro
const ErrorMessage = ({ message, onClose }) => (
  <Modal
    transparent
    animationType="slide"
    visible={!!message}
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.errorIconContainer}>
          <Icon name="exclamation-circle" size={30} color="red" />
        </View>
        <Text style={styles.modalText}>{message}</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.modalButton}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);


export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    const regexEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  
    try {
      setError(''); // Limpa qualquer mensagem de erro anterior
  
      if (!email || !senha) {
        setError('Por favor, preencha todos os campos.');
      } else if (!regexEmail.test(email)) {
        setError('Preencha com um email válido.');
      } else if (senha.length < 8) {
        setError('A senha deve ter pelo menos 8 caracteres.');
      } else {
        console.log('Enviando dados para o servidor...');
  
        const response = await axios.post('http://192.168.1.8:3000/login', {
          email: email,
          password: senha,
        });
  
        console.log('Resposta do servidor:', response.data);
  
        if (response.status === 200) {
          await AsyncStorage.setItem('access_token', response.data.access_token);
          console.log('Login bem-sucedido! Token salvo:', response.data.access_token);
  
          // Se estiver usando navegação, navegue para a próxima tela
          // navigation.navigate('ProximaTela');
        }
      }
    } catch (error) {
      console.log('Erro na requisição ao servidor:', error);
      console.log('Detalhes do erro:', error.message);
  
      if (error.response) {
        // O servidor retornou uma resposta com um status diferente de 2xx
        if (error.response.status === 401) {
          setError('Email ou senha incorretos.\nPor favor, tente novamente.');
        } else {
          setError('Erro no servidor. Por favor, aguarde e tente novamente.');
        }
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta do servidor
        console.log('Sem resposta do servidor:', error.request);
        setError('Sem resposta do servidor. Por favor, tente novamente.');
      } else {
        // Alguma outra coisa aconteceu
        console.log('Erro inesperado:', error.message);
        setError('Erro inesperado. Por favor, aguarde e tente novamente.');
      }
    }
  };
  

  return (
    <View style={styles.containerDad}>
      <View style={styles.container}>
        <KeyboardAwareScrollView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.frame}>
            <View style={{ paddingHorizontal: 10, marginTop: '5%' }}>
              <Image style={{ width: 160, height: 140 }} source={require('../login/login.png')} />
              <Text style={styles.title}>Login</Text>
              <Text style={styles.subtitle}>Entre na sua conta cadastrada.</Text>
            </View>
            {/* Criando Inputs */}
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <View style={{ width: 200 }}>
                <Text style={styles.textInput}>E-mail: </Text>
              </View>
            </View>

            <TextInput
              style={styles.inputLogin}
              placeholder="xxxx123@gmail.com"
              keyboardType="email-address"
              placeholderTextColor="rgba(0, 0, 0, 0.4)"
              value={email}
              onChangeText={setEmail}
            />

            {/* Criando Inputs */}
            <View style={{ alignItems: 'center', marginTop: 30 }}>
              <View style={{ width: 200 }}>
                <Text style={styles.textInput}>Senha :</Text>
              </View>
            </View>

            <View style={styles.inputLogin}>
              <TextInput
                style={{ width: '95%' }}
                placeholder="• • • • • • • •"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                secureTextEntry={!isPasswordVisible}
                value={senha}
                onChangeText={setSenha}
              />

              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Icon name={isPasswordVisible ? 'eye' : 'eye-slash'} size={20} color="rgba(0, 0, 0, 0.5)" />
              </TouchableOpacity>
            </View>

            <View style={{ width: '70%', alignItems: 'flex-end' }}>
              <TouchableOpacity style={{ alignItems: 'center', marginTop: '5%', gap: 1 }} onPress={() => navigation.navigate('Request')}>
                <Text style={{ fontFamily: 'Varela-Round', fontSize: 13 }}>Esqueceu a senha?</Text>
                <View style={{ width: 110, height: 2, backgroundColor: '#FF7300', borderRadius: 10 }}></View>
              </TouchableOpacity>
            </View>

            {error && <ErrorMessage message={error} onClose={() => setError('')} />}

            <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
              <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>

            <View style={{ width: '51%', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 12, color: '#3B267B', fontFamily: 'Varela-Round' }}>Não possui uma conta?</Text>
              <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('Create')}>
                <Text style={{ fontSize: 12, fontFamily: 'Varela-Round' }}>entre aqui</Text>
                <View style={{ width: 60, height: 1.5, backgroundColor: '#FF7300', borderRadius: 100 }}></View>
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', marginTop: 30 }}>
              <Text style={{ fontSize: 12, color: '#3B267B', fontFamily: 'Varela-Round' }}>Ou entre também</Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}