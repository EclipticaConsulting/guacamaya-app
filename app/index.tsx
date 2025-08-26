  import { useEffect, useMemo, useState, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  useWindowDimensions,
  Animated,
  Platform,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
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
  image?: string;
};

type Tag = string;

const COLORS = {
  // Paleta principal vibrante
  bg: "#0A0E27",           // Fondo oscuro profundo
  bgLight: "#141B3C",      // Fondo secundario
  surface: "#1E2841",      // Superficies
  
  // Texto con jerarquía
  text: "#FFFFFF",         // Texto principal
  textMuted: "#8B92B3",    // Texto secundario
  textAccent: "#64FFDA",   // Texto de acento
  
  // Colores vibrantes
  accentPrimary: "#6366F1",   // Índigo vibrante
  accentSecondary: "#EC4899", // Rosa/Magenta
  accentTertiary: "#10B981",  // Verde esmeralda
  accentWarning: "#F59E0B",   // Ámbar
  
  // Gradientes
  gradientStart: "#667EEA",
  gradientMid: "#764BA2",
  gradientEnd: "#F093FB",
  
  // Efectos
  glassBg: "rgba(255, 255, 255, 0.05)",
  glassBorder: "rgba(255, 255, 255, 0.1)",
  shadow: "rgba(0, 0, 0, 0.5)",
};

// Gradientes predefinidos para tags
const TAG_GRADIENTS = [
  ["#667EEA", "#764BA2"],
  ["#F093FB", "#F5576C"],
  ["#4FACFE", "#00F2FE"],
  ["#43E97B", "#38F9D7"],
  ["#FA709A", "#FEE140"],
  ["#30CFD0", "#330867"],
];

