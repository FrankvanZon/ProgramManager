import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import { useProjects } from "../../../lib/hooks/useProjects";
import { useNavigate, useParams } from "react-router";

export default function ProjectForm() {
    const {id} = useParams();
    const {updateProject, createProject, project, isLoadingProject} = useProjects(id);   
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);

        const data: {[key:string]: FormDataEntryValue} = {}
        formData.forEach((value, key)=> {
            data[key] = value;
        });

        if(project) {
            data.id = project.id;
            await updateProject.mutateAsync(data as unknown as Project)
            navigate(`/projects/${project.id}`)
        } else {
            createProject.mutate(data as unknown as Project,{
                onSuccess: (id) => {
                    navigate(`/projects/${id}`)
                }
            });
        }
    }
   
    if (isLoadingProject) return <Typography>Loading...</Typography>
  
    return (
    <Paper sx={{borderRadius: 2, padding: 2}}>
        <Typography variant="h5" gutterBottom color="primary">
            {project ? 'Edit Project' : 'Create Project'}
        </Typography>
            <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
                <TextField name='name' defaultValue={project?.name} label='Name' />
                <TextField name='description' defaultValue={project?.description} label='Description' multiline rows={3} />
                <TextField name='cluster' defaultValue={project?.cluster} label='Cluster' />
                <TextField name='category' defaultValue={project?.category} label='Category' />
                
                <TextField name='team' defaultValue={project?.team} label='Team' />
                <TextField name='milestone' defaultValue={project?.milestone} label='Milestone' />
                <TextField name='releaseDate' 
                    defaultValue={project?.releaseDate
                        ? new Date(project.releaseDate).toISOString().split('T')[0]
                        : new Date().toISOString().split('T')[0]
                    } 
                    label='Release Date' type="date" 
                />
                <Box display="flex" justifyContent='end' gap={1}>
                    <Button onClick={() => navigate('/projects')} color="inherit">Cancel</Button>
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