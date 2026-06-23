const STORAGE_KEY = 'diceRolls';

export const storage = {
  save: (data: any) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  load: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  clear: () => {
    localStorage.removeItem(STORAGE_KEY);
  },
};