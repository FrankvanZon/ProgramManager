import { CalendarMonth } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Divider, Grid2, Typography } from "@mui/material"
import { useNavigate } from "react-router";
import { formatDate } from "../../../lib/util/util";
import { useStore } from "../../../lib/hooks/useStore";
import MilestonePopever from "../../../app/layout/shared/components/MilestonePopover";
type Props = {
    project: Project
}

export default function ProjectCard({project}: Props) {
  const {milestoneStore} = useStore();
  const navigate = useNavigate();
  const isCommitted = false;
  const isProgrammed = false;
  const color = isCommitted ? 'secondary' : 'default';
  const label = isCommitted ? 'Commmited' : isProgrammed? 'Programmed' : 'Proposed';

  return (
    <Card elevation={3} sx={{ borderRadius: 2 }}>
      <Grid2 container>
        <Grid2 size={3}>
        <CardMedia
            component="img"
            height="300"
            image={`/images/clusterImages/${project.cluster}.jpg`}
            alt={'office image'}
        />
        </Grid2>

        <Grid2 size={9} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <CardHeader
              avatar={<MilestonePopever project={project}/>}
              title={project.name}
              titleTypographyProps={{
                fontWeight: 'bold',
                fontSize: 20
              }}
              subheader={
                <>
                  {project.cluster}
                </>
              } />

            <Box display='flex' flexDirection='column' gap={0} mr={2} >
              {(project.isCancelled) && <Chip label='Cancelled' color="error" sx={{ borderRadius: 2 }} />}
              {(!project.isCancelled) && <Chip label={label} color={color} />}
            </Box>
          </Box>

          <Divider sx={{ mb: 1 }} />
          <CardContent sx={{ p: 0 }} >
            <Box display='flex' alignItems='center' justifyContent='space-between' >
              <Box display={"flex"} alignContent={"center"} mb={1} px={2} >
              <Box display={"flex"} alignItems={"center"} flexGrow={0} >
              </Box>
                <Typography sx={{ mr: 1, ml: 1 }} variant="subtitle1">{project.category}</Typography>
                <Typography sx={{ mr: 1, ml: 1 }} variant="subtitle1">{project.team}</Typography>
              </Box>
              <Typography sx={{ alignContent: 'flex-end', mr: 2, ml: 2 }} variant="subtitle1">
                 {milestoneStore.Phase[project.milestoneID]} : {milestoneStore.Milestone[project.milestoneID]}
              </Typography>
            </Box>
            <Divider />
            <Box display={"flex"} gap={2} alignContent={"center"} mb={1} px={2} sx={{ backgroundColor: 'grey.200' }}>
              <CalendarMonth sx={{ mr: 1 }} />
              <Typography>{formatDate(project.releaseDate)}</Typography>
              
              
            </Box>
            
          </CardContent>
          <Typography sx={{ mr: 2, ml: 3, mt: 1, whiteSpace: 'pre-line' }} variant="body2">
            {project.description}
            </Typography>
          
          <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>  
            <Box display='flex' gap={1} sx={{ mr: 1, ml: 1, mb: 1 }}>
              <Button onClick={() => navigate(`/projects/${project.id}`)} size="small" variant="contained">View</Button>
              <Button onClick={() => navigate(`/manage/${project.id}`)} size="small" variant="contained">Edit</Button>
              <Button size="small" variant="contained">Team</Button>
            </Box>
          </CardActions>
        </Grid2>

      </Grid2>
    </Card>
  )
}