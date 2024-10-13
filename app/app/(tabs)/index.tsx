import React, { useState } from 'react';
import { Image, StyleSheet, Platform, TouchableOpacity, ScrollView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import DocumentPicker from 'react-native-document-picker';

// New component to display JSON response
const JsonDisplay = ({ data }: {data: any}) => {
  return (
    <ThemedView style={styles.codeContainer}>
      <ScrollView horizontal>
        <ThemedText style={styles.codeText}>
          {JSON.stringify(data, null, 2)}
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
};

export default function HomeScreen() {
  const [uploadStatus, setUploadStatus] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleFileUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const file = res[0];
      setUploadStatus('Uploading...');

      const formData = new FormData();
      formData.append('file', file);
      formData.append('bank', 'bancoEstado');

      const response = await fetch('http://10.0.2.2:3000/statement/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setUploadStatus('File uploaded successfully!');
      setResponseData(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setUploadStatus('File selection cancelled');
      } else {
        setUploadStatus(`Error uploading file: ${err}`);
      }
      setResponseData(null);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedText>Hola Hola</ThemedText>
      <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
        <ThemedText style={styles.uploadButtonText}>Upload File</ThemedText>
      </TouchableOpacity>
      {uploadStatus ? <ThemedText style={styles.statusText}>{uploadStatus}</ThemedText> : null}
      {responseData && <JsonDisplay data={responseData} />}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  statusText: {
    marginTop: 10,
    textAlign: 'center',
  },
  codeContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 12,
  },
});