// app/article/[idOrSlug].tsx
import { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { supabase } from "../../src/supabaseClient";
import { ARTICLES } from "../../data/articles";

type ArticleDB = {
  id: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  author?: string | null;
  date?: string | null;
  cover_url?: string | null;
  tags?: string[] | null;
  status?: string | null;
  // slug opcional solo para mapear mock local, NO se consulta en DB:
  slug?: string | null;
};

type ArticleLocal = {
  id?: string | number;
  slug?: string;
  title: string;
  summary?: string;
  content?: string;
  author?: string;
  publishedAt?: string;
  coverUrl?: string;
  tag?: string;
  readMins?: number;
};

const isUUID = (s: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s);

export default function ArticleDetail() {
  const { idOrSlug } = useLocalSearchParams<{ idOrSlug: string }>();
  const router = useRouter();

  const [article, setArticle] = useState<ArticleDB | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const param = useMemo(() => String(idOrSlug ?? "").trim(), [idOrSlug]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      if (!param) return;
      setLoading(true);
      setErrorMsg(null);

      try {
        // Si es UUID, buscamos por id en Supabase
        if (isUUID(param)) {
          const { data, error } = await supabase
            .from("articles")
            .select("id,title,excerpt,content,author,date,cover_url,tags,status") // <-- sin slug
            .eq("status", "published")
            .eq("id", param)
            .single();

          if (error) throw error;
          if (mounted) setArticle(data as ArticleDB);
        } else {
          // Si NO es UUID, intentamos solo en mock local
          const local = findLocal(param);
          if (mounted) {
            if (local) setArticle(mapLocalToDB(local));
            else setErrorMsg("Artículo no encontrado");
          }
        }
      } catch (err: any) {
        if (mounted) setErrorMsg(err?.message ?? "Error cargando artículo");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [param]);

  // Normalizaciones para UI
  const title = article?.title ?? "";
  const dateStr = article?.date || null;
  const cover = article?.cover_url ?? null;
  const excerpt = article?.excerpt ?? null;
  const tag =
    (Array.isArray(article?.tags) && article?.tags?.[0]) ? article!.tags![0] : "Noticias";

  return (
    <>
      <Stack.Screen
        options={{
          title: title || "Artículo",
          headerBackTitle: "Atrás",
        }}
      />

      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
          <ActivityIndicator />
          <Text style={{ marginTop: 8, color: "#666" }}>Cargando…</Text>
        </View>
      ) : errorMsg && !article ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
          <Text style={{ fontSize: 16, marginBottom: 12, textAlign: "center" }}>
            {`Error: ${errorMsg}`}
          </Text>
          <Text onPress={() => router.back()} style={{ color: "#2563eb" }}>
            Volver
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          {cover ? (
            <Image
              source={{ uri: cover }}
              style={{ width: "100%", height: 240, backgroundColor: "#eee" }}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={150}
            />
          ) : null}

          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: "800", marginBottom: 8 }}>
              {title}
            </Text>

            {!!(article?.author || dateStr || tag) && (
              <Text style={{ color: "#6b7280", marginBottom: 12 }}>
                {tag}
                {article?.author ? ` · ${article.author}` : ""}
                {dateStr ? ` · ${new Date(dateStr).toLocaleDateString()}` : ""}
              </Text>
            )}

            {excerpt ? (
              <Text style={{ fontStyle: "italic", color: "#666", marginBottom: 12 }}>
                {excerpt}
              </Text>
            ) : null}

            <Text style={{ fontSize: 16, lineHeight: 24 }}>
              {article?.content || "Sin contenido."}
            </Text>
          </View>
        </ScrollView>
      )}
    </>
  );
}

/** ================= Helpers ================== */

function findLocal(param: string): ArticleLocal | undefined {
  // busca por slug primero
  let a = ARTICLES.find((x: any) => x.slug === param);
  if (a) return a as ArticleLocal;

  // si param parece número o cadena similar a id local, busca por id
  a = ARTICLES.find((x: any) => String(x.id) === param);
  return a as ArticleLocal | undefined;
}

function mapLocalToDB(a: ArticleLocal): ArticleDB {
  return {
    id: String(a.id ?? a.slug ?? Math.random().toString(36).slice(2)),
    title: a.title,
    excerpt: a.summary ?? null,
    content: a.content ?? a.summary ?? null,
    author: a.author ?? "Redacción",
    date: a.publishedAt ?? null,
    cover_url: a.coverUrl ?? null,
    tags: a.tag ? [a.tag] : ["Noticias"],
    status: "published",
    // sólo para consistencia interna (no existe en DB real):
    slug: a.slug ?? null,
  };
}
