import "./App.css";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";

function App() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  //array
  const [tasks, setTasks] = useState(storedTasks);
  //task variable
  const [taskDescription, setTaskDescription] = useState("");
  //search task
  const [searchDescription, setSearchDescription] = useState("");
  //alertError
  const [showError, setShowError] = useState(false);
  //alertCheck
  const [checkMessage, setCheckMessage] = useState(false);
  //localstorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //FUNCTIONS:

  //Checkbox
  const handleToggle = (task) => () => {
    if (task.isDone) {
      task.isDone = false;
    } else {
      task.isDone = true;
    }

    const newTaskList = tasks.map((value) => {
      if (value.id === task.id) {
        value.isDone = task.isDone;
        if (task.isDone && value.id === task.id) {
          setCheckMessage(true);
          setTimeout(() => {
            setCheckMessage(false);
          }, 3000);
        } else {
          setCheckMessage(false);
        }
      }
      return value;
    });
    setTasks(newTaskList);
  };

  //Delete task
  const handleDelete = (id) => {
    const newTaskList = tasks.filter((value) => value.id !== id);
    setTasks(newTaskList);
  };

  //Add task
  function addTask() {
    console.log(taskDescription);
    if (taskDescription.length === 0) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    const newId = tasks.length + 1;

    var newTask = {
      id: newId,
      taskDescription: taskDescription,
      isDone: false,
    };

    setTasks([...tasks, newTask]);
    setTaskDescription("");
  }

  //Search task
  function searchTask() {
    if (searchDescription !== "") {
      const filteredTasks = tasks.filter((task) =>
        task.taskDescription
          .toLowerCase()
          .includes(searchDescription.toLowerCase())
      );
      const otherTasks = tasks.filter(
        (task) =>
          !task.taskDescription
            .toLowerCase()
            .includes(searchDescription.toLowerCase())
      );

      const priorityList = [...filteredTasks, ...otherTasks];
      setTasks(priorityList);
      setSearchDescription("");
    }
  }

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "600px",
        margin: " 40px auto",
        paddingTop: "10px",
        backgroundColor: "#fefefe",
        borderRadius: "10px",
      }}
    >
      <h1 style={{ color: "#1976D2", fontSize: "30px" }}>To Do List</h1>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 2, width: "25ch" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flexWrap: "wrap", //reponsividade
          gap: "10px", //responsividade
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          value={searchDescription}
          onChange={(e) => setSearchDescription(e.target.value)}
          label="Search..."
          sx={{ flex: "1 1 200px" }} //responsividade
        />

        <Button
          onClick={searchTask}
          variant="contained"
          sx={{
            padding: "8px 16px",
            fontSize: "0.7rem",
            fontWeight: "bold",
            border: "1px solid #E4F1FE",
            backgroundColor: "#E4F1FE",
            color: "#1976D2",
            "&:hover": {
              color: "#E4F1FE",
              backgroundColor: "#1976D2",
            },
          }}
        >
          Search
        </Button>

        <Divider />
      </Box>
      <p style={{ color: "#1976D2", fontSize: "17px" }}>
        Check if task is completed
      </p>

      {checkMessage && (
        <Alert severity="success">Well done! Task completed </Alert>
      )}

      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "#fefefe",
          "&:hover": {
            backgroundColor: "#e4f1fe",
          },
        }}
      >
        {tasks.map((value) => {
          const labelId = `checkbox-list-label-${value.id}`;

          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ListItem
                key={value}
                sx={{
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "8px",
                  marginBottom: "8px",
                }}
                secondaryAction={
                  <IconButton
                    onClick={() => handleDelete(value.id)}
                    edge="end"
                    sx={{
                      color: "#840807",
                      "&:hover": {
                        backgroundColor: "#e4f1fe",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(value)}
                  dense
                >
                  <ListItemIcon sx={{ color: "#840807" }}>
                    <Checkbox
                      edge="start"
                      checked={value.isDone}
                      tabIndex={-1}
                      disableRipple
                      sx={{
                        "&:hover": {
                          backgroundColor: "#e4f1fe",
                        },
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={`${value.taskDescription}`}
                  />
                </ListItemButton>
              </ListItem>
            </Box>
          );
        })}
      </List>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 2, width: "25ch" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flexWrap: "wrap", //reponsividade
          gap: "10px", //responsividade
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          label="Add a new task here!"
          sx={{ flex: "1 1 200px" }} //responsividade
        />

        <Button
          onClick={addTask}
          variant="contained"
          size="small"
          sx={{
            padding: "8px 16px",
            fontSize: "0.7rem",
            fontWeight: "bold",
            border: "1px solid #E4F1FE",
            backgroundColor: "#E4F1FE",
            color: "#1976D2",
            "&:hover": {
              color: "#E4F1FE",
              backgroundColor: "#1976D2",
            },
          }}
        >
          ADD
        </Button>
        {showError && <Alert severity="error">Please add a task.</Alert>}
      </Box>
    </Box>
  );
}

export default App;
