// src/hooks/useArticles.ts
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "../supabaseClient";
import type { RealtimeChannel } from "@supabase/supabase-js";

export type Article = {
  id: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  author?: string | null;
  date?: string | null;        // ISO string esperado; puede venir null
  cover_url?: string | null;
  tags?: string[] | null;
  status?: string | null;      // "published", etc.
};

type UseArticlesResult = {
  articles: Article[];
  loading: boolean;
  errorMsg: string | null;
  refetch: () => Promise<void>;
};

function sortByDateDesc(a: Article, b: Article) {
  const da = a.date ? Date.parse(a.date) : 0;
  const db = b.date ? Date.parse(b.date) : 0;
  // nulos al final
  if (!a.date && !b.date) return 0;
  if (!a.date) return 1;
  if (!b.date) return -1;
  return db - da;
}

export function useArticles(): UseArticlesResult {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from("articles")
        .select(
          "id,title,excerpt,content,author,date,cover_url,tags,status"
        )
        .eq("status", "published")
        // nullsFirst:false => nulos al final (cuando el backend lo respeta)
        .order("date", { ascending: false, nullsFirst: false });

      if (error) throw error;

      if (mountedRef.current) {
        const list = (data ?? []) as Article[];
        setArticles([...list].sort(sortByDateDesc));
      }
    } catch (err: any) {
      if (mountedRef.current) setErrorMsg(err?.message ?? "Error cargando artículos");
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    let sub: RealtimeChannel | null = null;

    // 1) Carga inicial
    fetchArticles();

    // 2) Suscripción realtime (INSERT/UPDATE/DELETE)
    sub = supabase
      .channel("rt-articles")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "articles" },
        (payload) => {
          const row = payload.new as Article & { status?: string };
          if (row?.status === "published") {
            setArticles((prev) => {
              const exists = prev.some((a) => a.id === row.id);
              const next = exists ? prev.map((a) => (a.id === row.id ? row : a)) : [row, ...prev];
              return next.sort(sortByDateDesc);
            });
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "articles" },
        (payload) => {
          const row = payload.new as Article & { status?: string };
          setArticles((prev) => {
            // Si dejó de ser "published", lo removemos
            if (row?.status !== "published") {
              return prev.filter((a) => a.id !== row.id);
            }
            // Si sigue publicado, upsert y reorden
            const exists = prev.some((a) => a.id === row.id);
            const next = exists ? prev.map((a) => (a.id === row.id ? row : a)) : [row, ...prev];
            return next.sort(sortByDateDesc);
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "articles" },
        (payload) => {
          const oldRow = payload.old as { id: string };
          setArticles((prev) => prev.filter((a) => a.id !== oldRow.id));
        }
      )
      .subscribe();

    return () => {
      mountedRef.current = false;
      if (sub) supabase.removeChannel(sub);
    };
  }, [fetchArticles]);

  return { articles, loading, errorMsg, refetch: fetchArticles };
}
