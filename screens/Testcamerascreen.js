import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera'; // ✅ Correct import

export default function TestCameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) return <Text>Requesting permission...</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      <Camera style={StyleSheet.absoluteFillObject} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
