import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Searchbar, Card, Title, Text, Button, useTheme, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useCharacter } from '../contexts/CharacterContext';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const navigation = useNavigation();
  const { 
    characters, 
    isLoading, 
    searchCharacters, 
    selectCharacter, 
    selectedCharacter 
  } = useCharacter();
  const [selectedChar, setSelectedChar] = useState<any>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      searchCharacters(query);
    }
  };

  const handleCharacterSelect = async (character: any) => {
    setSelectedChar(character);
  };

  const handleSaveCharacter = async () => {
    if (!selectedChar) return;
    
    try {
      await selectCharacter(selectedChar);
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save character:', error);
    }
  };

  const renderCharacterItem = ({ item }: { item: any }) => (
    <Card
      style={[
        styles.characterCard,
        selectedChar?.url === item.url && { 
          borderColor: theme.colors.primary,
          borderWidth: 2,
        },
      ]}
      onPress={() => handleCharacterSelect(item)}
    >
      <Card.Content style={styles.characterContent}>
        <View style={styles.characterHeader}>
          <Avatar.Text 
            size={50} 
            label={item.name.split(' ').map(n => n[0]).join('').toUpperCase()} 
            style={styles.avatar}
            color="#000"
          />
          <View style={styles.characterInfo}>
            <Title style={styles.characterName}>{item.name}</Title>
            <Text>{item.birth_year} • {item.gender}</Text>
          </View>
        </View>
        
        <View style={styles.characterDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Height</Text>
            <Text style={styles.detailValue}>{item.height} cm</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Mass</Text>
            <Text style={styles.detailValue}>{item.mass} kg</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Hair</Text>
            <Text style={styles.detailValue}>
              {item.hair_color.charAt(0).toUpperCase() + item.hair_color.slice(1)}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={[styles.title, { color: theme.colors.primary }]}>
          Search Characters
        </Title>
        <Searchbar
          placeholder="Search for a character..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
          placeholderTextColor="#9E9E9E"
          iconColor={theme.colors.primary}
          inputStyle={{ color: '#FFFFFF' }}
        />
      </View>

      {isLoading && searchQuery ? (
        <View style={styles.centered}>
          <ActivityIndicator animating={true} color={theme.colors.primary} size="large" />
          <Text style={styles.loadingText}>Searching the galaxy...</Text>
        </View>
      ) : characters.length > 0 ? (
        <FlatList
          data={characters}
          renderItem={renderCharacterItem}
          keyExtractor={(item) => item.url}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={selectedChar && (
            <Button 
              mode="contained" 
              onPress={handleSaveCharacter}
              style={styles.saveButton}
              icon="content-save"
            >
              {selectedChar === selectedCharacter 
                ? 'Already Selected' 
                : 'Select This Character'}
            </Button>
          )}
        />
      ) : searchQuery ? (
        <View style={styles.centered}>
          <Text style={styles.noResultsText}>No characters found</Text>
          <Text style={styles.hintText}>Try a different search term</Text>
        </View>
      ) : (
        <View style={styles.centered}>
          <Text style={styles.hintText}>
            Use the search bar above to find Star Wars characters
          </Text>
          <Text style={[styles.hintText, { marginTop: 8 }]}>
            Try searching for "Skywalker", "Vader", or "Leia"
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 16,
    backgroundColor: '#121212',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  characterCard: {
    marginBottom: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    overflow: 'hidden',
  },
  characterContent: {
    padding: 0,
  },
  characterHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  avatar: {
    marginRight: 16,
    backgroundColor: '#FFE81F',
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    color: '#FFE81F',
    fontSize: 18,
    marginBottom: 4,
  },
  characterDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    color: '#9E9E9E',
    fontSize: 12,
    marginBottom: 4,
  },
  detailValue: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  hintText: {
    color: '#666666',
    textAlign: 'center',
  },
  saveButton: {
    marginTop: 16,
    marginBottom: 32,
  },
});

export default SearchScreen;
