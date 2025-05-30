import { Box } from "@mui/material";
import { observer } from 'mobx-react-lite';
import ProjectRoadmapTest from "../roadmap/ProjectRoadmapTest";

const Counter = observer(function Counter() {

    return (
    <Box mt={4}>
       
        <ProjectRoadmapTest/>

    </Box>
  )
})

export default Counter;