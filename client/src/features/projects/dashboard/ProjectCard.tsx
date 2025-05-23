import { CalendarMonth } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Divider, Grid2, Typography } from "@mui/material"
import { useNavigate } from "react-router";
import { useStore } from "../../../lib/hooks/useStore";
import MilestonePopever from "../../../app/layout/shared/components/MilestonePopover";
import getMilestoneTarget from "./geMilestoneTarget";
type Props = {
    project: Project
}

export default function ProjectCard({project}: Props) {
  const {milestoneStore} = useStore();
  const navigate = useNavigate();

  return (
    <Card elevation={3} sx={{ borderRadius: 2 }}>
      <Grid2 container>
        <Grid2 size={3}>
        <CardMedia
            component="img"
            height="300"
            image={project.imageUrl?.trim()
                    ? project.imageUrl
                    : `/images/clusterImages/${project.cluster}.jpg`}
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
                  {project.program} | {project.cluster} | {project.category}
                </>
              } />

            <Box display='flex' flexDirection='column' gap={0} mr={2} >
              {(project.programStatus=="Cancelled") && <Chip label={project.programStatus} color="error" sx={{ borderRadius: 2 }} />}
              {(project.programStatus!="Cancelled") && <Chip label={project.programStatus} color={'default'} />}
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
                 {project.currentPhase} : {milestoneStore.currentMilestone(project.milestoneID)}
              </Typography>
            </Box>
            <Divider />
            <Box display={"flex"} gap={2} alignContent={"center"} mb={1} px={2} sx={{ backgroundColor: 'grey.200' }}>
              <CalendarMonth sx={{ mr: 1 }} />
              <Typography>{getMilestoneTarget(project, 'NPDL', 'CR')}</Typography>
              
              
            </Box>
            
          </CardContent>
          <Typography sx={{ mr: 2, ml: 3, mt: 1, whiteSpace: 'pre-line' }} variant="body2">
            {project.description}
            </Typography>
          
          <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>  
            <Box display='flex' gap={1} sx={{ mr: 1, ml: 1, mb: 1 }}>
              <Button onClick={() => navigate(`/projects/${project.id}`)} size="small" variant="contained">View</Button>
              <Button onClick={() => navigate(`/manage/${project.id}`)} size="small" variant="contained">Edit</Button>
            </Box>
          </CardActions>
        </Grid2>

      </Grid2>
    </Card>
  )
}