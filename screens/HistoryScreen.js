import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { supabase } from '../supabase';

export default function HistoryScreen() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScans = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error getting user:", userError.message);
        setLoading(false);
        return;
      }

      const userEmail = userData?.user?.email;
      console.log("Logged-in user's email:", userEmail);

      if (!userEmail) {
        setScans([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('scans') // Table name is case-sensitive in Supabase
        .select('*')
        .eq('user_email', userEmail)
        .order('timestamp', { ascending: false });

      if (error) {
        console.error('Error fetching scans:', error.message);
        setScans([]);
      } else {
        console.log("Fetched scans:", data);
        setScans(data);
      }

      setLoading(false);
    };

    fetchScans();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (scans.length === 0) return <Text>No scans yet</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={scans}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>📄 {item.scanned_text}</Text>
            <Text style={styles.subText}>🕒 {new Date(item.timestamp).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10
  },
  text: {
    fontSize: 16
  },
  subText: {
    fontSize: 12,
    color: 'gray'
  }
});