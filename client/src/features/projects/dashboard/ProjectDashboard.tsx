import { Grid2 } from "@mui/material";
import ProjectList from "./ProjectList";

export default function ProjectDashboard() {


    return (
      <Grid2 container spacing={3}>
          <Grid2 size={7}>
              <ProjectList />
          </Grid2>
          <Grid2 size={5}>
            Project filters go here
          </Grid2>
      </Grid2>
  )
}