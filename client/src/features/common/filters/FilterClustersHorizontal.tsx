import { FilterList } from "@mui/icons-material";
import { Box, Typography, MenuList, MenuItem, ListItemText, Paper } from "@mui/material";
import { useStore } from "../../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";

const FilterClustersHorizontal = observer(function FilterClusters() {
    const {projectStore} = useStore();

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'top',
            position:'sticky', top:80, alignSelf: 'flex-start',pl:3,pr:3,pt:0,pb:0, borderRadius:0
        }}
        component={Paper} 
            >
            <Typography variant="h6" sx={{ display: "flex", alignItems: 'center',mr:1, color: 'primary.main' }}>
                <FilterList sx={{ mr: 1 }} />
                Filters
            </Typography>
            <MenuList sx={{ display: 'flex', flexDirection: 'row', mr:2 }}>

                
                <MenuItem
                    selected={projectStore.filterByProgram === 'all'}
                    onClick={() => projectStore.setFilterByProgram('all')}>
                    <ListItemText primary='All Projects' />
                </MenuItem>
                

                {projectStore.filterByProgram != 'Indoor' && (
                <MenuItem
                    selected={projectStore.filterByProgram === 'Indoor'}
                    onClick={() => projectStore.setFilterByProgram('Indoor')}>
                    <ListItemText primary='Indoor' />
                </MenuItem>
                )}
                
                {projectStore.filterByProgram != 'Outdoor' && (
                <MenuItem
                    selected={projectStore.filterByProgram === 'Outdoor'}
                    onClick={() => projectStore.setFilterByProgram('Outdoor')}>
                    <ListItemText primary='Outdoor' />
                </MenuItem>
                )}
            </MenuList>



            {projectStore.filterByProgram === "Indoor" && (
            <MenuList sx={{ display: 'flex', flexDirection: 'row' }}>
                <MenuItem
                    selected={
                        projectStore.filterByCluster === 'all'}
                    onClick={() => projectStore.setFilterByCluster('all')}>
                    <ListItemText primary='Indoor' />
                </MenuItem>

                <MenuItem
                    selected={projectStore.filterByCluster === 'Industry'}
                    onClick={() => projectStore.setFilterByCluster('Industry')}>
                    <ListItemText primary='Industry' />
                </MenuItem>

                <MenuItem
                    selected={projectStore.filterByCluster === 'Office'}
                    onClick={() => projectStore.setFilterByCluster('Office')}>
                    <ListItemText primary='Office' />
                </MenuItem>

                <MenuItem
                    selected={projectStore.filterByCluster === 'Trunking'}
                    onClick={() => projectStore.setFilterByCluster('Trunking')}>
                    <ListItemText primary='Trunking' />
                </MenuItem>

                <MenuItem
                    selected={projectStore.filterByCluster === 'Retail'}
                    onClick={() => projectStore.setFilterByCluster('Retail')}>
                    <ListItemText primary='Retail' />
                </MenuItem>
            </MenuList>
            )}

            {projectStore.filterByProgram === "Outdoor" && (
            <MenuList sx={{ display: 'flex', flexDirection: 'row' }}>
                <MenuItem
                    selected={
                        projectStore.filterByCluster === 'all'}
                    onClick={() => projectStore.setFilterByCluster('all')}>
                    <ListItemText primary='Outdoor' />
                </MenuItem>

                <MenuItem
                    selected={projectStore.filterByCluster === 'Road & Street'}
                    onClick={() => projectStore.setFilterByCluster('Road & Street')}>
                    <ListItemText primary='Road & Street' />
                </MenuItem>

                <MenuItem
                    selected={projectStore.filterByCluster === 'Solar'}
                    onClick={() => projectStore.setFilterByCluster('Solar')}>
                    <ListItemText primary='Solar' />
                </MenuItem>

                <MenuItem
                    selected={projectStore.filterByCluster === 'Sports & Area'}
                    onClick={() => projectStore.setFilterByCluster('Sports & Area')}>
                    <ListItemText primary='Sports & Area' />
                </MenuItem>

                <MenuItem
                    selected={projectStore.filterByCluster === 'Tunnel'}
                    onClick={() => projectStore.setFilterByCluster('Tunnel')}>
                    <ListItemText primary='Tunnel' />
                </MenuItem>

                <MenuItem
                    selected={projectStore.filterByCluster === 'Urban'}
                    onClick={() => projectStore.setFilterByCluster('Urban')}>
                    <ListItemText primary='Urban' />
                </MenuItem>
            </MenuList>
            )}
        </Box>
    )
})

export default FilterClustersHorizontal
