import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar, Button, Card, Text, TextInput, Title, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useCharacter } from '../contexts/CharacterContext';

const ProfileScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { user, updateUser, signOut } = useAuth();
  const { selectedCharacter, clearSelectedCharacter } = useCharacter();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveProfile = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      await updateUser({ name, email });
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeCharacter = () => {
    navigation.navigate('Search', { changeCharacter: true });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const handleClearCharacter = async () => {
    Alert.alert(
      'Remove Character',
      'Are you sure you want to remove your selected character?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: async () => {
            try {
              await clearSelectedCharacter();
            } catch (error) {
              console.error('Failed to clear character:', error);
              Alert.alert('Error', 'Failed to remove character. Please try again.');
            }
          }
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Avatar.Text 
              size={100} 
              label={name.split(' ').map(n => n[0]).join('').toUpperCase()} 
              style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
              color="#000"
            />
            {isEditing && (
              <Button 
                mode="outlined" 
                onPress={() => {}}
                style={styles.editPhotoButton}
                icon="camera"
                compact
              >
                Edit
              </Button>
            )}
          </View>
          
          {isEditing ? (
            <View style={styles.formContainer}>
              <TextInput
                label="Full Name"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="account" />}
              />
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                left={<TextInput.Icon icon="email" />}
              />
              <View style={styles.buttonGroup}>
                <Button 
                  mode="outlined" 
                  onPress={() => setIsEditing(false)}
                  style={styles.cancelButton}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button 
                  mode="contained" 
                  onPress={handleSaveProfile}
                  loading={isLoading}
                  disabled={isLoading}
                  style={styles.saveButton}
                >
                  Save Changes
                </Button>
              </View>
            </View>
          ) : (
            <View style={styles.profileInfo}>
              <Title style={[styles.name, { color: theme.colors.primary }]}>{name}</Title>
              <Text style={styles.email}>{email}</Text>
              <Button 
                mode="outlined" 
                onPress={() => setIsEditing(true)}
                style={styles.editButton}
                icon="pencil"
              >
                Edit Profile
              </Button>
            </View>
          )}
        </View>

        <Card style={styles.section}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Title style={styles.sectionTitle}>My Character</Title>
              {selectedCharacter && (
                <View style={styles.characterActions}>
                  <Button 
                    mode="text" 
                    onPress={handleChangeCharacter}
                    textColor={theme.colors.primary}
                    compact
                  >
                    Change
                  </Button>
                  <Button 
                    mode="text" 
                    onPress={handleClearCharacter}
                    textColor="#FF3B30"
                    compact
                  >
                    Remove
                  </Button>
                </View>
              )}
            </View>

            {selectedCharacter ? (
              <View style={styles.characterContainer}>
                <View style={styles.characterInfo}>
                  <Title style={styles.characterName}>{selectedCharacter.name}</Title>
                  <Text>Birth Year: {selectedCharacter.birth_year}</Text>
                  <Text>Gender: {selectedCharacter.gender}</Text>
                  <Text>Height: {selectedCharacter.height} cm</Text>
                  <Text>Mass: {selectedCharacter.mass} kg</Text>
                </View>
              </View>
            ) : (
              <View style={styles.noCharacterContainer}>
                <Text style={styles.noCharacterText}>No character selected</Text>
                <Button 
                  mode="contained" 
                  onPress={handleChangeCharacter}
                  style={styles.addCharacterButton}
                  icon="account-plus"
                >
                  Select a Character
                </Button>
              </View>
            )}
          </Card.Content>
        </Card>

        <Card style={styles.section}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Account</Title>
            <Button 
              mode="outlined" 
              onPress={handleSignOut}
              style={styles.signOutButton}
              textColor="#FF3B30"
              icon="logout"
            >
              Sign Out
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.versionText}>Star Wars App v1.0.0</Text>
          <Text style={styles.copyrightText}>© 2025 Star Wars Fan App</Text>
        </View>
      </ScrollView>
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
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    marginBottom: 12,
    backgroundColor: '#FFE81F',
  },
  editPhotoButton: {
    marginTop: 8,
  },
  profileInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  email: {
    color: '#9E9E9E',
    marginBottom: 16,
    textAlign: 'center',
  },
  editButton: {
    marginTop: 8,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#1E1E1E',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FFE81F',
  },
  characterActions: {
    flexDirection: 'row',
  },
  characterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: 18,
    color: '#FFE81F',
    marginBottom: 8,
  },
  noCharacterContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  noCharacterText: {
    color: '#9E9E9E',
    marginBottom: 16,
    textAlign: 'center',
  },
  addCharacterButton: {
    marginTop: 8,
  },
  signOutButton: {
    borderColor: '#FF3B30',
  },
  footer: {
    alignItems: 'center',
    marginTop: 16,
  },
  versionText: {
    color: '#9E9E9E',
    marginBottom: 4,
  },
  copyrightText: {
    color: '#666666',
    fontSize: 12,
  },
});

export default ProfileScreen;
