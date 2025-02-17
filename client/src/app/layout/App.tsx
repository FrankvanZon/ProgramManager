import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useState } from "react"
import NavBar from "./NavBar";
import ProjectDashboard from "../../features/projects/dashboard/ProjectDashboard";
import { useProjects } from "../../lib/hooks/useProjects";

function App() {
  
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const {projects, isPending} = useProjects()



  const handleSelectedProject = (id : string) => {
    setSelectedProject(projects!.find(x => x.id === id));
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

 

  return (
    <Box sx={{bgcolor: '#eeeeee', minHeight: '100vh'}}>
      <CssBaseline />
      <NavBar
        openForm={handleOpenForm}
      />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        { !projects || isPending ? (
          <Typography>Loading...</Typography>
        ) : (
        <ProjectDashboard 
          projects={projects}
          selectProject={handleSelectedProject}
          cancelSelectProject={handleCancelSelectedProject}
          selectedProject={selectedProject}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleCloseForm}
        />
        )}
      </Container>
    </Box>
  )
}

export default App
