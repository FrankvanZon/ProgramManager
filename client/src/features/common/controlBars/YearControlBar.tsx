import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Card, Box, Button } from "@mui/material";
import { useStore } from "../../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";

const YearControlBar = observer( function YearControlBar() {
const{yearStore} = useStore()


    return (
        <Card elevation={2} sx={{ borderRadius: 2, gap: 1 }}>
            <Box display='flex' alignItems='center' justifyContent='space-between' mb={1} mt={1} mr={1} ml={1}>
                <Button onClick={() => yearStore.decrement()}><ArrowBack /></Button>
                {yearStore.Year}
                <Button onClick={() => yearStore.increment()}><ArrowForward /></Button>
            </Box>
        </Card>
    )
})

export default YearControlBar