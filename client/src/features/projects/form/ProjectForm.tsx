import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";

type Props = {
    project? : Project
    closeForm : () => void;
    submitForm : (project: Project) => void;
}

export default function ProjectForm({project, closeForm, submitForm}: Props) {
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);

        const data: {[key:string]: FormDataEntryValue} = {}
        formData.forEach((value, key)=> {
            data[key] = value;
        })

        if(project) data.id = project.id;
        submitForm(data as unknown as Project);
    }
   
  
    return (
    <Paper sx={{borderRadius: 2, padding: 2}}>
        <Typography variant="h5" gutterBottom color="primary">
            Create Project
        </Typography>
            <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
                <TextField name='name' defaultValue={project?.name} label='Name' />
                <TextField name='description' defaultValue={project?.description} label='Description' multiline rows={3} />
                <TextField name='cluster' defaultValue={project?.cluster} label='Cluster' />
                <TextField name='category' defaultValue={project?.category} label='Category' />
                <TextField name='team' defaultValue={project?.team} label='Team' />

                <TextField name='startQuarter' defaultValue={project?.startQuarter} label='NPDL Start Quarter' />
                <TextField name='launchQuarter' defaultValue={project?.launchQuarter} label='Launch Quarter' />
                <TextField name='milestone' defaultValue={project?.milestone} label='Milestone' />
                <TextField name='releaseDate' defaultValue={project?.releaseDate} label='Release Date' type="date" />

                <Box display="flex" justifyContent='end' gap={1}>
                    <Button onClick={closeForm} color="inherit">Cancel</Button>
                    <Button type="submit" color="success">Submit</Button>
                </Box>
            </Box>
    </Paper>
  )
}