import { FilterList } from "@mui/icons-material";
import { Box, Typography, MenuList, MenuItem, ListItemText } from "@mui/material";

export default function FilterClusters() {
    return (
        <Box sx={{ width: '100%' }} >
            <Typography variant="h6" sx={{ display: "flex", alignItems: 'center', mb: 1, color: 'primary.main' }}>
                <FilterList sx={{ mr: 1 }} />
                Filters
            </Typography>
            <MenuList>
                <MenuItem>
                    <ListItemText primary='All Projects' />
                </MenuItem>

                <MenuItem>
                    <ListItemText primary='Industry' />
                </MenuItem>

                <MenuItem>
                    <ListItemText primary='Office' />
                </MenuItem>

                <MenuItem>
                    <ListItemText primary='Trunking' />
                </MenuItem>

                <MenuItem>
                    <ListItemText primary='Retail' />
                </MenuItem>

            </MenuList>
        </Box>
    )
}