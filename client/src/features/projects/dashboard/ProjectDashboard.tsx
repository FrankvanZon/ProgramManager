import { Grid2 } from "@mui/material";
import ProjectList from "./ProjectList";
import ProjectFilter from "./ProjectFilter";

export default function ProjectDashboard() {


    return (
      <Grid2 container spacing={3}>
          <Grid2 size={8}>
              <ProjectList />
          </Grid2>
          <Grid2 size={4}>
              <ProjectFilter />
          </Grid2>
      </Grid2>
  )
}