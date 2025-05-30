import { IconButton, Tooltip } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { isValidUrl } from "../../../lib/util/util";


type Props = {
  url?: string;
  icon?: React.ReactElement;
};

export default function PresentationLinkButton({ url, icon = <LaunchIcon /> }: Props) {
  const valid = !!url && isValidUrl(url);

  const handleClick = () => {
    if (valid && url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Tooltip title={valid ? "Open product presentation" : "No URL set"}>
      <span>
        <IconButton
          onClick={handleClick}
          disabled={!valid}
          color="primary"
          size="small"
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
}