export default function HomeScreen() {
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  
  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const A = ARTICLES as Article[];

  // Animación de entrada
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Animación sutil del logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoRotate, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotate, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

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

  // Pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 1000));
    setRefreshing(false);
  };

  const clearFilters = () => {
    setQ("");
    setSelectedTag(null);
  };

  const { width, height } = useWindowDimensions();
  const HERO_HEIGHT = Math.max(100, Math.round(height * 0.15));
  const logoMeta = Image.resolveAssetSource(logo);
  const LOGO_AR = logoMeta?.width && logoMeta?.height ? logoMeta.width / logoMeta.height : 1;

  const logoTransform = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "2deg"],
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar style="light" />
      
      {/* Fondo con gradiente animado */}
      <LinearGradient
        colors={[COLORS.bg, COLORS.bgLight, COLORS.bg]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.textAccent}
          />
        }
      >
        {/* HERO: Logo con efectos */}
        <Animated.View
          style={{
            height: HERO_HEIGHT,
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <LinearGradient
            colors={[COLORS.gradientStart, COLORS.gradientMid, COLORS.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Efecto de brillo */}
            <View
              style={{
                position: "absolute",
                width: width * 0.6,
                height: width * 0.6,
                borderRadius: width * 0.3,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                opacity: 0.5,
              }}
            />
            
            <Animated.Image
              source={logo}
              style={{
                height: "60%",
                aspectRatio: LOGO_AR,
                maxWidth: width * 0.8,
                transform: [{ rotate: logoTransform }],
                shadowColor: COLORS.shadow,
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
              }}
              resizeMode="contain"
            />
            
            {/* Texto elegante */}
            <Text
              style={{
                color: COLORS.text,
                fontSize: 12,
                letterSpacing: 3,
                marginTop: 10,
                fontWeight: "300",
                textTransform: "uppercase",
                opacity: 0.8,
              }}
            >
              Noticias que importan
            </Text>
          </LinearGradient>
        </Animated.View>

        {/* Tabs con efecto glassmorphism */}
        <BlurView
  intensity={25}           // ajusta 0–100
  tint="dark"              // "light" | "dark" | "default"
  style={{
    backgroundColor: COLORS.glassBg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.glassBorder,
  }}
>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 8, gap: 8 }}
          >
            <ModernTab
              label="🔥 Trending"
              active={!selectedTag}
              onPress={() => setSelectedTag(null)}
              gradient={["#F093FB", "#F5576C"]}
            />
            {tags.map((t, index) => (
              <ModernTab
                key={t}
                label={t}
                active={selectedTag === t}
                onPress={() => setSelectedTag((prev) => (prev === t ? null : t))}
                gradient={TAG_GRADIENTS[index % TAG_GRADIENTS.length]}
              />
            ))}
          </ScrollView>
        </BlurView>

        {/* Buscador mejorado */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
          <EnhancedSearchBar value={q} onChange={setQ} />
          {(selectedTag || q) && (
            <Pressable
              onPress={clearFilters}
              style={{
                alignSelf: "flex-start",
                marginTop: 8,
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 20,
                backgroundColor: COLORS.glassBg,
                borderWidth: 1,
                borderColor: COLORS.glassBorder,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: COLORS.textAccent, marginRight: 6 }}>✕</Text>
              <Text style={{ color: COLORS.textMuted, fontSize: 13 }}>Limpiar filtros</Text>
            </Pressable>
          )}
        </View>

        {/* Título de sección con estilo */}
        <ModernSectionTitle title={selectedTag || "Últimas Noticias"} />

        {/* Hero destacado ultra moderno */}
        {featured && <UltraFeaturedCard article={featured} />}

        {/* Lista con cards modernos */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 20 }}>
          {filtered.slice(1).map((article, index) => (
            <ModernArticleCard key={article.id || index} article={article} index={index} />
          ))}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

/** ---------- Componentes mejorados ---------- */

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

function ModernTab({
  label,
  active,
  onPress,
  gradient,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
  gradient: string[];
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    onPress?.();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable onPress={handlePress}>
        {active ? (
          <LinearGradient
            colors={[COLORS.gradientStart, COLORS.gradientEnd] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              paddingHorizontal: 18,
              paddingVertical: 10,
              borderRadius: 20,
              shadowColor: gradient[0],
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <Text style={{ color: "#FFFFFF", fontWeight: "700", fontSize: 13 }}>
              {label}
            </Text>
          </LinearGradient>
        ) : (
          <View
            style={{
              paddingHorizontal: 18,
              paddingVertical: 10,
              borderRadius: 20,
              backgroundColor: COLORS.glassBg,
              borderWidth: 1,
              borderColor: COLORS.glassBorder,
            }}
          >
            <Text style={{ color: COLORS.textMuted, fontWeight: "600", fontSize: 13 }}>
              {label}
            </Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

function EnhancedSearchBar({ value, onChange }: { value: string; onChange: (text: string) => void }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.surface,
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        shadowColor: COLORS.accentPrimary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
      }}
    >
      <Text style={{ fontSize: 18, marginRight: 10 }}>🔍</Text>
      <SearchBar
        value={value}
        onChange={onChange}
      />
    </View>
  );
}

function ModernSectionTitle({ title }: { title: string }) {
  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <LinearGradient
          colors={[COLORS.accentPrimary, COLORS.accentSecondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: 4,
            height: 24,
            borderRadius: 2,
            marginRight: 12,
          }}
        />
        <Text
          style={{
            color: COLORS.text,
            fontSize: 22,
            fontWeight: "800",
            letterSpacing: 0.5,
          }}
        >
          {title}
        </Text>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <LinearGradient
            colors={["transparent", COLORS.glassBorder, "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ height: 1 }}
          />
        </View>
      </View>
    </View>
  );
}

function UltraFeaturedCard({ article }: { article: Article }) {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
        marginHorizontal: 16,
        marginBottom: 20,
      }}
    >
      <Pressable
        style={{
          backgroundColor: COLORS.surface,
          borderRadius: 24,
          overflow: "hidden",
          shadowColor: COLORS.accentPrimary,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.2,
          shadowRadius: 20,
          elevation: 8,
        }}
      >
        {/* Imagen con overlay gradient */}
        <View style={{ position: "relative", height: 220 }}>
          {article.image ? (
            <Image source={{ uri: article.image }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
          ) : (
            <LinearGradient
              colors={[COLORS.gradientStart, COLORS.gradientEnd]}
              style={{ width: "100%", height: "100%" }}
            />
          )}
          
          {/* Overlay gradient */}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 100,
            }}
          />
          
          {/* Tag flotante */}
          <View
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              backgroundColor: COLORS.accentPrimary,
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
          >
            <Text style={{ color: "#FFFFFF", fontWeight: "700", fontSize: 12 }}>
              {article.tag}
            </Text>
          </View>
        </View>

        {/* Contenido */}
        <View style={{ padding: 20 }}>
          <Text
            style={{
              color: COLORS.text,
              fontSize: 24,
              fontWeight: "800",
              marginBottom: 10,
              lineHeight: 30,
            }}
          >
            {article.title}
          </Text>
          <Text
            style={{
              color: COLORS.textMuted,
              fontSize: 15,
              lineHeight: 22,
              marginBottom: 16,
            }}
          >
            {article.summary}
          </Text>
          
          {/* Botón de acción */}
          <LinearGradient
            colors={[COLORS.accentPrimary, COLORS.accentSecondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              paddingVertical: 12,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#FFFFFF", fontWeight: "700", fontSize: 14 }}>
              Leer más →
            </Text>
          </LinearGradient>
        </View>
      </Pressable>
    </Animated.View>
  );
}

function ModernArticleCard({ article, index }: { article: Article; index: number }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index]);

  const gradient = TAG_GRADIENTS[index % TAG_GRADIENTS.length];

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY }],
        marginBottom: 16,
      }}
    >
      <Pressable
        style={{
          backgroundColor: COLORS.surface,
          borderRadius: 16,
          padding: 16,
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: COLORS.glassBorder,
        }}
      >
        {/* Icono/Número decorativo */}
        <LinearGradient
          colors={[COLORS.gradientStart, COLORS.gradientEnd] as const}
          style={{
            width: 50,
            height: 50,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "800" }}>
            {(index + 2).toString().padStart(2, "0")}
          </Text>
        </LinearGradient>

        {/* Contenido */}
        <View style={{ flex: 1 }}>
          <Text style={{ color: COLORS.textAccent, fontSize: 11, marginBottom: 4, fontWeight: "600" }}>
            {article.tag}
          </Text>
          <Text style={{ color: COLORS.text, fontSize: 16, fontWeight: "700", marginBottom: 4 }}>
            {article.title}
          </Text>
          <Text style={{ color: COLORS.textMuted, fontSize: 13, lineHeight: 18 }} numberOfLines={2}>
            {article.summary}
          </Text>
        </View>

        {/* Flecha */}
        <Text style={{ color: COLORS.textMuted, fontSize: 20, marginLeft: 10 }}>→</Text>
      </Pressable>
    </Animated.View>
  );
}
