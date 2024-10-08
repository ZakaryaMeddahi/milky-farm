const API_VERSION = import.meta.env.VITE_API_VERSION;
export const SERVER_URL = import.meta.env.VITE_SERVER_URL + API_VERSION;
export const ROLES = [
  {
    id: 1,
    name: 'admin',
  },
  {
    id: 2,
    name: 'moderator',
  },
];
export const BREEDS = [
  {
    id: 1,
    name: 'Holstein',
  },
  {
    id: 2,
    name: 'Montebiliarde',
  },
];
