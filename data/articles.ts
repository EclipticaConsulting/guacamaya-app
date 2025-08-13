export type Article = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverUrl?: string;
  tag: string;
  author: string;
  publishedAt: string; // ISO
  readMins: number;
};

export const ARTICLES: Article[] = [
  {
    id: "1",
    slug: "crisis-hidrica-los-salias",
    title: "Crisis hídrica en Los Salias: ¿qué está pasando?",
    summary: "Vecinos reportan fallas prolongadas. Te explicamos el contexto y las respuestas oficiales.",
    coverUrl: "https://images.unsplash.com/photo-1504893524553-b8553f6c15c9",
    tag: "Servicios",
    author: "Redacción",
    publishedAt: "2025-08-10T09:00:00Z",
    readMins: 5
  },
  {
    id: "2",
    slug: "operativo-salud-comunal-san-antonio",
    title: "Operativo de salud comunal en San Antonio este fin de semana",
    summary: "Jornadas de vacunación y despistaje. Conoce horarios y puntos de atención.",
    coverUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    tag: "Comunidad",
    author: "Guacamaya",
    publishedAt: "2025-08-11T12:30:00Z",
    readMins: 3
  }
];
