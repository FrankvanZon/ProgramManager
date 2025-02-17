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
    submitForm: (project: Project) => void;
    deleteProject: (id :string) => void;
}

export default function ProjectDashboard(
    {projects, selectProject,cancelSelectProject,selectedProject,
        openForm, closeForm, editMode, submitForm, deleteProject
    }: Props) {
  return (
      <Grid2 container spacing={3}>
          <Grid2 size={7}>
              <ProjectList 
                    projects={projects}
                    selectProject={selectProject}
                    openForm={openForm}
                    deleteProject={deleteProject}
                />
          </Grid2>
          <Grid2 size={5}>
            {selectedProject && !editMode && <ProjectDetails 
                project={selectedProject}
                cancelSelectProject={cancelSelectProject}
                openForm={openForm}

            />}
            {editMode && <ProjectForm
                project={selectedProject}
                closeForm={closeForm}
                submitForm={submitForm}
            />}
          </Grid2>
      </Grid2>
  )
}