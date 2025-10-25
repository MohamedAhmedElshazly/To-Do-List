import React, { useState } from "react";
// import { useContext } from "react";
import { TaskContext } from "./Context/ToDoContext";

import ToDoList from "./Components/ToDoList";
import {
  AppBar,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
  Container,
} from "@mui/material";
import { Delete, Edit, CheckCircle } from "@mui/icons-material";

export default function TodoApp() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Read 3 Books",
      desc: "Finish before end of the month",
      done: false,
    },
    { id: 2, title: "Finish React Course", desc: "", done: false },
    {
      id: 3,
      title: "Understand async & await in JavaScript",
      desc: "",
      done: false,
    },
  ]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#191b1f",
          minHeight: "100vh",
        }}
      >
        <ToDoList />
      </div>
    </TaskContext.Provider>
  );
}
