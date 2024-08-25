import React from 'react';
import { Container } from '@mui/material';
import { CharacterList } from '../../components'

export const Home = () => {
    return (
        <Container>
            <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Dragon Ball (Juan Gabriel M)</h1>
            <CharacterList />
        </Container>
    );
};