
import { useState } from "react";
import { router } from "expo-router";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ArticleCard from "../../../components/article-card";
import { Article, ARTICLES } from "../../../data/articles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ArticleList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    "All",
    ...new Set(ARTICLES.map((article) => article.category)),
  ];

  const filtered = selectedCategory
    ? ARTICLES.filter((article) => article.category === selectedCategory)
    : ARTICLES;

  const handlePress = (article: Article) => {
    router.push({
      pathname: "/(home)/[id]",
      params: { id: article.id },
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ArticleCard article={item} onPress={handlePress} />
        )}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>
              {filtered.length} stories
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryList}
            >
              {categories.map((category) => {
                const isActive =
                  category === "All"
                    ? selectedCategory === null
                    : selectedCategory === category;

                return (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryPill,
                      isActive && styles.activePill,
                    ]}
                    onPress={() =>
                      setSelectedCategory(
                        category === "All" ? null : category
                      )
                    }
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        isActive && styles.activeCategoryText,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  list: {
    paddingTop: 12,
    paddingBottom: 32,
  },
  listHeader: {
    paddingBottom: 12,
  },
  listHeaderText: {
    fontSize: 12,
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: 1,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  categoryList: {
    paddingHorizontal: 14,
    gap: 8,
    paddingBottom: 8,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  activePill: {
    backgroundColor: "#0D9488",
    borderColor: "#0D9488",
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
  },
  activeCategoryText: {
    color: "#FFFFFF",
  },
});
