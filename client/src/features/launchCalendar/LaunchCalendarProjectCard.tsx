import { Box, Card, CardContent, CardHeader, CardMedia, Chip, Grid2, Typography } from "@mui/material"
import { useStore } from "../../lib/hooks/useStore";
import { formatDate } from "../../lib/util/util";
import MilestonePopever from "../../app/layout/shared/components/MilestonePopover";


type Props = {
    project: Project
}

export default function LaunchCalendarProjectCard({ project }: Props) {
    const {milestoneStore} = useStore();
    //const isCommitted = false;
    //const isProgrammed = false;
    //const isCancelled = false;
    //const color = isCommitted ? 'secondary' : 'default';
    //const label = isCommitted ? 'Commmited' : isProgrammed? 'Programmed' : 'Proposed';

    const isNPDL = project.phases.find(p => p.phase === "NPDL" && p.required)?.required ?? false;
        
    return (
        <Card elevation={3} sx={{ borderRadius: 2, mb: 1 }}>
            <Grid2 container>
                <Grid2 size={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CardMedia
                        component="img"
                        sx={{
                            width: '100%',
                            height: '100%',
                            aspectRatio: '1 / 1', // Ensures equal width and height
                            objectFit: 'fill'  // Ensures the media covers the box
                        }}
                        image={`/images/clusterImages/${project.cluster}.jpg`}
                        alt={'office image'}
                    />
                </Grid2>

                <Grid2 size={9} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box display='flex' alignItems='top' justifyContent='space-between' >
                        
                        <CardHeader
                            avatar={<MilestonePopever project={project}/>}
                            title={
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: 18,
                                        
                                    }}
                                >
                                    {project.name}
                                </Typography>
                            }
                        />

                        {(isNPDL) && <Chip label="NPDL" 
                        sx={{
                            position: 'relative',
                            backgroundColor: 'lightgreen',
                            top: 0,
                            right: 0,
                            mr: 1,
                            mt: 2
                        }} />}
                        {(!isNPDL) && <Chip label="CIB" sx={{
                            position: 'relative',
                            backgroundColor: '#D1C4E9',
                            top: 0,
                            right: 0,
                            mr: 1,
                            mt: 2
                        }} />}
                    </Box>
                    <CardContent sx={{ p: 0 }}>
                        <Box display='flex' alignItems='center' justifyContent='space-between'>
                            <Typography sx={{ alignContent: 'flex-end', mr: 2, ml: 2 }} variant="subtitle2">
                                {formatDate(project.releaseDate)}
                            </Typography>
                            <Typography sx={{ alignContent: 'flex-end', mr: 2, ml: 2 }} variant="subtitle2">
                                {milestoneStore.Milestone[project.milestoneID]}
                            </Typography>
                        </Box>
                    </CardContent>
                </Grid2>
            </Grid2>
        </Card>
    );
}