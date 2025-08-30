import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { Button, Card, Title, Text, useTheme, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useCharacter } from '../contexts/CharacterContext';

const CharacterSelectScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const theme = useTheme();
  const navigation = useNavigation();
  const { 
    characters, 
    isLoading, 
    searchCharacters, 
    selectCharacter,
    error 
  } = useCharacter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        searchCharacters(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectCharacter = async () => {
    if (!selectedCharacter) return;
    
    setIsSubmitting(true);
    try {
      await selectCharacter(selectedCharacter);
      // Navigation to Home will be handled by the AuthProvider
    } catch (error) {
      console.error('Failed to select character:', error);
      // Handle error (show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCharacterItem = ({ item }: { item: any }) => (
    <Card
      style={[
        styles.characterCard,
        selectedCharacter?.url === item.url && { 
          borderColor: theme.colors.primary,
          borderWidth: 2,
        },
      ]}
      onPress={() => setSelectedCharacter(item)}
    >
      <Card.Content>
        <Title style={styles.characterName}>{item.name}</Title>
        <Text>Birth Year: {item.birth_year}</Text>
        <Text>Gender: {item.gender}</Text>
        <Text>Height: {item.height} cm</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={[styles.title, { color: theme.colors.primary }]}>
          Choose Your Character
        </Title>
        <Text style={styles.subtitle}>
          Search and select your favorite Star Wars character
        </Text>
      </View>

      <Searchbar
        placeholder="Search for a character..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        placeholderTextColor="#9E9E9E"
        iconColor={theme.colors.primary}
        inputStyle={{ color: '#FFFFFF' }}
      />

      {error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : isLoading && searchQuery ? (
        <View style={styles.centered}>
          <ActivityIndicator animating={true} color={theme.colors.primary} />
          <Text style={styles.loadingText}>Searching the galaxy...</Text>
        </View>
      ) : characters.length > 0 ? (
        <FlatList
          data={characters}
          renderItem={renderCharacterItem}
          keyExtractor={(item) => item.url}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : searchQuery ? (
        <View style={styles.centered}>
          <Text style={styles.noResultsText}>No characters found. Try another search.</Text>
        </View>
      ) : (
        <View style={styles.centered}>
          <Text style={styles.hintText}>
            Enter a character's name in the search bar above
          </Text>
        </View>
      )}

      <Button
        mode="contained"
        onPress={handleSelectCharacter}
        style={styles.selectButton}
        disabled={!selectedCharacter || isSubmitting}
        loading={isSubmitting}
        icon="check"
      >
        {selectedCharacter 
          ? `Select ${selectedCharacter.name}` 
          : 'Select a Character'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#9E9E9E',
    textAlign: 'center',
    marginBottom: 16,
  },
  searchBar: {
    marginBottom: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
  },
  listContent: {
    paddingBottom: 100, // To make space for the select button
  },
  characterCard: {
    marginBottom: 12,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
  },
  characterName: {
    color: '#FFE81F',
    fontSize: 18,
    marginBottom: 8,
  },
  selectButton: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    paddingVertical: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    color: '#9E9E9E',
  },
  noResultsText: {
    color: '#9E9E9E',
    textAlign: 'center',
  },
  hintText: {
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  errorText: {
    color: '#CF6679',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default CharacterSelectScreen;
