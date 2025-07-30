import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { supabase } from '../supabase';

const HomeScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
      } else {
        navigation.replace('Login');
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome 👋</Text>
      <Text style={styles.email}>{userEmail}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Scan QR Code" onPress={() => navigation.navigate('Scan')} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="View Scan History" onPress={() => navigation.navigate('History')} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Logout" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10
  },
  email: {
    fontSize: 16,
    marginBottom: 30,
    color: '#555'
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%'
  }
});
