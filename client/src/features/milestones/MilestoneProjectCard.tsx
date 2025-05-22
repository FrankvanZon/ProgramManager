import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Card, Box, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useProjects } from "../../lib/hooks/useProjects";
import { useParams } from "react-router";
import MilestonePopover from "../../app/layout/shared/components/MilestonePopover";
import { useStore } from "../../lib/hooks/useStore";

type Props = {
    project: Project;
    filterUpdate: () => void;
}

const MilestoneProjectCard = observer(function MilestoneProjectCard({ project, filterUpdate }: Props) {
    //const {projectStore} = useStore()
    const { id } = useParams();
    const { updateProjectMilestone, refetch } = useProjects(id);
    const{milestoneStore} = useStore()


    const incrementMilestoneID = () => {
        const data: ProjectMilestoneUpdate = {
            id: project.id,
            newMilestoneId: milestoneStore.getNextOrPreviousPhase(project.milestoneID,"Next")
        };

        updateProjectMilestone.mutateAsync(data, {
            onSuccess: () => {
                refetch(); 
            }    
        });
        filterUpdate();
    };

    const decrementMilestoneID = () => {
        const data: ProjectMilestoneUpdate = {
            id: project.id,
            newMilestoneId: milestoneStore.getNextOrPreviousPhase(project.milestoneID,"Previous")
        };

        updateProjectMilestone.mutateAsync(data, {
            onSuccess: () => {
                refetch(); 
            }    
        });
        filterUpdate();
    };

    return (
        <Card elevation={2} sx={{ borderRadius: 2, gap: 1 }}>
            <Box display='flex' justifyContent={'space-between'} alignItems={'center'} mb={1} mt={1} mr={1} ml={1}>
                <Button
                    disabled={project.milestoneID === milestoneStore.filterByMilestoneMin+1}
                    onClick={decrementMilestoneID}
                ><ArrowBack /></Button>


                <Box display='flex' justifyContent='start' width={300} alignItems='center'>
                    <MilestonePopover project={project} />
                    <Box sx={{ textAlign: 'center', mx: 2 }}>{project.name}</Box>
                </Box>


                <Button
                    disabled={project.milestoneID === milestoneStore.filterByMilestoneMax-1}
                    onClick={incrementMilestoneID}
                ><ArrowForward /></Button>
            </Box>
        </Card>
    )
})

export default MilestoneProjectCard