import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ToDo from "./ToDo";
import { useState, useContext, useEffect } from "react";
import { TaskContext } from "../Context/ToDoContext";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { CenterFocusStrong } from "@mui/icons-material";

export default function ToDoList() {
  const { tasks, setTasks } = useContext(TaskContext);

  const [newTitle, setNewTitle] = useState("");
  const [filter, setfilter] = useState(localStorage.getItem("filter") || "all");
  const [activeBtn, setActiveBtn] = useState(
    localStorage.getItem("activeBtn") || "all"
  );

  const filteredTasks = (tasks || []).filter((task) => {
    if (filter === "done") {
      return task.done === true;
    }
    if (filter === "not done") {
      return task.done === false;
    } else {
      return true;
    }
  });

  const addTask = () => {
    if (newTitle.trim() === "") return;

    const newTask = {
      id: tasks.length + 1,
      title: newTitle,
      desc: "",
      done: false,
    };

    const addTodo = [...tasks, newTask];
    setTasks(addTodo);
    setNewTitle("");
    localStorage.setItem("todos", JSON.stringify(addTodo));
    console.log(localStorage);
  };

  useEffect(() => {
    const localStorageTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTasks(localStorageTodos);

    // const savedFilter = localStorage.getItem("filter");
    // if (savedFilter) {
    //   setfilter(savedFilter);
    // } else {
    //   setfilter("all");
    // }
  }, []);

  useEffect(() => {
    localStorage.setItem("filter", filter);
    localStorage.setItem("activeBtn", activeBtn);
  }, [filter, activeBtn]);

  return (
    <>
      <Container maxWidth="sm">
        <Card
          sx={{
            minWidth: 275,
            marginTop: 4,
            marginBottom: 4,
            maxHeight: "80vh",
            overflow: "scroll",
          }}
        >
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              My Tasks
            </Typography>
            <Divider />
            <ToggleButtonGroup
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "24px",
              }}
              //value={alignment}
              exclusive
              //onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton
                aria-label="left aligned"
                sx={{
                  background: activeBtn === "all" ? "#e47a67d4" : "white",
                  border: "1px solid black",
                  color: activeBtn === "all" ? "#c00b0bff" : "black",
                  "&:hover": {
                    background: "#de6049d4",
                  },
                }}
                onClick={() => {
                  setfilter("all");
                  setActiveBtn("all");
                }}
              >
                All
              </ToggleButton>

              <ToggleButton
                aria-label="centered"
                sx={{
                  background: activeBtn === "done" ? "#e47a67d4" : "white",
                  border: "1px solid black",
                  color: activeBtn === "done" ? "#c00b0bff" : "black",
                  "&:hover": {
                    background: "#de6049d4",
                  },
                }}
                onClick={() => {
                  setfilter("done");
                  setActiveBtn("done");
                }}
              >
                Done
              </ToggleButton>

              <ToggleButton
                aria-label="right aligned"
                sx={{
                  background: activeBtn === "not done" ? "#e47a67d4" : "white",
                  border: "1px solid black",
                  color: activeBtn === "not done" ? "#c00b0bff" : "black",
                  "&:hover": {
                    background: "#de6049d4",
                  },
                }}
                onClick={() => {
                  setfilter("not done");
                  setActiveBtn("not done");
                }}
              >
                Not Done
              </ToggleButton>
            </ToggleButtonGroup>
          </CardContent>
          {filteredTasks.map((task) => (
            <ToDo key={task.id} task={task} />
          ))}
          <Box
            display="flex"
            gap={2}
            mt={2}
            justifyContent="center"
            marginBottom="24px"
          >
            <TextField
              style={{ width: "75%" }}
              id="outlined-required"
              variant="outlined"
              label="Task title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              fullWidth
            />{" "}
            <Button
              variant="contained"
              color="error"
              style={{ width: "12%" }}
              onClick={addTask}
              disabled={newTitle.length == 0}
            >
              Add
            </Button>
          </Box>
        </Card>
      </Container>
    </>
  );
}
