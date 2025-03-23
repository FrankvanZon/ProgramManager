import { Grid2, Typography } from "@mui/material"
import { useParams } from "react-router";
import { useProjects } from "../../../lib/hooks/useProjects";
import ProjectDetailsHeader from "./ProjectDetailsHeader";
import ProjectDetailsInfo from "./ProjectDetailsInfo";
import ProjectDetailsChat from "./ProjectDetailsChat";
import ProjectDetailsSideBar from "./ProjectDetailsSideBar";

export default function ProjectDetailsPage() {
    const {id} = useParams();
    const {project, isLoadingProject} = useProjects(id); 

    if (isLoadingProject) return <Typography>Loading...</Typography>
    if (!project) return <Typography>Project not found</Typography>
  
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={4}>
                <ProjectDetailsHeader project={project}/>
                <ProjectDetailsInfo project={project}/>
                

            </Grid2>
            <Grid2 size={8}>
                <ProjectDetailsSideBar project={project}/>
                <ProjectDetailsChat />  
            </Grid2>
        </Grid2>
    )
}