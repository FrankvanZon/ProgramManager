import { useState } from "react";
import { FormControl, MenuItem, Select, Box, Button } from "@mui/material";
import { useStore } from "../../lib/hooks/useStore";
import { useProjects } from "../../lib/hooks/useProjects";

type Props = {
    project: Project;
}

const MilestoneSelector = ({ project }: Props) => {
    const { milestoneStore } = useStore();
    const { updateProjectMilestone, refetch } = useProjects();
    const milestones = milestoneStore.Milestones;

    const currentMilestone = milestones.find(m => m.phaseId === project.milestoneID);

    const [selectedStatus, setSelectedStatus] = useState(currentMilestone?.programStatus || "");
    const [selectedPhase, setSelectedPhase] = useState(currentMilestone?.phase || "");
    const [selectedMilestoneId, setSelectedMilestoneId] = useState(project.milestoneID);

    const uniqueStatuses = [...new Set(
        milestones.map(m => m.programStatus)
    )].filter(status =>
        !["new", "cancelled", "released"].includes(status.toLowerCase())
    );

    const filteredPhases = [...new Set(
        milestones
            .filter(m => m.programStatus === selectedStatus)
            .map(m => m.phase)
    )];

    const filteredMilestones = milestones.filter(
        m => m.programStatus === selectedStatus && m.phase === selectedPhase
    );

    const handleSave = () => {
        const data: ProjectMilestoneUpdate = {
            id: project.id,
            newMilestoneId: selectedMilestoneId
        };

        updateProjectMilestone.mutateAsync(data, {
            onSuccess: () => {
                refetch();
            }
        });
    };

    return (
        <Box display="flex" gap={2} alignItems="center">
            <FormControl size="small">
                <Select value={selectedStatus} onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setSelectedPhase("");
                    setSelectedMilestoneId(-1);
                }}>
                    {uniqueStatuses.map(status => (
                        <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl size="small" disabled={!selectedStatus}>
                <Select value={selectedPhase} onChange={(e) => {
                    setSelectedPhase(e.target.value);
                    setSelectedMilestoneId(-1);
                }}>
                    {filteredPhases.map(phase => (
                        <MenuItem key={phase} value={phase}>{phase}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl size="small" disabled={!selectedPhase}>
                <Select value={selectedMilestoneId} onChange={(e) => setSelectedMilestoneId(Number(e.target.value))}>
                    {filteredMilestones.map(m => (
                        <MenuItem key={m.phaseId} value={m.phaseId}>{m.milestone}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box display="flex" justifyContent="flex-end" padding={2}>
                <Button variant="contained" onClick={handleSave} disabled={selectedMilestoneId === project.milestoneID}>
                    Save
                </Button>
            </Box>
        </Box>
    );
};

export default MilestoneSelector;