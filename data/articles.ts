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
  },
  {
  id: "3",
  slug: "reuters-llega-a-venezuela-primer-buque-de-chevron-para-exportar-crudo-a-ee-uu",
  title: "Reuters: Llega a Venezuela primer buque de Chevron para exportar crudo a EE. UU.",
  summary: "Primer cargamento de petróleo venezolano bajo licencia de EE. UU. zarpó hacia refinerías estadounidenses.",
  coverUrl: "https://guacamayave.com/wp-content/uploads/2025/08/shutterstock_185359775-940x528-1.jpg",
  tag: "Economía",
  author: "Redacción",
  publishedAt: "2025-08-13T05:35:25Z",
  readMins: 2
},
{
  id: "4",
  slug: "quienes-suenan-como-sustitutos-del-bocha-batista-parte-i-entrenadores-venezolanos",
  title: "¿Quiénes suenan como sustitutos del «Bocha» Batista? | Parte I: Entrenadores venezolanos",
  summary: "Seis técnicos venezolanos aparecen en la conversación pública para asumir La Vinotinto tras la salida de Fernando «Bocha» Batista.",
  // coverUrl: "", // opcional: puedes dejarlo vacío por ahora
  tag: "Sociedad",
  author: "Sleither Fernández",
  publishedAt: "2025-09-12T00:00:00Z",
  readMins: 11
},
{
  id: "5",
  slug: "la-onu-respalda-la-declaracion-de-nueva-york-y-la-solucion-de-dos-estados",
  title: "La ONU respalda la Declaración de Nueva York y la solución de dos Estados",
  summary: "El organismo internacional se pronuncia a favor de la Declaración de Nueva York y ratifica su compromiso con la solución de dos Estados.",
  // coverUrl: "", // opcional: puedes agregar imagen si la tienes
  tag: "Internacional",
  author: "Redacción",
  publishedAt: "2025-09-13T00:00:00Z",
  readMins: 4
},
{
  id: "6",
  slug: "parlamento-europeo-pide-incluir-al-cartel-de-los-soles-en-la-lista-de-grupos-terroristas",
  title: "Parlamento Europeo pide incluir al Cartel de los Soles en la lista de grupos terroristas",
  summary: "La Eurocámara aprobó una resolución en la que solicita clasificar al Cartel de los Soles como organización terrorista internacional.",
  // coverUrl: "", // agrega URL de imagen si la tienes
  tag: "Internacional",
  author: "Redacción",
  publishedAt: "2025-09-13T00:00:00Z",
  readMins: 5
},
{
  id: "7",
  slug: "las-camaras-empresariales-y-el-fin-del-rentismo",
  title: "Las cámaras empresariales y el fin del rentismo",
  summary: "Organizaciones empresariales plantean la necesidad de superar el modelo rentista y apostar por una economía productiva.",
  // coverUrl: "", // agrega imagen si la tienes
  tag: "Economía",
  author: "Redacción",
  publishedAt: "2025-09-13T00:00:00Z",
  readMins: 6
},
{
  id: "8",
  slug: "el-cartel-de-los-soles-como-se-utiliza-una-narrativa-para-impulsar-un-cambio-de-regimen",
  title: "El Cartel de los Soles: cómo se utiliza una narrativa para impulsar un cambio de régimen",
  summary: "Un análisis sobre el uso político de la narrativa del Cartel de los Soles como herramienta de presión internacional.",
  // coverUrl: "", // agrega URL de imagen si la tienes
  tag: "Opinión",
  author: "Redacción",
  publishedAt: "2025-09-13T00:00:00Z",
  readMins: 7
},
{
  id: "9",
  slug: "el-cartel-de-los-soles-una-narrativa-politica-o-realidad",
  title: "El Cartel de los Soles: ¿una narrativa política o realidad?",
  summary: "El debate sobre la existencia y uso político del llamado Cartel de los Soles divide opiniones entre actores nacionales e internacionales.",
  // coverUrl: "", // agrega URL de imagen si la tienes
  tag: "Opinión",
  author: "Redacción",
  publishedAt: "2025-09-13T00:00:00Z",
  readMins: 6
},
{
  id: "10",
  slug: "estrategias-de-las-empresas-ganadoras",
  title: "Estrategias de las empresas ganadoras",
  summary: "Un repaso a las claves que aplican las compañías exitosas para mantenerse competitivas y crecer en mercados complejos.",
  // coverUrl: "", // agrega URL de imagen si la tienes
  tag: "Economía",
  author: "Redacción",
  publishedAt: "2025-09-13T00:00:00Z",
  readMins: 5
},
{
  id: "11",
  slug: "barco-sospechoso-de-narcotrafico-estaria-en-retirada-antes-del-ataque-de-ee-uu-segun-nyt",
  title: "Barco sospechoso de narcotráfico estaría en retirada antes del ataque de EE. UU., según NYT",
  summary: "El New York Times reporta que la embarcación señalada por EE. UU. ya se encontraba en retirada antes del ataque militar.",
  // coverUrl: "", // agrega URL de imagen si la tienes
  tag: "Internacional",
  author: "Redacción",
  publishedAt: "2025-09-13T00:00:00Z",
  readMins: 4
},
{
  id: "12",
  slug: "venezuela-e-iran-buscan-reforzar-su-alianza-frente-al-despliegue-militar-de-ee-uu-en-el-caribe",
  title: "Venezuela e Irán buscan reforzar su alianza frente al despliegue militar de EE. UU. en el Caribe",
  summary: "Ambos países estrechan su cooperación política y militar en respuesta al aumento de presencia estadounidense en la región.",
  // coverUrl: "", // agrega URL de imagen si la tienes
  tag: "Internacional",
  author: "Redacción",
  publishedAt: "2025-09-13T00:00:00Z",
  readMins: 5
},
];
