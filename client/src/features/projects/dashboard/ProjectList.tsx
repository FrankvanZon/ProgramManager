import { Box, Typography } from "@mui/material";
import ProjectCard from "./ProjectCard";
import { useProjects } from "../../../lib/hooks/useProjects";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

const ProjectList = observer(function ProjectList() {
  const { projectsGroup, isLoading, hasNextPage, fetchNextPage } = useProjects();
  const { ref, inView } = useInView({
    threshold: 0.5
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log('Fetching next page...');
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <Typography>Loading...</Typography>;

  if (!projectsGroup) return <Typography>Projects not available</Typography>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {projectsGroup.pages.map((projects, index) => (
        <Box
          key={index}
          ref={index === projectsGroup.pages.length - 1 ? ref : null}
          display='flex'
          flexDirection='column'
          gap={3}
        >
          {projects.items.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Box>
      ))}
    </Box>
  );
});

export default ProjectList;
