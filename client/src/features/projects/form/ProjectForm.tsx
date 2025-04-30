import { Box, Button, Paper, Typography } from "@mui/material";
import { useProjects } from "../../../lib/hooks/useProjects";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form"
import { useEffect } from "react";
import { projectSchema, ProjectSchema } from "../../../lib/schemas/projectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/layout/shared/components/TextInput";
import SelectInput from "../../../app/layout/shared/components/SelectInput";
import { clusterOptionsIndoor, clusterOptionsOutdoor } from "./clusterOptions";
import { categoryOptions } from "./categoryOptions";
import { programOptions } from "./programOptions";
import filteredTeamsOptions from "./filteredTeamsOptions";

export default function ProjectForm() {
    const { reset, control, handleSubmit, watch } = useForm<ProjectSchema>({
        mode: 'onTouched',
        resolver: zodResolver(projectSchema)
    });
    const { id } = useParams();
    const { updateProject, createProject, project, isLoadingProject } = useProjects(id);
    const navigate = useNavigate();

    const selectedProgram = watch('program');
    const selectedCluster = watch('cluster');

    useEffect(() => {
        if (project) reset(project);
    }, [project, reset]);

    const onSubmit = async (data: ProjectSchema) => {
        try {
            if (project) {
                updateProject.mutate({ ...project, ...data }, {
                    onSuccess: () => navigate(-1)
                })
            } else {
                createProject.mutate(data as Project, {
                    onSuccess: (id) => navigate(`/projects/${id}`)
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const availableClusterOptions = selectedProgram === 'Indoor' ? clusterOptionsIndoor : clusterOptionsOutdoor;
    const optionsForTeam = filteredTeamsOptions(selectedCluster,selectedProgram);
    
    if (isLoadingProject) return <Typography>Loading...</Typography>

    return (
        <Paper sx={{ borderRadius: 2, padding: 2 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {project ? 'Edit Project' : 'Create Project'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
                <TextInput label='Project name' control={control} name='name' />

                <TextInput label='Description' control={control} name='description' multiline rows={3} />


                <Box display={"flex"} gap={3}>
                    <SelectInput
                        label='Program'
                        control={control}
                        name='program'
                        items={programOptions}
                    />


                    <SelectInput label='Cluster'
                        control={control}
                        name='cluster'
                        items={availableClusterOptions}
                    />

                    <SelectInput label='Category'
                        control={control}
                        name='category'
                        items={categoryOptions}
                    />

                    <SelectInput label='Team'
                        control={control}
                        name='team'
                        items={optionsForTeam}
                    />
                </Box>





                <Box display="flex" justifyContent='end' gap={1}>
                    <Button onClick={() => navigate(-1)} color="inherit">Cancel</Button>
                    <Button
                        type="submit"
                        color="success"
                        disabled={updateProject.isPending || createProject.isPending}
                    >Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}