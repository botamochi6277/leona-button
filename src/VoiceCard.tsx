import * as React from "react";
// mui
import {
  Card,
  Box,
  Chip,
  IconButton,
  CardHeader,
  CardActions,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";

// icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

import TagIcon from "@mui/icons-material/Tag";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { PlayArrow as PlayArrowIcon } from "@mui/icons-material";

const ChipsBox = (props: {
  items?: string[];
  icon?: React.ReactElement;

  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  breakpoint?: number;
}) => {
  const [open, setOpen] = React.useState(false);
  if (!props.items) {
    return;
  }
  const mats = props.items;
  const breakpoint = props.breakpoint ?? 2;
  const n = open ? mats.length : breakpoint;

  return (
    <Box>
      {mats.slice(0, n).map((m) => (
        <Chip
          icon={props.icon}
          label={m}
          key={`chip-${m}`}
          size="small"
          color={props.color}
          variant="outlined"
          sx={{ margin: 0.5, fontSize: 11 }}
        />
      ))}
      {open ? (
        <IconButton
          size="small"
          color="secondary"
          onClick={() => setOpen(false)}
        >
          <ChevronLeftIcon />
        </IconButton>
      ) : mats.length > breakpoint ? (
        <IconButton
          size="small"
          color="secondary"
          onClick={() => setOpen(true)}
        >
          <MoreHorizIcon />
        </IconButton>
      ) : null}
    </Box>
  );
};

const VoiceCard = (props: { voice: Voice }) => {
  const voice = props.voice;

  const audio = new Audio(`voices/${voice.file_name}`);
  const [audioPlaying, setAudioPlaying] = React.useState(false);
  const [isAudioError, setIsAudioError] = React.useState(false);

  const buttonSx = {
    ...(audioPlaying && {
      bgcolor: "primary.main",
      "&:hover": {
        bgcolor: "secondary.main",
      },
    }),
  };

  React.useEffect(() => {
    if (audioPlaying) {
      audio?.play().catch(() => {
        setIsAudioError(true);
        setAudioPlaying(false);
        throw new Error(`${voice.file_name} cannot be played`);
      });
    } else {
      setIsAudioError(false);
      audio?.pause();
    }
  }, [audio, audioPlaying]);

  React.useEffect(() => {
    const onEnded = () => {
      setAudioPlaying(false);
      audio.pause();
    };

    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("ended", onEnded);
    };
  }, [audio, setAudioPlaying]);

  const btn = (
    <Box sx={{ position: "relative" }}>
      <Fab
        aria-label="save"
        color={isAudioError ? "error" : "primary"}
        sx={buttonSx}
        size="small"
        onClick={() => {
          setAudioPlaying((prev) => !prev);
        }}
      >
        {audioPlaying ? <MusicNoteIcon /> : <PlayArrowIcon />}
      </Fab>
      {audioPlaying && (
        <CircularProgress
          size={48}
          sx={{
            color: "success.main",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-24px",
            marginLeft: "-24px",
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );

  return (
    <Card
      sx={{ flexDirection: "column", height: "100%" }}
      key={`${voice.name}-card`}
      variant="outlined"
    >
      <CardHeader
        title={voice.text}
        avatar={btn}
        action={
          <IconButton
            aria-label="play"
            href={voice.url}
            target="_blank"
            rel="noopener"
            color="secondary"
          >
            <LiveTvIcon color="secondary" />
          </IconButton>
        }
      />
      {/* <CardContent>
        <CardMedia
          component={"audio"}
          controls
          controlsList="nodownload"
          src={`voices/${voice.file_name}`}
        ></CardMedia>
      </CardContent> */}

      <CardActions>
        <ChipsBox items={voice.tags} icon={<TagIcon />} color="secondary" />
      </CardActions>
    </Card>
  );
};

export default VoiceCard;
