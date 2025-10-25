// import { useState } from "react";
import { useContext, useState } from "react";
import { TaskContext } from "../Context/ToDoContext";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import Edit from "@mui/icons-material/Edit";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ToDo({ task }) {
  const { tasks, setTasks } = useContext(TaskContext);

  const [showDelete, setshowDelete] = useState(false);
  const [showUpdate, setshowUpdate] = useState(false);
  const [TodoUpdate, setTodoUpdate] = useState({
    title: task.title,
    details: task.desc,
  });

  const taskDone = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTasks(updated);
    localStorage.setItem("todos", JSON.stringify(updated));
  };

  const handleDeleteConfirm = (id) => {
    const newList = tasks.filter((task) => task.id !== id);
    setTasks(newList);
    localStorage.setItem("todos", JSON.stringify(newList));
    setshowDelete(false);
  };

  const handleDelete = () => {
    setshowDelete(true);
  };

  const handleDeleteClose = () => {
    setshowDelete(false);
  };
  const handleUpdateConfirm = (id) => {
    const updatedTodos = tasks.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          title: TodoUpdate.title,
          desc: TodoUpdate.details,
        };
      } else {
        return t;
      }
    });

    setTasks(updatedTodos);
    setshowUpdate(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleUpdate = () => {
    setshowUpdate(true);
  };

  const handleUpdateClose = () => {
    setshowUpdate(false);
  };

  return (
    <>
      {/*DELETE MODAL */}
      <Dialog
        open={showDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete the task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You cannot undo the deletion if you choose the (DELETE) button.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Close</Button>
          <Button onClick={() => handleDeleteConfirm(task.id)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/*==== DELETE MODAL ====*/}

      {/*UPDATE MODAL */}
      <Dialog
        open={showUpdate}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Assignment"}</DialogTitle>
        <DialogContent>
          {/* <form onSubmit={handleSubmit} id="subscription-form"> */}
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="Title"
            label="Title"
            value={TodoUpdate.title}
            onChange={(e) => {
              setTodoUpdate({ ...TodoUpdate, title: e.target.value });
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="Details"
            label="Details"
            value={TodoUpdate.details}
            onChange={(e) => {
              setTodoUpdate({ ...TodoUpdate, details: e.target.value });
            }}
            fullWidth
            variant="standard"
          />
          {/* </form> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Cancel</Button>
          <Button onClick={() => handleUpdateConfirm(task.id)} autoFocus>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      {/*==== UPDATE MODAL ====*/}

      <Card
        sx={{
          minWidth: 275,
          bgcolor: "#283593",
          margin: 4,
          transition: "all 0.3s ease",
          transformOrigin: "center",
          "&:hover": {
            paddingBottom: "20px",
            paddingTop: "20px",
            boxShadow: "2px 4px 7px black",
          },
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }} sx={{ color: "#fff", p: 1.5 }}>
              <Typography
                variant="h5"
                align="left"
                sx={{ textDecoration: task.done ? "line-through" : "" }}
              >
                {task.title}
              </Typography>
              {task.desc && (
                <Typography variant="body2" align="left">
                  {task.desc}
                </Typography>
              )}
            </Grid>

            <Grid
              size={{ xs: 12, md: 4 }}
              display="flex"
              justifyContent="flex-end"
              gap={1}
              sx={{ p: 1 }}
            >
              <IconButton
                sx={{
                  backgroundColor: task.done ? "green" : "white",
                  border: "2px solid green",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "50%",
                  width: 50,
                  height: 50,
                  "&:hover": {
                    bgcolor: "#cbd4c4ff",
                    boxShadow: "2px 4px 7px black",
                  },
                }}
                onClick={() => taskDone(task.id)}
              >
                <CheckIcon />
              </IconButton>

              <IconButton
                sx={{
                  background: "white",
                  border: "2px solid blue",
                  color: "blue",
                  borderRadius: "50%",
                  width: 50,
                  height: 50,

                  "&:hover": {
                    bgcolor: "#cbd4c4ff",
                    boxShadow: "2px 4px 7px black",
                  },
                }}
                onClick={handleUpdate}
              >
                <Edit />
              </IconButton>
              <IconButton
                sx={{
                  background: "white",
                  border: "2px solid red",
                  color: "red",
                  borderRadius: "50%",
                  width: 50,
                  height: 50,
                  "&:hover": {
                    bgcolor: "#cbd4c4ff",
                    boxShadow: "2px 4px 7px black",
                  },
                }}
                onClick={handleDelete}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
