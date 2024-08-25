import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import { CharacterCard } from '../index';
import { fetchCharacters, Character, CharacterResponse } from '../../services/CharactersServices';

export const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadCharacters = useCallback(async () => {
    try {
      const data: CharacterResponse = await fetchCharacters(currentPage, 20);
      setCharacters(prevCharacters => [...prevCharacters, ...data.items]);
      setTotalPages(data.meta.totalPages);
      setHasMore(currentPage < data.meta.totalPages);
    } catch (err) {
      setError('Failed to fetch characters');
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 200 && hasMore && !loading) {
        setCurrentPage(prevPage => prevPage + 1);
        setLoading(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  if (loading && characters.length === 0) return (
    <Typography variant="h5" component="div" gutterBottom>
      {'Cargando...'}
    </Typography>
  );
  if (error) return <p>{error}</p>;

  return (
    <Container sx={{ paddingTop: 4, backgroundColor: 'transparent' }}>
      <Grid container spacing={4}>
        {characters.map((character, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <CharacterCard
              {...character}
            />
          </Grid>
        ))}
      </Grid>
      {loading && !error && <Typography variant="h5" component="div" gutterBottom>
        {`Cargando más ${totalPages}`}
      </Typography>}
    </Container>
  );
};
