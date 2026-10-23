// Datos del club. Los campos marcados como PENDIENTE hay que confirmarlos con el club.
export const CLUB = {
  name: "Club Halterofilia Rías Baixas",
  short: "Rías Baixas",
  tagline: "Levanta lo que creías imposible.",
  region: "Pontevedra, Galicia",
  instagram: "https://www.instagram.com/halterofiliariasbaixas/",
  instagramHandle: "@halterofiliariasbaixas",
  description: "Club de halterofilia olímpica de Pontevedra. Entrena arrancada y dos tiempos, calcula tus puntos élite RFEH y sigue el calendario de competiciones.",
  venue: {
    name: "La nave · Box004",
    address: "Polígono Industrial do Vao 2, nave 25, 36157 Pontevedra",
    street: "Polígono Industrial do Vao 2, nave 25",
    postalCode: "36157",
    city: "Pontevedra",
    province: "Pontevedra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Box004+Pol%C3%ADgono+O+Vao+2+nave+25+36157+Pontevedra",
  },
  partner: {
    name: "Box004",
    description: "Centro de entrenamiento funcional donde entrena el club.",
    url: "https://box004.com/",
  },
  schedule: [
    { days: "Jueves", hours: "" }, // PENDIENTE: horario
  ],
};

export const FEDERATIONS = [
  { name: "Federación Galega de Halterofilia", short: "FGH", scope: "Galicia", url: "https://halterofilia.org/" },
  { name: "Real Federación Española de Halterofilia", short: "RFEH", scope: "España", url: "https://www.fedehalter.org/" },
  { name: "European Weightlifting Federation", short: "EWF", scope: "Europa", url: "https://ewf.sport/" },
  { name: "International Weightlifting Federation", short: "IWF", scope: "Mundo", url: "https://iwf.sport/" },
];
