import { Card, CardMedia, Box, Typography, Chip } from "@mui/material";
import { Link } from "react-router";
import StyledButton from "../../../app/layout/shared/components/StyledButton";
import { useStore } from "../../../lib/hooks/useStore";

type Props = {
    project: Project
}


export default function ProjectDetailsHeader({ project }: Props) {
    const { milestoneStore } = useStore();

    return (
        <Card sx={{ position: 'relative', mb: 2, backgroundColor: 'transparent', overflow: 'hidden' }}>
            {!project.isCancelled && (
                <Chip
                    sx={{ position: 'absolute', left: 20, top: 20, borderRadius: 2, zIndex: 1000 }}
                    color="primary"
                    label={project.programStatus}
                />
            )}
            <CardMedia
                component="img"
                height="300"
                image={`/images/clusterImages/${project.cluster}.jpg`}
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
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <StyledButton
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/manage/${project.id}`}
                        disabled={project.isCancelled}
                    >
                        Manage
                    </StyledButton>
                </Box>
            </Box>
        </Card>
    )
}