import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, Card, Title, Text, useTheme, Avatar, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useCharacter } from '../contexts/CharacterContext';

const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { user, signOut } = useAuth();
  const { selectedCharacter } = useCharacter();

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Title style={[styles.welcomeText, { color: theme.colors.primary }]}>
            Welcome, {user?.name || 'Jedi'}!
          </Title>
          <Text style={styles.subtitle}>May the Force be with you</Text>
        </View>

        <Card style={styles.characterCard}>
          <Card.Content style={styles.characterContent}>
            <View style={styles.characterHeader}>
              <Avatar.Icon 
                size={80} 
                icon="account" 
                style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
                color="#000"
              />
              <View style={styles.characterInfo}>
                <Title style={styles.characterName}>
                  {selectedCharacter?.name || 'No Character Selected'}
                </Title>
                <Text style={styles.characterDetails}>
                  {selectedCharacter?.birth_year || ''}
                </Text>
              </View>
            </View>

            {selectedCharacter ? (
              <View style={styles.characterStats}>
                <View style={styles.statRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Height</Text>
                    <Text style={styles.statValue}>{selectedCharacter.height} cm</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Mass</Text>
                    <Text style={styles.statValue}>{selectedCharacter.mass} kg</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Gender</Text>
                    <Text style={styles.statValue}>
                      {selectedCharacter.gender.charAt(0).toUpperCase() + selectedCharacter.gender.slice(1)}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.noCharacterContainer}>
                <Text style={styles.noCharacterText}>
                  You haven't selected a character yet. Search for your favorite character to get started!
                </Text>
                <Button 
                  mode="contained" 
                  onPress={handleSearchPress}
                  style={styles.searchButton}
                  icon="magnify"
                >
                  Find a Character
                </Button>
              </View>
            )}
          </Card.Content>
        </Card>

        <View style={styles.actionsContainer}>
          <Button 
            mode="contained" 
            onPress={handleSearchPress}
            style={styles.actionButton}
            icon="sword-cross"
          >
            Explore Characters
          </Button>
          
          <Button 
            mode="outlined" 
            onPress={handleProfilePress}
            style={styles.actionButton}
            icon="account-cog"
          >
            My Profile
          </Button>
        </View>

        <View style={styles.quickLinks}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={styles.linksContainer}>
            <Button 
              mode="text" 
              onPress={() => {}}
              style={styles.linkButton}
              icon="movie"
            >
              Movies
            </Button>
            <Button 
              mode="text" 
              onPress={() => {}}
              style={styles.linkButton}
              icon="spaceship"
            >
              Starships
            </Button>
            <Button 
              mode="text" 
              onPress={() => {}}
              style={styles.linkButton}
              icon="planet"
            >
              Planets
            </Button>
          </View>
        </View>
      </ScrollView>

      <Button 
        mode="outlined" 
        onPress={handleSignOut}
        style={styles.signOutButton}
        textColor="#FF3B30"
        icon="logout"
      >
        Sign Out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#9E9E9E',
    fontSize: 16,
    marginTop: 8,
  },
  characterCard: {
    marginBottom: 24,
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
    backgroundColor: '#151515',
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  characterDetails: {
    color: '#9E9E9E',
    fontSize: 14,
  },
  characterStats: {
    padding: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    color: '#9E9E9E',
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#333333',
    marginHorizontal: 8,
  },
  noCharacterContainer: {
    padding: 16,
    alignItems: 'center',
  },
  noCharacterText: {
    color: '#9E9E9E',
    textAlign: 'center',
    marginBottom: 16,
  },
  searchButton: {
    marginTop: 8,
  },
  actionsContainer: {
    marginBottom: 24,
  },
  actionButton: {
    marginBottom: 12,
  },
  quickLinks: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#9E9E9E',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  linksContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 8,
  },
  linkButton: {
    justifyContent: 'flex-start',
  },
  signOutButton: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    borderColor: '#FF3B30',
  },
});

export default HomeScreen;
