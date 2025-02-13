import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"

function App() {
  const [projects, setProjects] = useState<Project[]>([]); //Store data

  //load data using axios
  useEffect(()=> {
    axios.get<Project[]>('https://localhost:5001/api/projects')
      .then(response => setProjects(response.data))
  },[]) //Empty array alternative

  return (
    <>
      <Typography variant='h3'>Program Manager</Typography>
      <List>
        {projects.map((project) => (
          <ListItem key={project.id}>
            <ListItemText>{project.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default App
