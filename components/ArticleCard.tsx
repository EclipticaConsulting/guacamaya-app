// components/ArticleCard.tsx
import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { Image } from "expo-image"; // Si no usas expo-image, cambia a: import { Image } from "react-native";

type ArticleIn =
  | {
      id?: string | number;
      slug?: string | null;
      title: string;
      excerpt?: string | null;     // Supabase
      summary?: string | null;     // Mock/local
      content?: string | null;
      cover_url?: string | null;   // Supabase
      coverUrl?: string | null;    // Mock/local
      tags?: string[] | null;      // Supabase
      tag?: string | null;         // Mock/local
      readMins?: number | null;
      author?: string | null;
      date?: string | null;
    }
  | any;

type Props = { a: ArticleIn };

const estimateReadMins = (content?: string | null) => {
  if (!content) return 2;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220)); // ~220 wpm
};

export default function ArticleCard({ a }: Props) {
  // Imagen de portada
  const cover = a?.cover_url ?? a?.coverUrl ?? null;

  // Resumen / excerpt
  const summary: string =
    (a?.excerpt as string) ??
    (a?.summary as string) ??
    "";

  // Tag (desde tags[0] o campo suelto)
  const tag: string =
    (Array.isArray(a?.tags) && a.tags?.[0]) ||
    (a?.tag as string) ||
    "Noticias";

  // Tiempo de lectura
  const mins: number =
    (a?.readMins as number) ??
    estimateReadMins(a?.content);

  // Destino: prioriza id; si no hay, usa slug
  const idOrSlug =
    (a?.id != null ? String(a.id) : null) ||
    (a?.slug ? String(a.slug) : null);

  // Si no hay destino, evita Link roto
  const href = idOrSlug ? `/article/${idOrSlug}` : undefined;

  const CardInner = (
    <Pressable
      // Usa gap si tu versión de RN lo soporta; si no, comenta "gap" y usa el separador comentado.
      style={{ flexDirection: "row", gap: 12, padding: 12, alignItems: "center" }}
      accessibilityRole="button"
      accessibilityLabel={a?.title ?? "Artículo"}
    >
      {cover ? (
        <Image
          source={{ uri: cover }}
          style={{ width: 96, height: 96, borderRadius: 12 }}
          contentFit="cover"
          cachePolicy="memory-disk"
          transition={150}
        />
      ) : (
        <View style={{ width: 96, height: 96, borderRadius: 12, backgroundColor: "#eee" }} />
      )}

      {/* Si 'gap' no existe en tu RN, quita 'gap' del Pressable y descomenta este spacer:
      <View style={{ width: 12 }} /> */}

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "700" }} numberOfLines={2}>
          {a?.title ?? ""}
        </Text>

        {!!summary && (
          <Text style={{ color: "#666", marginTop: 4 }} numberOfLines={2}>
            {summary}
          </Text>
        )}

        <Text style={{ color: "#999", marginTop: 6, fontSize: 12 }}>
          {tag} · {mins} min
        </Text>
      </View>
    </Pressable>
  );

  // Si tenemos destino válido, usamos Link; si no, renderizamos el card como vista estática
  return href ? (
    <Link href={href} asChild>
      {CardInner}
    </Link>
  ) : (
    <View>{CardInner}</View>
  );
}
