import React, { useRef, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import BpWidget from './src/BpWidget';
import BpIncomingMessagesListener from './src/BpIncomingMessagesListener';

const botConfig = {
  botId: 'your-bot-id',
  hostUrl: 'https://your-bot-host-url',
  messagingUrl: 'https://your-bot-messaging-url',
  clientId: 'your-bot-client-id',
};

function Chat() {
  const bpWidgetRef = useRef();
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (bpWidgetRef.current && inputText) {
      bpWidgetRef.current.sendPayload({ type: 'text', text: inputText });
      setInputText('');
    }
  };

  return (
    <View>
      <BpIncomingMessagesListener
        botConfig={botConfig}
        onMessage={(message) => console.log('Received message:', message)}
      />
      <BpWidget ref={bpWidgetRef} botConfig={botConfig} />
      <TextInput
        value={inputText}
        onChangeText={setInputText}
        placeholder="Digite sua mensagem aqui"
      />
      <Button title="Enviar" onPress={handleSend} />
    </View>
  );
}

export default Chat;
