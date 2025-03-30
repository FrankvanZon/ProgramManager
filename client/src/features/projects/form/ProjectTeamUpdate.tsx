import { Box, Button, Paper, Typography } from "@mui/material";
import { useProjects } from "../../../lib/hooks/useProjects";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form"
import { useEffect } from "react";
import { projectSchema, ProjectSchema } from "../../../lib/schemas/projectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectInput from "../../../app/layout/shared/components/SelectInput";
import { teamOptions } from "./teamOptions";

export default function ProjectForm() {
    const { reset, control, handleSubmit } = useForm<ProjectSchema>({
        mode: 'onTouched',
        resolver: zodResolver(projectSchema)
    });
    const { id } = useParams();
    const { updateProject, project, isLoadingProject, refetch } = useProjects(id);
    const navigate = useNavigate();

    useEffect(() => {
        if (project) reset(project);
    }, [project, reset]);  
    
    const onSubmit = async (data: ProjectSchema) => {
        try {
            if (project) {
                updateProject.mutate({ ...project, ...data }, {
                    onSuccess: () => {
                        navigate(`/program/`);
                        refetch(); 
                    }    
                })
            } 
        } catch (error) {
            console.log(error)
        }

    }

    if (isLoadingProject) return <Typography>Loading...</Typography>

    if (!project) return <></>

    return (
        <Paper sx={{ borderRadius: 2, padding: 2, mb: 2  }}>
            <Typography variant="h6" gutterBottom color="primary">
                Update project team
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
                <Typography>{project?.name}</Typography>
                <SelectInput label='Team'
                    control={control}
                    name='team'
                    items={teamOptions}
                />
            
            <Box display="flex" justifyContent='end' gap={1}>
                <Button onClick={() => navigate('/program')} color="inherit">Cancel</Button>
                <Button
                    type="submit"
                    color="success"
                    disabled={updateProject.isPending}
                >Submit</Button>
            </Box>
        </Box>
    </Paper >
  )
}