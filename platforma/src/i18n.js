import { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    navbar: {
      home: 'Home',
      article: 'Article',
      news: 'News',
      game: 'Game',
      tournament: 'Tournament',
      season: 'Season',
      league: 'League',
      player: 'Player',
      players: 'Players',
      team: 'Team',
      teams: 'Teams',
      venue: 'Venue',
      schedule: 'Schedule',
      standings: 'Standings',
      bracket: 'Bracket',
      calendar: 'Calendar',
      darkMode: 'Dark mode',
    },
    pages: {
      home: 'Home',
      article: 'Article',
      news: 'News',
      game: 'Game',
      tournament: 'Tournament',
      season: 'Season',
      league: 'League',
      player: 'Player',
      players: 'Players',
      team: 'Team',
      teams: 'Teams',
      venue: 'Venue',
      schedule: 'Schedule',
      standings: 'Standings',
      bracket: 'Bracket',
      calendar: 'Calendar',
    },
    home: {
      newsItems: [
        {
          title: 'League kicks off new season',
          image: 'https://placehold.co/300x200?text=News+1',
          story:
            'The new season starts with intense matches and fresh rivalries.',
        },
        {
          title: 'Star player joins the roster',
          image: 'https://placehold.co/300x200?text=News+2',
          story:
            'A top athlete signs with the team, boosting championship hopes.',
        },
        {
          title: 'Community outreach initiative',
          image: 'https://placehold.co/300x200?text=News+3',
          story:
            'Teams collaborate with local groups for youth development.',
        },
      ],
      viewAllNews: 'View all news',
    },
    player: {
      loading: 'Loading player...',
      noPlayer: 'No player specified',
      notFound: 'Player not found',
      failed: 'Failed to load player',
      team: 'Team',
      position: 'Position',
      number: 'Number',
      birthDate: 'Birth Date',
      birthPlace: 'Birth Place',
      height: 'Height',
      weight: 'Weight',
      previousTeams: 'Previous Teams',
    },
    bracket: {
      final: 'Final',
      semifinals: 'Semifinals',
      quarterfinals: 'Quarterfinals',
      roundOf: 'Round of',
      thirdPlace: 'Third Place',
      teams: 'teams',
      bye: 'BYE',
    },
    footer: {
      copyright: '© 2023 Amateur Basketball League',
    },
  },
  es: {
    navbar: {
      home: 'Inicio',
      article: 'Artículo',
      news: 'Noticias',
      game: 'Juego',
      tournament: 'Torneo',
      season: 'Temporada',
      league: 'Liga',
      player: 'Jugador',
      players: 'Jugadores',
      team: 'Equipo',
      teams: 'Equipos',
      venue: 'Lugar',
      schedule: 'Horario',
      standings: 'Clasificación',
      bracket: 'Llaves',
      calendar: 'Calendario',
      darkMode: 'Modo oscuro',
    },
    pages: {
      home: 'Inicio',
      article: 'Artículo',
      news: 'Noticias',
      game: 'Juego',
      tournament: 'Torneo',
      season: 'Temporada',
      league: 'Liga',
      player: 'Jugador',
      players: 'Jugadores',
      team: 'Equipo',
      teams: 'Equipos',
      venue: 'Lugar',
      schedule: 'Horario',
      standings: 'Clasificación',
      bracket: 'Llaves',
      calendar: 'Calendario',
    },
    home: {
      newsItems: [
        {
          title: 'La liga inicia nueva temporada',
          image: 'https://placehold.co/300x200?text=Noticia+1',
          story:
            'La nueva temporada comienza con partidos intensos y nuevas rivalidades.',
        },
        {
          title: 'Jugador estrella se une al equipo',
          image: 'https://placehold.co/300x200?text=Noticia+2',
          story:
            'Un atleta de primer nivel firma con el equipo, aumentando las esperanzas de campeonato.',
        },
        {
          title: 'Iniciativa de alcance comunitario',
          image: 'https://placehold.co/300x200?text=Noticia+3',
          story:
            'Los equipos colaboran con grupos locales para el desarrollo juvenil.',
        },
      ],
      viewAllNews: 'Ver todas las noticias',
    },
    player: {
      loading: 'Cargando jugador...',
      noPlayer: 'Ningún jugador especificado',
      notFound: 'Jugador no encontrado',
      failed: 'No se pudo cargar el jugador',
      team: 'Equipo',
      position: 'Posición',
      number: 'Número',
      birthDate: 'Fecha de nacimiento',
      birthPlace: 'Lugar de nacimiento',
      height: 'Altura',
      weight: 'Peso',
      previousTeams: 'Equipos anteriores',
    },
    bracket: {
      final: 'Final',
      semifinals: 'Semifinales',
      quarterfinals: 'Cuartos de final',
      roundOf: 'Ronda de',
      thirdPlace: 'Tercer lugar',
      teams: 'equipos',
      bye: 'Descansa',
    },
    footer: {
      copyright: '© 2023 Liga Amateur de Baloncesto',
    },
  },
};

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const t = (key) =>
    key.split('.').reduce((obj, part) => (obj ? obj[part] : undefined), translations[language]) ??
    key;
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

