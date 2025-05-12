import { observer } from "mobx-react-lite";
import { useProjects } from "../../lib/hooks/useProjects";
import { indexToQuarter, quarterToIndex } from "../../lib/util/util";
import ProjectRoadmapBar from "./ProjectRoadmapBar";
import { Box, Typography } from "@mui/material";

const ProjectRoadmapTest = observer(() => {
  const { projects, isLoadingAllProject } = useProjects();

  if (isLoadingAllProject || !projects) {
    return <Typography>Loading...</Typography>;
  }

  const filteredProjects = projects.filter(
    (project) =>
      !project.isCancelled &&
      project.startQuarter !== undefined &&
      project.totalDuration !== undefined
  );

  const minQuarter = Math.min(
    ...filteredProjects.map((p) => quarterToIndex(p.startQuarter!))
  );
  const maxQuarter = Math.max(
    ...filteredProjects.map(
      (p) => quarterToIndex(p.startQuarter!) + p.totalDuration! - 1
    )
  );
  const totalQuarters = maxQuarter - minQuarter + 1;
  const scaleFactor = 100 / totalQuarters;

  const groupedProjects: Record<string, Project[]> = {};
  filteredProjects.forEach((project) => {
    if (!groupedProjects[project.cluster]) {
      groupedProjects[project.cluster] = [];
    }
    groupedProjects[project.cluster].push(project);
  });

  Object.keys(groupedProjects).forEach((cluster) => {
    groupedProjects[cluster].sort(
      (a, b) =>
        quarterToIndex(a.startQuarter!) - quarterToIndex(b.startQuarter!)
    );
  });

  const quarterLabels = Array.from(
    { length: totalQuarters },
    (_, i) => minQuarter + i
  );

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      {/* Quarter timeline header */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          mb: 2,
          position: "relative",
          height: 32,
        }}
      >
        {quarterLabels.map((qIndex) => (
          <Box
            key={qIndex}
            sx={{
              width: `${scaleFactor}%`,
              borderRight: "1px solid #ccc",
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#666",
            }}
          >
            {indexToQuarter(qIndex)}
          </Box>
        ))}
      </Box>

      {/* Grouped project bars */}
      {Object.entries(groupedProjects).map(([cluster, projects]) => (
        <Box key={cluster} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {cluster}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {projects.map((project) => (
              <ProjectRoadmapBar
                key={project.id}
                project={project}
                minQuarter={minQuarter}
                scaleFactor={scaleFactor}
              />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
});

export default ProjectRoadmapTest;
