import { Avatar, Box, Divider, Grid2, Paper, Stack, Typography } from "@mui/material";

type Props = {
    profile : Profile
}


export default function ProfileHeader({profile} : Props) {
    
    return (
        <Paper elevation={3} sx={{p:4, borderRadius:2}}>
            <Grid2 container spacing={2}>
                <Grid2 size={8}>
                    <Stack direction={'row'} spacing={3} alignItems={'center'}>
                        <Avatar 
                            src={profile.imageUrl}
                            alt="profile picture"
                            sx={{width:150, height:150}}/>
                        <Box display={'flex'} flexDirection={'column'} gap={2}>
                            <Typography variant="h4">{profile.displayName}</Typography>


                        </Box>
                    </Stack>

                </Grid2>

                <Grid2 size={4}>
                    <Stack spacing={2} alignItems={'center'}>
                        <Box display={'flex'} justifyContent={'space-around'} width={"100%"}>
                            <Typography variant="h6">Following</Typography>
                            <Typography variant="h4">5</Typography>
                        </Box>
                        <Divider sx={{width:"100%"}}/>

                    </Stack>

                </Grid2>

            </Grid2>

        </Paper>
  )
}