import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
}

type CharacterContextData = {
  selectedCharacter: Character | null;
  characters: Character[];
  isLoading: boolean;
  error: string | null;
  searchCharacters: (query: string) => Promise<void>;
  selectCharacter: (character: Character) => Promise<void>;
  clearSelectedCharacter: () => Promise<void>;
};

const CharacterContext = createContext<CharacterContextData>({} as CharacterContextData);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSelectedCharacter();
  }, []);

  const loadSelectedCharacter = async () => {
    try {
      const storedCharacter = await AsyncStorage.getItem('@StarWarsApp:selectedCharacter');
      if (storedCharacter) {
        setSelectedCharacter(JSON.parse(storedCharacter));
      }
    } catch (error) {
      console.error('Failed to load selected character', error);
    }
  };

  const searchCharacters = async (query: string) => {
    if (!query.trim()) {
      setCharacters([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://swapi.dev/api/people/?search=${encodeURIComponent(query)}`);
      const data = await response.json();
      setCharacters(data.results || []);
    } catch (err) {
      console.error('Failed to fetch characters', err);
      setError('Failed to fetch characters. Please try again.');
      setCharacters([]);
    } finally {
      setIsLoading(false);
    }
  };

  const selectCharacter = async (character: Character) => {
    try {
      await AsyncStorage.setItem('@StarWarsApp:selectedCharacter', JSON.stringify(character));
      setSelectedCharacter(character);
    } catch (error) {
      console.error('Failed to save selected character', error);
      throw error;
    }
  };

  const clearSelectedCharacter = async () => {
    try {
      await AsyncStorage.removeItem('@StarWarsApp:selectedCharacter');
      setSelectedCharacter(null);
    } catch (error) {
      console.error('Failed to clear selected character', error);
      throw error;
    }
  };

  return (
    <CharacterContext.Provider
      value={{
        selectedCharacter,
        characters,
        isLoading,
        error,
        searchCharacters,
        selectCharacter,
        clearSelectedCharacter,
      }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
};

export default CharacterContext;
