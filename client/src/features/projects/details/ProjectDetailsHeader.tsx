import { Card, CardMedia, Box, Typography, Chip } from "@mui/material";
import { Link } from "react-router";
import { formatDate } from "../../../lib/util/util";
import { useProjects } from "../../../lib/hooks/useProjects";
import StyledButton from "../../../app/layout/shared/components/StyledButton";

type Props = {
    project: Project
}


export default function ProjectDetailsHeader({ project }: Props) {
    const { updateFollowing } = useProjects(project.id);

    return (
        <Card sx={{ position: 'relative', mb: 2, backgroundColor: 'transparent', overflow: 'hidden' }}>
            {!project.isCancelled && (
                <Chip
                    sx={{ position: 'absolute', left: 20, top: 20, borderRadius:2, zIndex: 1000 }}
                    color="primary"
                    label="Proposed"
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
                    <Typography variant="subtitle1">{formatDate(project.releaseDate)}</Typography>
                    <Typography variant="subtitle2">
                        Managed by <Link to={`/profiles/${project.ownerId}`} style={{ color: 'white', fontWeight: 'bold' }}>{project.ownerDisplayName}</Link>
                    </Typography>
                </Box>

                {/* Buttons aligned to the right */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {/*To be updated after role implementation*/}
                    {project.isOwner ? (
                        <>
                            <StyledButton
                                variant="contained"
                                color="primary"
                                component={Link}
                                to={`/manage/${project.id}`}
                                disabled={project.isCancelled}
                            >
                                Manage
                            </StyledButton>
                        </>
                    ) : (
                        <StyledButton
                            variant="contained"
                            color={project.isFollowing ? 'error' : 'success'}
                            onClick={() => updateFollowing.mutate(project.id)}
                            disabled={updateFollowing.isPending || project.isCancelled}
                        >
                            {project.isFollowing ? 'Unfolow' : 'Follow'}
                        </StyledButton>
                    )}
                </Box>
            </Box>
        </Card>
    )
}