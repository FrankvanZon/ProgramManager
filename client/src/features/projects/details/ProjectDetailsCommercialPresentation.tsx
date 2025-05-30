import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  CircularProgress
} from "@mui/material";
import { useProjects } from "../../../lib/hooks/useProjects";
import { isValidUrl } from "../../../lib/util/util";


type Props = {
  project: Project;
};

export default function ProjectDetailsCommercialPresentation({ project }: Props) {
  const { updateCommercialPresentation } = useProjects(project.id);
  const [url, setUrl] = useState(project.commercialPresentationUrl || ""); // Adjust field name if needed
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    if (!isValidUrl(url)) return;
    try {
      await updateCommercialPresentation.mutateAsync({
        id: project.id,
        url
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update commercial presentation", error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Commercial Presentation
      </Typography>

      {!isEditing ? (
        <Box>
          {url ? (
            <MuiLink href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </MuiLink>
          ) : (
            <Typography color="textSecondary">
              No commercial presentation URL set.
            </Typography>
          )}
          <Box mt={2}>
            <Button variant="outlined" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          </Box>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Presentation URL"
            variant="outlined"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            error={!!url && !isValidUrl(url)}
            helperText={!url ? "" : !isValidUrl(url) ? "Enter a valid URL." : ""}
          />
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!isValidUrl(url) || updateCommercialPresentation.isPending}
            >
              {updateCommercialPresentation.isPending ? (
                <CircularProgress size={20} />
              ) : (
                "Save"
              )}
            </Button>
            <Button variant="outlined" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
