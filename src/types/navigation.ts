export type RootStackParamList = {
  Register: undefined;
  CharacterSelect: undefined;
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  CharacterDetail: { characterId: string };
};

export type AuthStackParamList = {
  Register: undefined;
  CharacterSelect: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  CharacterDetail: { characterId: string };
};
