import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Card, Box, Button } from "@mui/material";
import { useStore } from "../../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";

const YearControlBar = observer( function YearControlBar() {
const{milestoneStore} = useStore()


    return (
        <Card elevation={2} sx={{ borderRadius: 2, gap: 1 }}>
            <Box display='flex' alignItems='center' justifyContent='space-between' mb={1} mt={1} mr={1} ml={1}>
                <Button 
                    disabled = {milestoneStore.id === 0}
                    onClick={() => milestoneStore.decrement()}><ArrowBack /></Button>
                {milestoneStore.Phase[milestoneStore.id]}
                <Button 
                    disabled = {milestoneStore.id === 8}
                    onClick={() => milestoneStore.increment()}><ArrowForward /></Button>
            </Box>
        </Card>
    )
})

export default YearControlBar