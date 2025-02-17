import { Grid2 } from "@mui/material";
import ProjectList from "./ProjectList";
import ProjectDetails from "../details/ProjectDetails";
import ProjectForm from "../form/ProjectForm";

type Props = {
    projects : Project[]
    selectProject : (id: string) => void;
    cancelSelectProject : () => void;
    selectedProject? : Project;
    openForm: (id: string) => void;
    closeForm: () => void;
    editMode: boolean;

}

export default function ProjectDashboard(
    {projects, selectProject,cancelSelectProject,selectedProject,
        openForm, closeForm, editMode
    }: Props) {
  return (
      <Grid2 container spacing={3}>
          <Grid2 size={7}>
              <ProjectList 
                    projects={projects}
                    selectProject={selectProject}
                    openForm={openForm}
                />
          </Grid2>
          <Grid2 size={5}>
            {selectedProject && !editMode && <ProjectDetails 
                selectedProject={selectedProject}
                cancelSelectProject={cancelSelectProject}
                openForm={openForm}

            />}
            {editMode && <ProjectForm
                project={selectedProject}
                closeForm={closeForm}
            />}
          </Grid2>
      </Grid2>
  )
}