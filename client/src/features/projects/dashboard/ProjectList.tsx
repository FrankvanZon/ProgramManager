import { Box } from "@mui/material";
import ProjectCard from "./ProjectCard";

type Props = {
    projects: Project[]
    selectProject : (id: string) => void;
    openForm : (id:string) => void;
    deleteProject: (id :string) => void;
}

export default function ProjectList({projects, selectProject, openForm, deleteProject}: Props) {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
        {projects.map(project => (
            <ProjectCard key={project.id} 
              project={project}
              selectProject={selectProject}
              openForm={openForm}
              deleteProject={deleteProject}
              />
        ))}
    </Box>
  )
}