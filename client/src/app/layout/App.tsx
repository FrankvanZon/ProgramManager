import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import NavBar from "./NavBar";
import ProjectDashboard from "../../features/projects/dashboard/ProjectDashboard";

function App() {
  const [projects, setProjects] = useState<Project[]>([]); //Store data
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);


  //load data using axios
  useEffect(()=> {
    axios.get<Project[]>('https://localhost:5001/api/projects')
      .then(response => setProjects(response.data))
  },[]) //Empty array alternative

  const handleSelectedProject = (id : string) => {
    setSelectedProject(projects.find(x => x.id === id));
  }

  const handleCancelSelectedProject = () =>{
    setSelectedProject(undefined);
  }

  const handleOpenForm = (id? : string) => {
    if (id) handleSelectedProject(id);
      else handleCancelSelectedProject();
    setEditMode(true);
  }

  const handleCloseForm = () => {
    setEditMode(false);
  }

  const handleSubmitForm = (project: Project) =>{
    if (project.id) {
      setProjects(projects.map(x => x.id === project.id ? project : x))
    } else {
      const newProject = {...project, id:projects.length.toString()}
      setSelectedProject(newProject);
      setProjects([...projects, newProject])
      } 
      setEditMode(false);
    }

    const handleDelete = (id: string) => {
      setProjects(projects.filter(x => x.id !== id))
    }
  

  return (
    <Box sx={{bgcolor: '#eeeeee'}}>
      <CssBaseline />
      <NavBar
        openForm={handleOpenForm}
      />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        <ProjectDashboard 
          projects={projects}
          selectProject={handleSelectedProject}
          cancelSelectProject={handleCancelSelectedProject}
          selectedProject={selectedProject}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleCloseForm}
          submitForm={handleSubmitForm}
          deleteProject={handleDelete}
        />
      </Container>
    </Box>
  )
}

export default App
