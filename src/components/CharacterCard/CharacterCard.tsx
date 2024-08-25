import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

export const CharacterCard = ({
    name,
    race,
    gender,
    ki,
    maxKi,
    affiliation,
    image }: {
        name: string,
        race: string,
        gender: string,
        ki: string,
        maxKi: string,
        affiliation: string,
        image: string
    }) => {
    return (
        <Card sx={{
            backgroundColor: '#2A2A2A',
            color: '#fff',
            borderRadius: 3,
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box
                component="img"
                sx={{
                    width: '100%',
                    height: 300,
                    objectFit: 'scale-down',
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    marginTop: 5,
                    backgroundImage: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);'
                }}
                alt={name}
                src={image}
            />
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1
            }}>
                <Typography variant="h6" component="div" gutterBottom sx={{ fontSize: '30px', fontWeight: 'bold' }}>
                    {name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                    {`Raza: ${race} - Genero: ${gender}`}
                </Typography>
                <Typography variant="body2" color="yellow" sx={{ mb: 0.5 }}>
                    KI: {ki}
                </Typography>
                <Typography variant="body2" color="yellow" sx={{ mb: 0.5 }}>
                    KI Maximo: {maxKi}
                </Typography>
                <Typography variant="body2">
                    Affiliation: {affiliation}
                </Typography>
            </CardContent>
        </Card>
    );
};
