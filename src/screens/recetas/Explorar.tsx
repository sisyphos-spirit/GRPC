import { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { useRecetas } from '../../hooks/useRecetas';
import RecetaItem from '../../components/RecetaItem';
import { Ionicons } from '@expo/vector-icons';
import { messages } from '../../constants/messages';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useTheme } from '../../hooks/useTheme';

export default function Explore() {
  const navigation = useNavigation();
  const { recetas: recipes, loading, fetchRecetasPublicas: fetchPublicRecipes } = useRecetas();
  const [searchTerm, setSearchTerm] = useState('');
  const language = useLanguageStore((state) => state.language);
  const t = messages[language];
  const { colors } = useTheme();

  useEffect(() => {
    fetchPublicRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    if (!searchTerm) return true;
    const lower = searchTerm.toLowerCase();
    const matchTitle = recipe.titulo?.toLowerCase().includes(lower);
    const matchDescription = recipe.descripcion?.toLowerCase().includes(lower);
    const matchIngredient = Array.isArray(recipe.ingredientes)
      ? recipe.ingredientes.some((ing: any) => ing.nombre?.toLowerCase().includes(lower))
      : false;
    return matchTitle || matchDescription || matchIngredient;
  });

  const goToRecipeInfo = (item: any) => {
    (navigation as any).navigate('InfoReceta', { receta: item });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={styles.searchBarContainer}>
        <View style={styles.searchRow}>
          <TextInput
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={[styles.input, styles.flex1, { backgroundColor: colors.secondary, borderColor: colors.primary, color: colors.text }]}
            placeholderTextColor={colors.placeholder}
          />
          <Pressable
            onPress={() => (navigation as any).navigate('BuscarPorId')}
            style={[styles.searchButton, { backgroundColor: colors.accent }]}
            accessibilityLabel={t.searchById}
          >
            <Ionicons name="search" size={22} color={colors.text} />
          </Pressable>
        </View>
      </View>
      {filteredRecipes.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.placeholder }]}>
          {t.noPublicRecipes}
        </Text>
      ) : (
        <FlatList
          style={styles.list}
          data={filteredRecipes}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => goToRecipeInfo(item)}>
              <RecetaItem item={item} />
            </Pressable>
          )}
          refreshing={loading}
          onRefresh={fetchPublicRecipes}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBarContainer: { marginHorizontal: 20, marginTop: 20, marginBottom: 10 },
  searchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    elevation: 2,
  },
  flex1: { flex: 1 },
  searchButton: { marginLeft: 10, borderRadius: 8, padding: 10 },
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 16 },
  list: { marginTop: 10 },
});
