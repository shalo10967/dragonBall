import React from "react";
import { Container } from "@mui/material";
import { CharacterList, IconHome } from "../../components";

export const DragonBall = () => {
  return (
    <Container>
      <IconHome />
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        Dragon Ball (Juan Gabriel M)
      </h1>
      <CharacterList />
    </Container>
  );
};
