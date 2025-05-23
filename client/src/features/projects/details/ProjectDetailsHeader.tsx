import { Card, CardMedia, Box, Typography, Chip } from "@mui/material";
import { Link, useParams } from "react-router";
import StyledButton from "../../../app/layout/shared/components/StyledButton";
import { useStore } from "../../../lib/hooks/useStore";
import { useProjects } from "../../../lib/hooks/useProjects";

type Props = {
    project: Project
}





export default function ProjectDetailsHeader({ project }: Props) {
    const { milestoneStore } = useStore();
    const { id } = useParams();
    const { updateProjectMilestone, refetch } = useProjects(id);


    const setMilestoneIDtoProgram = () => {
        const data: ProjectMilestoneUpdate = {
            id: project.id,
            newMilestoneId: project.milestoneID + 1
        };

        updateProjectMilestone.mutateAsync(data, {
            onSuccess: () => {
                refetch();
            }
        });
    };

    const setMilestoneIDtoCancelled = () => {
        const data: ProjectMilestoneUpdate = {
            id: project.id,
            newMilestoneId: -99
        };

        updateProjectMilestone.mutateAsync(data, {
            onSuccess: () => {
                refetch();
            }
        });
    };

    const setMilestoneIDtoNew = () => {
        const data: ProjectMilestoneUpdate = {
            id: project.id,
            newMilestoneId: 0
        };

        updateProjectMilestone.mutateAsync(data, {
            onSuccess: () => {
                refetch();
            }
        });
    };

    return (
        <Card sx={{ position: 'relative', mb: 2, backgroundColor: 'transparent', overflow: 'hidden' }}>
            {project.programStatus != "Cancelled" && (
                <Chip
                    sx={{ position: 'absolute', left: 20, top: 20, borderRadius: 2, zIndex: 1000 }}
                    color={project.programStatus === "Cancelled" ? "error" : "primary"}
                    label={project.programStatus}
                />
            )}
            <CardMedia
                component="img"
                height="300"
                image={project.imageUrl?.trim()
                    ? project.imageUrl
                    : `/images/clusterImages/${project.cluster}.jpg`}
                alt={'office image'}
            />
            <Box sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                color: 'white',
                padding: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 1.0), transparent)',
                boxSizing: 'border-box',
            }}>
                {/* Text Section */}
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{project.name}</Typography>
                    <Typography variant="subtitle1">{milestoneStore.currentMilestone(project.milestoneID)}</Typography>
                </Box>

                {/* Buttons aligned to the right */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {project.programStatus != "Cancelled" &&
                        <StyledButton
                            variant="contained"
                            color="primary"
                            component={Link}
                            to={`/manage/${project.id}`}

                        >
                            Edit
                        </StyledButton>}

                    {milestoneStore.currentProgramStatus(project.milestoneID) == 'Proposed' &&
                        <StyledButton
                            variant="contained"
                            color="success"
                            component={Link}
                            onClick={setMilestoneIDtoProgram}

                        >
                            Program
                        </StyledButton>}

                    {project.programStatus != "Cancelled" &&
                        <StyledButton
                            variant="contained"
                            color="error"
                            component={Link}
                            onClick={setMilestoneIDtoCancelled}

                        >
                            Cancel
                        </StyledButton>}

                    {project.programStatus == "Cancelled" &&
                        <StyledButton
                            variant="contained"
                            color="primary"
                            component={Link}
                            onClick={setMilestoneIDtoNew}

                        >
                            Restart
                        </StyledButton>}

                </Box>
            </Box>
        </Card>
    )
}