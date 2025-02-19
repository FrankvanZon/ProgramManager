import { Event, FilterList } from "@mui/icons-material";
import { Box, ListItemText, MenuItem, MenuList, Paper, Typography } from "@mui/material";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'

export default function ProjectFilter() {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap:3, borderRadius:2}}>
        <Paper sx={{p:3, borderRadius:2}} >
            <Box sx={{width:'100%'}} >
                <Typography variant="h6" sx={{display:"flex", alignItems: 'center', mb:1 , color: 'primary.main'}}>
                    <FilterList sx={{mr:1}}/>
                    Filters
                </Typography>
                <MenuList>
                    <MenuItem>
                        <ListItemText primary='All Projects'/>
                    </MenuItem>

                    <MenuItem>
                        <ListItemText primary='Industry'/>
                    </MenuItem>

                    <MenuItem>
                        <ListItemText primary='Office'/>
                    </MenuItem>

                    <MenuItem>
                        <ListItemText primary='Trunking'/>
                    </MenuItem>

                    <MenuItem>
                        <ListItemText primary='Retail'/>
                    </MenuItem>
                    
                </MenuList>
            </Box>
        </Paper>

        <Box component={Paper} sx={{width:'100%', p:3, borderRadius:2}}>
            <Typography variant="h6" sx={{display: 'flex', alignItems: 'center', mb:1 , color: 'primary.main'}}>
                <Event sx={{mr:1}}/>
                Select date
            </Typography>
            <Calendar/>
        </Box>
    </Box>
  )
}