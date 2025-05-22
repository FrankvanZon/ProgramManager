import { FilterList } from "@mui/icons-material";
import { Box, Typography, MenuList, MenuItem, ListItemText, Divider } from "@mui/material";
import { useStore } from "../../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";

const FilterMilestones = observer(function FilterClusters() {
    const {milestoneStore} = useStore();

    return (
        <Box sx={{ width: '100%' }} >
            <Typography variant="h6" sx={{ display: "flex", alignItems: 'center', mb: 1, color: 'primary.main' }}>
                <FilterList sx={{ mr: 1 }} />
                Milestone
            </Typography>

            <MenuList>
                <MenuItem
                    selected={milestoneStore.filterByMilestonePhase === "all"}
                    onClick={() => {
                        milestoneStore.setFilterForMilestoneId("all")
                        }}>
                    <ListItemText primary='All' />
                </MenuItem>

                <MenuItem
                    selected={milestoneStore.filterByMilestonePhase === "APC"}
                    onClick={() => milestoneStore.setFilterForMilestoneId("APC")}>
                    <ListItemText primary='APC' />
                </MenuItem>

                <MenuItem
                    selected={milestoneStore.filterByMilestonePhase === "NPDL"}
                    onClick={() => milestoneStore.setFilterForMilestoneId("NPDL")}>
                    <ListItemText primary='NPDL' />
                </MenuItem>

                <MenuItem
                    selected={milestoneStore.filterByMilestonePhase === "CIB"}
                    onClick={() => milestoneStore.setFilterForMilestoneId("CIB")}>
                    <ListItemText primary='CIB' />
                </MenuItem>
            </MenuList>

            

            {milestoneStore.filterByMilestonePhase === "APC" && (
            <>
            <Divider/>
            <MenuList>
                <MenuItem
                    selected={milestoneStore.filterByMilestoneMin === 0 && milestoneStore.filterByMilestoneMax === 0}
                    onClick={() => milestoneStore.setFilterForMilestoneId('APC','PI')}>
                    <ListItemText primary='PI' />
                </MenuItem>
                <MenuItem
                    selected={milestoneStore.filterByMilestoneMin === 1 && milestoneStore.filterByMilestoneMax === 1}
                    onClick={() => milestoneStore.setFilterForMilestoneId("APC","PS")}>
                    <ListItemText primary='PS' />
                </MenuItem>
                <MenuItem
                    selected={milestoneStore.filterByMilestoneMin === 2 && milestoneStore.filterByMilestoneMax === 2}
                    onClick={() => milestoneStore.setFilterForMilestoneId("APC","PC")}>
                    <ListItemText primary='PC' />
                </MenuItem>
                <MenuItem
                    selected={milestoneStore.filterByMilestoneMin === 3 && milestoneStore.filterByMilestoneMax === 3}
                    onClick={() => milestoneStore.setFilterForMilestoneId("APC","PR")}>
                    <ListItemText primary='PR' />
                </MenuItem>
            </MenuList>
            </>)}

            {milestoneStore.filterByMilestonePhase === "NPDL" && (
            <>
            <Divider/>
            <MenuList>
                <MenuItem
                    selected={milestoneStore.filterByMilestoneMin === 4 && milestoneStore.filterByMilestoneMax === 4}
                    onClick={() => milestoneStore.setFilterForMilestoneId('NPDL','<PI')}>
                    <ListItemText primary='<PI' />
                </MenuItem>
                <MenuItem
                    selected={milestoneStore.filterByMilestoneMin === 5 && milestoneStore.filterByMilestoneMax === 5}
                    onClick={() => milestoneStore.setFilterForMilestoneId("NPDL","PI")}>
                    <ListItemText primary='PI' />
                </MenuItem>
                <MenuItem
                    selected={milestoneStore.filterByMilestoneMin === 6 && milestoneStore.filterByMilestoneMax === 6}
                    onClick={() => milestoneStore.setFilterForMilestoneId("NPDL","PS")}>
                    <ListItemText primary='PS' />
                </MenuItem>
                <MenuItem
                    selected={milestoneStore.filterByMilestoneMin === 7 && milestoneStore.filterByMilestoneMax === 7}
                    onClick={() => milestoneStore.setFilterForMilestoneId("NPDL","AA")}>
                    <ListItemText primary='AA' />
                </MenuItem>
                <MenuItem
                    selected={milestoneStore.filterByMilestoneMin === 8 && milestoneStore.filterByMilestoneMax === 8}
                    onClick={() => milestoneStore.setFilterForMilestoneId("NPDL","PPC")}>
                    <ListItemText primary='PPC' />
                </MenuItem>
                <MenuItem
                    selected={milestoneStore.filterByMilestoneMin === 9 && milestoneStore.filterByMilestoneMax === 9}
                    onClick={() => milestoneStore.setFilterForMilestoneId("NPDL","PV")}>
                    <ListItemText primary='PV' />
                </MenuItem>
                <MenuItem
                    selected={milestoneStore.filterByMilestoneMin === 10 && milestoneStore.filterByMilestoneMax === 10}
                    onClick={() => milestoneStore.setFilterForMilestoneId("NPDL","SR")}>
                    <ListItemText primary='SR' />
                </MenuItem>
                <MenuItem
                    selected={milestoneStore.filterByMilestoneMin === 11 && milestoneStore.filterByMilestoneMax === 11}
                    onClick={() => milestoneStore.setFilterForMilestoneId("NPDL","CR")}>
                    <ListItemText primary='CR' />
                </MenuItem>
            </MenuList>
            </>)}

        </Box>
    )
})

export default FilterMilestones
