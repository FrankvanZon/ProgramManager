import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Card, Box, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useProjects } from "../../lib/hooks/useProjects";
import { useParams } from "react-router";
// import { useStore } from "../../lib/hooks/useStore";

type Props = {
    project: Project
}




const MilestoneProjectCard = observer( function MilestoneProjectCard({ project }: Props) {
    //const {projectStore} = useStore()
    const {id} = useParams();
    const {updateProject} = useProjects(id);   


    const incrementMilestoneID = () => {
        let data: Project = { ...project };
        
        data = project;
        data.milestoneID = project.milestoneID+1;
        
        
        //projectStore.updateProject(project);
        updateProject.mutateAsync(data);
        
    };

    const decrementMilestoneID = () => {
        let data: Project = { ...project };
        
        data = project;
        data.milestoneID = project.milestoneID-1;

        //projectStore.updateProject(project)
        updateProject.mutateAsync(project)
        
    };



    return (
        <Card elevation={2} sx={{ borderRadius: 2, gap: 1 }}>
            <Box display='flex' alignItems='center' justifyContent='space-between' mb={1} mt={1} mr={1} ml={1}>
                <Button 
                    disabled = {project.milestoneID === 0}
                    onClick={decrementMilestoneID} 
                    ><ArrowBack /></Button>
                
                {project.name}
                
                <Button 
                    disabled = {project.milestoneID === 11}
                    onClick={incrementMilestoneID}
                    ><ArrowForward /></Button>
            </Box>
        </Card>
    )
})

export default MilestoneProjectCard