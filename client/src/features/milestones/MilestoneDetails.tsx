import { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, Button, Box
} from '@mui/material';
import { useParams } from 'react-router';
import { useProjects } from '../../lib/hooks/useProjects';

type Props = {
    Milestones: string[];
    PhaseFilter: string;
};

const MilestoneDetails = ({Milestones, PhaseFilter} : Props) => {
    const { id } = useParams();
    const { project, refetch, updateProjectMilestonePlan } = useProjects(id);

    const [data, setData] = useState<Milestone[]>([]);
    const [originalData, setOriginalData] = useState<Milestone[]>([]);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        if (project) {
            const apcPhase = project.phases.find((phase) => phase.phase === PhaseFilter);

            if (apcPhase && apcPhase.required) {
                const existingMilestones = apcPhase.milestones.filter((m: Milestone) =>
                    Milestones.includes(m.name)
                );

                // If some or all milestones are missing, initialize them
                if (existingMilestones.length < Milestones.length) {
                    const filledMilestones: Milestone[] = Milestones.map((name) => {
                        const existing = existingMilestones.find((m) => m.name === name);
                        return existing || {
                            id: '', // will be assigned by backend
                            name,
                            target: 0,
                            realized: 0,
                            onTime: 0,
                            projectPhaseId: apcPhase.id || ''
                        };
                    });

                    setData(filledMilestones);
                    setOriginalData(filledMilestones);
                    setIsCreating(true);
                } else {
                    // All milestones exist
                    const sorted = existingMilestones.sort(
                        (a, b) => Milestones.indexOf(a.name) - Milestones.indexOf(b.name)
                    );
                    setData(sorted);
                    setOriginalData(sorted);
                    setIsCreating(false);
                }
            }
        }
    }, [project, Milestones, PhaseFilter]);

    const handleChange = (index: number, field: 'target' | 'realized', value: string) => {
        const updated = [...data];
        updated[index] = {
            ...updated[index],
            [field]: Number(value)
        };
        setData(updated);
    };

    const handleSave = async () => {
        try {
            if (data) {
                updateProjectMilestonePlan.mutate(data, {
                    onSuccess: () => {
                        refetch(); 
                    }    
                })
            } 
        } catch (error) {
            console.log(error)
        }
    };

    const isDataChanged = JSON.stringify(data) !== JSON.stringify(originalData);

    if (!project || !project.phases.find((phase) => phase.phase === PhaseFilter)?.required) {
        return null;
    }

    return (
        <TableContainer sx={{ padding: 0, mb: 1 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Milestone</TableCell>
                        <TableCell>Plan</TableCell>
                        <TableCell>Actual</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={row.name}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    value={row.target}
                                    onChange={(e) => handleChange(index, 'target', e.target.value)}
                                    variant="outlined"
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    value={row.realized}
                                    onChange={(e) => handleChange(index, 'realized', e.target.value)}
                                    variant="outlined"
                                    size="small"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box display="flex" justifyContent="flex-end" padding={2}>
                <Button onClick={handleSave} color="success" variant="contained"
                disabled={!isDataChanged}
                >
                    {isCreating ? 'Save' : 'Update'}
                </Button>
            </Box>
        </TableContainer>
    );
};

export default MilestoneDetails;
