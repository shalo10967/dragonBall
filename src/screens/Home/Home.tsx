import React from "react";
import { Grid, Container, Typography, Button } from "@mui/material";
import "./Home.styles.css";
import { useNavigate } from "react-router-dom"; 

export const Home = () => {
    const navigate = useNavigate(); 
  return (
    <Container>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        Desarrollo movil web full stack (Juan Gabriel M)
      </h1>

      <Typography variant="h4" gutterBottom marginTop={10}>
        Proyectos realizados:
      </Typography>
      <Grid container spacing={12} justifyContent="center" alignItems="center">
        <Grid item>
          <Button className="button" onClick={() => navigate("/crud")}>
            <span className="text">Crud</span>
            <div
              className="backgroundImage"
              style={{
                backgroundImage:
                  "url(https://c8.alamy.com/comp/2DACPJX/kanban-board-with-blank-sticky-note-papers-for-writing-task-agile-project-management-tasks-planning-and-to-do-list-2DACPJX.jpg)",
              }}
            />
          </Button>
        </Grid>
        <Grid item>
          <Button className="button" onClick={() => navigate("/dragonBall")}>
            <span className="text">DragonBall</span>
            <div
              className="backgroundImage"
              style={{
                backgroundImage:
                  "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToIbIU7GFDEQcLwGUaAsbc4B9t-8ONRcw4yQ&s)",
              }}
            />
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
