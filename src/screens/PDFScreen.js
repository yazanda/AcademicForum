import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function PDFScreen({ route }) {
  const { uri } = route;
  const uriString = String(uri);

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: uriString }} style={{ flex: 1 }} />
    </View>
  );
}
