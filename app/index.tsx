  import { useEffect, useMemo, useState } from "react";
  import {
    SafeAreaView,
    Text,
    View,
    Pressable,
    Image,
    ScrollView,
    useWindowDimensions,
  } from "react-native";
  import { StatusBar } from "expo-status-bar";
  import SearchBar from "../components/SearchBar";
  import ArticleList from "../components/ArticleList";
  import { ARTICLES } from "../data/articles";
  import logo from "../assets/guacamaya.png";

  /** Ajusta este tipo a tu shape real */
  type Article = {
    id?: string | number;
    slug?: string;
    title: string;
    summary: string;
    tag: string;
    image?: string; // opcional, si tienen url/local require
  };

  type Tag = string;

  const COLORS = {
    bg: "#f2f2f2",        // fondo claro
    text: "#000000",      // textos/títulos en negro
    textMuted: "#555555", // detalles de texto
    accentBlue: "#0057D9",
    accentYellow: "#FFD60A",
    chipBg: "#ffffff",
    chipBorder: "#E5E5E5",
    surface: "#ffffff",
    surfaceBorder: "#E5E5E5",
  };

  export default function HomeScreen() {
    const [q, setQ] = useState("");
    const [debouncedQ, setDebouncedQ] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

    const A = ARTICLES as Article[];

    // Debounce de búsqueda
    useEffect(() => {
      const id = setTimeout(() => setDebouncedQ(q.trim().toLowerCase()), 220);
      return () => clearTimeout(id);
    }, [q]);

    // Tags únicos ordenados
    const tags = useMemo<string[]>(() => {
      const uniq = Array.from(new Set(A.map((a) => a.tag)));
      return uniq.sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" }));
    }, [A]);

    // Artículo destacado
    const featured = useMemo<Article | null>(() => {
      const base = debouncedQ || selectedTag ? filteredFrom(A, debouncedQ, selectedTag) : A;
      return base.length ? base[0] : null;
    }, [A, debouncedQ, selectedTag]);

    // Lista filtrada
    const filtered = useMemo<Article[]>(() => {
      return filteredFrom(A, debouncedQ, selectedTag);
    }, [A, debouncedQ, selectedTag]);

    // Pull-to-refresh (simulado)
    const onRefresh = async () => {
      setRefreshing(true);
      await new Promise((r) => setTimeout(r, 500));
      setRefreshing(false);
    };

    const clearFilters = () => {
      setQ("");
      setSelectedTag(null);
    };

    const { width, height } = useWindowDimensions();
  const HERO_HEIGHT = Math.max(56, Math.round(height * 0.10)); // ~11/80
    const logoMeta = Image.resolveAssetSource(logo);
    const LOGO_AR = logoMeta?.width && logoMeta?.height ? logoMeta.width / logoMeta.height : 1;
    

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
        <StatusBar style="dark" />

        {/* PORTADA: logo protagonista, centrado */}
        <View
          style={{
      height: HERO_HEIGHT,
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 1,
      borderColor: COLORS.surfaceBorder,
      backgroundColor: COLORS.bg,
      paddingTop: 35, // <-- aire extra arriba
      paddingBottom: 5,
          }}
        >
          <Image
            source={logo}
      style={{
        height: "100%",        // ocupa toda la altura de la portada
        aspectRatio: LOGO_AR,  // mantiene proporción
        // evita que se salga por los lados si el logo es muy ancho
        maxWidth: width * 0.92,
      }}
      resizeMode="contain"
      accessible
      accessibilityLabel="Logo de Guacamaya"
          />
        </View>

        {/* Tabs de secciones */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 0, gap: 4 }}
          style={{ borderBottomWidth: 1, borderColor: COLORS.surfaceBorder, backgroundColor: COLORS.bg }}
        >
          <Tab
            label="Hoy"
            active={!selectedTag}
            onPress={() => setSelectedTag(null)}
          />
          {tags.map((t) => (
            <Tab
              key={t}
              label={t}
              active={selectedTag === t}
              onPress={() => setSelectedTag((prev) => (prev === t ? null : t))}
            />
          ))}
        </ScrollView>

        {/* Buscador */}
        <View style={{ paddingHorizontal: 12, paddingVertical: 5 }}>
          <SearchBar value={q} onChange={setQ} />
          {(selectedTag || q) && (
            <Pressable
              onPress={clearFilters}
              style={{
                alignSelf: "flex-start",
                marginTop: 4,
                paddingVertical: 2,
                paddingHorizontal: 10,
                borderRadius: 8,
                backgroundColor: COLORS.chipBg,
                borderWidth: 1,
                borderColor: COLORS.chipBorder,
              }}
            >
              <Text style={{ color: COLORS.textMuted }}>Limpiar filtros</Text>
            </Pressable>
          )}
        </View>

        {/* Divider / Título de sección */}
        <SectionTitle title={selectedTag || "Lo último"} />

        {/* Hero (destacado) */}
        {featured && <FeaturedCard article={featured} />}

        {/* Lista */}
        <View style={{ flex: 1 }}>
          <ArticleList data={filtered} refreshing={refreshing} onRefresh={onRefresh} />
        </View>
      </SafeAreaView>
    );
  }

  /** ---------- helpers & small components ---------- */

  function filteredFrom(list: Article[], q: string, tag: Tag | null) {
    const k = q.trim().toLowerCase();
    return list.filter((a) => {
      const title = a.title?.toLowerCase?.() ?? "";
      const summary = a.summary?.toLowerCase?.() ?? "";
      const tagLow = a.tag?.toLowerCase?.() ?? "";
      const matchesText = !k || title.includes(k) || summary.includes(k) || tagLow.includes(k);
      const matchesTag = !tag || a.tag === tag;
      return matchesText && matchesTag;
    });
  }

  function Tab({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
    return (
      <Pressable
        onPress={onPress}
        style={{
          paddingHorizontal: 14,
          paddingVertical: 10,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: active ? COLORS.text : COLORS.textMuted,
            fontWeight: active ? "800" : "600",
          }}
        >
          {label}
        </Text>
        {/* Indicador activo con acento azul */}
        <View
          style={{
            height: 3,
            width: 28,
            marginTop: 6,
            borderRadius: 999,
            backgroundColor: active ? COLORS.accentBlue : "transparent",
          }}
        />
      </Pressable>
    );
  }

  function SectionTitle({ title }: { title: string }) {
    return (
      <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        <View
          style={{
            borderBottomWidth: 2,
            borderColor: COLORS.accentYellow, // detalle en amarillo
            marginBottom: 8,
          }}
        />
        <Text
          style={{
            color: COLORS.text, // negro
            fontWeight: "800",
            letterSpacing: 0.5,
            fontSize: 16,
          }}
        >
          {title.toUpperCase()}
        </Text>
      </View>
    );
  }

  function FeaturedCard({ article }: { article: Article }) {
    return (
      <Pressable
        style={{
          marginHorizontal: 16,
          marginBottom: 12,
          backgroundColor: COLORS.surface,
          borderRadius: 12,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: COLORS.surfaceBorder,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          elevation: 1,
        }}
      >
        {/* Imagen si existe */}
        {article.image ? (
          <Image source={{ uri: article.image }} style={{ width: "100%", height: 180 }} resizeMode="cover" />
        ) : (
          <View style={{ width: "100%", height: 10, backgroundColor: "#fafafa" }} />
        )}
        <View style={{ padding: 14 }}>
          <Text style={{ color: COLORS.accentBlue, marginBottom: 6, fontWeight: "700" }}>
            {article.tag}
          </Text>
          <Text style={{ color: COLORS.text, fontSize: 20, fontWeight: "800", marginBottom: 6 }}>
            {article.title}
          </Text>
          <Text style={{ color: COLORS.textMuted }}>
            {article.summary}
          </Text>
        </View>
        {/* Borde inferior amarillo como detalle */}
        <View style={{ height: 3, backgroundColor: COLORS.accentYellow }} />
      </Pressable>
    );
  }
