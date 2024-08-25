import axios from 'axios';

const API_URL = 'https://dragonball-api.com/api/characters';

export interface Character {
  name: string;
  race: string;
  gender: string;
  ki: string;
  maxKi: string;
  affiliation: string;
  image: string;
}

export interface CharacterResponse {
  items: Character[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}

export const fetchCharacters = async (page: number = 1, limit: number = 24): Promise<CharacterResponse> => {
  try {
    const response = await axios.get<CharacterResponse>(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};
