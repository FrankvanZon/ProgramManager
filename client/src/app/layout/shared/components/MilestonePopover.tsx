import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Event } from "@mui/icons-material";
import { IconButton } from '@mui/material';
import MilestoneCard from '../../../../features/milestones/MilestoneCard';

type Props = {
    project: Project
}

export default function MilestonePopever({ project }: Props) {
    const colorFollow = project.isFollowing ? "secondary" : "primary";
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <IconButton
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
            <Event
                color={colorFollow}
                sx={{ height: 40, width: 40 }} 
            />
            </IconButton>
            <Popover
                id="mouse-over-popover"
                sx={{ pointerEvents: 'none' }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <MilestoneCard project={project}/>
                
            </Popover>
        </>
    );
}
