import React, { useState } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { supabase } from "../supabase";

export default function ScanScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");

  if (!permission) {
    // Permission is still loading
    return <Text>Loading camera permissions...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>No access to camera</Text>
        <Button title="Grant Camera Permission" onPress={requestPermission} />
      </View>
    );
  }

  const handleBarCodeScanned = async ({ data }) => {
    if (scanned) return;

    setScanned(true);
    setScannedData(data);

    const { data: userData } = await supabase.auth.getUser();
    const userEmail = userData?.user?.email;

    if (!userEmail) {
      Alert.alert("Error", "User not logged in");
      navigation.replace("Login");
      return;
    }

    const { error } = await supabase.from("scans").insert([
      {
        user_email: userEmail,
        scanned_text: data,
        timestamp: new Date().toISOString(),
      },
    ]);

    if (error) {
      Alert.alert("Error saving to Supabase", error.message);
    } else {
      Alert.alert("Success", `Saved: ${data}`);

      navigation.navigate("History");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!scanned ? (
        <CameraView
          style={{ flex: 1 }}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={handleBarCodeScanned}
        />
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Scanned: {scannedData}</Text>
          <Button title="Scan Again" onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    position: "absolute",
    top: "40%",
    left: "10%",
    right: "10%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 4,
  },
  result: {
    fontSize: 16,
    marginBottom: 10,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
