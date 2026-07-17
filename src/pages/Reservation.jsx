import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function ReservationScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [adresse, setAdresse] = useState('');
  const [loading, setLoading] = useState(false);

  const prestations = [
    { emoji: '🚿', titre: 'Lavage exterieur', prix: '3 000 FCFA' },
    { emoji: '🪑', titre: 'Sieges & Interieur', prix: '6 000 FCFA' },
    { emoji: '✨', titre: 'Polissage', prix: '20 000 FCFA' },
    { emoji: '🌿', titre: 'Eco sans eau', prix: '4 000 FCFA' },
  ];

  const confirmerReservation = async () => {
    if (!adresse) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://cleanfix-backend.onrender.com/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prestation: prestations[selectedIndex].titre,
          adresse,
          date: "Aujourd'hui",
          utilisateur_id: JSON.parse(localStorage.getItem('utilisateur') || '{}').id
        })
      });
      if (response.ok) {
        Alert.alert('Reservation confirmee !', 'Votre prestataire arrive dans 12 minutes', [
          { text: 'Suivre', onPress: () => router.push('/suivi') }
        ]);
      } else {
        const data = await response.json();
        Alert.alert('Erreur serveur', JSON.stringify(data));
      }
    } catch (error) {
      Alert.alert('Erreur', String(error));
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Reserver un service</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Choisissez votre prestation</Text>

        {prestations.map((p, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedIndex(index)}
            style={[
              styles.prestationRow,
              selectedIndex === index && styles.prestationRowSelected
            ]}
          >
            <Text style={styles.prestationText}>{p.emoji} {p.titre}</Text>
            <Text style={styles.prestationPrice}>{p.prix}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Adresse d'intervention</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Cocody, Rue des Jardins..."
          placeholderTextColor="#AAAAAA"
          value={adresse}
          onChangeText={setAdresse}
        />

        <Text style={styles.sectionTitle}>Date et heure</Text>
        <TextInput
          style={styles.input}
          defaultValue="Aujourd'hui - 14h00"
        />

        <TouchableOpacity
          style={[styles.confirmButton, loading && { opacity: 0.6 }]}
          onPress={confirmerReservation}
          disabled={loading}
        >
          <Text style={styles.confirmButtonText}>
            {loading ? 'Envoi...' : 'Confirmer la reservation'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FC' },
  header: { backgroundColor: '#1B4F8A', padding: 20, paddingTop: 50, alignItems: 'center' },
  headerText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  content: { padding: 20 },
  sectionTitle: { color: '#1B4F8A', fontWeight: 'bold', fontSize: 16, marginTop: 15, marginBottom: 10 },
  prestationRow: { backgroundColor: 'white', borderWidth: 1, borderColor: '#eee', borderRadius: 10, padding: 15, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  prestationRowSelected: { backgroundColor: '#E8F0FB', borderColor: '#1B4F8A', borderWidth: 2 },
  prestationText: { fontSize: 14, color: '#333' },
  prestationPrice: { color: '#1B4F8A', fontWeight: 'bold' },
  input: { backgroundColor: 'white', borderWidth: 1, borderColor: '#CCC', borderRadius: 10, padding: 14, fontSize: 14, marginBottom: 5 },
  confirmButton: { backgroundColor: '#1B4F8A', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 25, marginBottom: 30 },
  confirmButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});