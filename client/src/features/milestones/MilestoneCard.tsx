import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Link, useNavigate } from "react-router"

type Props = {
    project: Project
}

export default function MilestoneCard({project}: Props) {
const navigate = useNavigate();

const milestoneNames = project.currentPhase === 'APC' 
    ? ['PI', 'PS', 'PR', 'PC'] 
    : ['PI', 'PS', 'AA', 'PPC', 'PV', 'SR', 'CR'];

const milestones = project.phases
    .filter(p => p.phase === project.currentPhase)
    .flatMap(p => p.milestones)
    .filter(milestone => milestoneNames.includes(milestone.name))
    .sort((a, b) => milestoneNames.indexOf(a.name) - milestoneNames.indexOf(b.name));

  return (
    <Link 
        to={`/projects/${project.id}`} 
        onClick={() => navigate(`/projects/${project.id}`)}
        style={{textDecoration: 'none'}}>
        <Card sx={{borderRadius:2, p:3, maxWidth:300, textDecoration: 'none', alignItems: 'center'}}
            elevation={4}
            >
            <CardContent>
                <Box display={"flex"} flexDirection="column" alignItems="center" gap={1}>
                <Typography variant="h5" sx={{ textAlign: 'center' }}>{project.name}</Typography>
                <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>Go to details</Typography>
                </Box>
            </CardContent>
            
            {milestones.length > 0 && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ padding: '4px' }}>Milestone</TableCell>
                                <TableCell sx={{ padding: '4px' }}>Target</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {milestones.map((milestone, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ padding: '4px' }}>{milestone.name}</TableCell>
                                    <TableCell sx={{ padding: '4px' }}>{milestone.target}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Card>
    </Link>
  )
}
