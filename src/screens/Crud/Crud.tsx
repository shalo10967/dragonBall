import React, { useState } from "react";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Container,
} from "@mui/material";
import { Edit, Delete, Save } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { IconHome } from "../../components";
import { styles } from "./Crud.styles";

export const Crud = () => {
  const [tasks, setTasks] = useState<
    { id: string; text: string; date: Date; isEditing: boolean }[]
  >([]);
  const [newTask, setNewTask] = useState("");
  const [editedTask, setEditedTask] = useState<{
    id: string;
    text: string;
  } | null>(null);

  const addTask = () => {
    if (newTask.trim() === "") return;
    const task = {
      id: uuidv4(),
      text: newTask,
      date: new Date(),
      isEditing: false,
    };
    setTasks((prev) =>
      [...prev, task].sort((a, b) => b.date.getTime() - a.date.getTime())
    );
    setNewTask("");
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleEdit = (id: string, currentText: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
    setEditedTask({ id, text: currentText });
  };

  const saveTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, text: editedTask?.text || task.text, isEditing: false }
          : task
      )
    );
    setEditedTask(null);
  };
  return (
    <Container>
      <IconHome />
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        Crud (Juan Gabriel M)
      </h1>

      <div style={styles.tasker}>
        <TextField
          variant="outlined"
          label="Escribir una tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ marginRight: "10px", width: "300px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addTask}
          style={styles.createTask}
        >
          Crear
        </Button>
      </div>

      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} style={styles.list}>
            {task.isEditing ? (
              <TextField
                value={editedTask?.id === task.id ? editedTask.text : task.text}
                onChange={(e) =>
                  setEditedTask((prev) =>
                    prev
                      ? { ...prev, text: e.target.value }
                      : { id: task.id, text: e.target.value }
                  )
                }
                fullWidth
                variant="outlined"
                style={{ marginRight: "10px" }}
              />
            ) : (
              <ListItemText
                primary={task.text}
                secondary={task.date.toLocaleString()}
              />
            )}
            <IconButton
              onClick={() =>
                task.isEditing
                  ? saveTask(task.id)
                  : toggleEdit(task.id, task.text)
              }
              color="primary"
              style={{ color: task.isEditing ? "#4CAF50" : "#1E88E5" }}
            >
              {task.isEditing ? <Save /> : <Edit />}
            </IconButton>

            <IconButton
              onClick={() => deleteTask(task.id)}
              style={styles.deleteButton}
            >
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
