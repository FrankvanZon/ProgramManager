import { Box } from "@mui/material";
import { useStore } from "../../lib/hooks/useStore"
import { observer } from 'mobx-react-lite';
import ProjectRoadmapTest from "../roadmap/ProjectRoadmapTest";

const Counter = observer(function Counter() {
  const {counterStore} = useStore();

    return (
    <Box mt={4}>
       
        <ProjectRoadmapTest/>

    </Box>
  )
})

export default Counter;