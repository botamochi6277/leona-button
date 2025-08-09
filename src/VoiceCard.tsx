import * as React from "react";
// mui
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Link,
  Typography,
  Box,
  Stack,
  Chip,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
// icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

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

const UrlButton = (props: { url: string; text?: string }) => {
  return (
    <Button
      href={props.url}
      target="_blank"
      rel="noopener"
      variant="outlined"
      color="secondary"
      size="small"
      startIcon={<LiveTvIcon />}
      sx={{ marginTop: 1 }}
    >
      {props.text ?? "Source"}
    </Button>
  );
};

function VoiceCard1(props: { voice: Voice }) {
  const voice = props.voice;
  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {voice.text}
          </Typography>
          {/* <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            voice.text
          </Typography> */}
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={`https://placehold.jp/FF9D08/f7f7f7/150x150.png?text=${voice.text[0]}`}
        alt={voice.text}
      />
    </Card>
  );
}

const VoiceCard2 = (props: { voice: Voice }) => {
  // https://stackoverflow.com/questions/57818778/how-to-make-material-ui-cardactions-always-stick-to-the-bottom-of-parent
  // https://stackoverflow.com/questions/55824260/same-height-cards-in-material-ui
  const voice = props.voice;

  // const img_path = ss ? `./prototypes/${ss[ss.length - 1]}` : null;

  return (
    <Card
      sx={{ flexDirection: "column", height: "100%" }}
      key={`${voice.name}-card`}
    >
      <CardContent>
        <Typography component="div" variant="h6">
          {voice.text}
        </Typography>

        <Box sx={{ marginBottom: 1 }}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {voice.tags.map((tag) => (
              <Chip size="small" key={`tag-${tag}`} label={tag} />
            ))}
          </Stack>
        </Box>
        <UrlButton url={voice.url} />
        <Button startIcon={<PlayArrowIcon />} variant="contained">
          Play
        </Button>
      </CardContent>
    </Card>
  );
};

const VoiceCard = (props: { voice: Voice }) => {
  const voice = props.voice;

  // const img_path = ss ? `./prototypes/${ss[ss.length - 1]}` : null;

  return (
    <Card
      sx={{ flexDirection: "column", height: "100%" }}
      key={`${voice.name}-card`}
    >
      <List>
        <ListItem
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="play"
              href={voice.url}
              target="_blank"
              rel="noopener"
              color="secondary"
            >
              <LiveTvIcon color="secondary" />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <IconButton>
                <PlayArrowIcon />
              </IconButton>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={voice.text}
            secondary={
              <ChipsBox
                items={voice.tags}
                icon={<TagIcon />}
                color="secondary"
              />
            }
          />
        </ListItem>
      </List>
    </Card>
  );
};

export default VoiceCard;
