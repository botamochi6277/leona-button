import * as React from "react";
// mui
import {
  Box,
  IconButton,
  Typography,
  ListItem,
  ListItemText,
  Grid,
  Chip,
  Stack,
} from "@mui/material";

// icons
import {
  Abc as AbcIcon,
  Pin as PinIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";

// assets

import VoiceCard from "./VoiceCard";

const OrderButtons = (props: {
  currentOrder: string;
  items: { order: string; icon: React.ReactElement }[];
  setOrder: (s: string) => void;
}) => {
  const buttons = props.items.map((item) => {
    return (
      <IconButton
        key={`btn-${item.order}`}
        color={item.order === props.currentOrder ? "primary" : "default"}
        onClick={() => {
          props.setOrder(item.order);
        }}
      >
        {item.icon}
      </IconButton>
    );
  });
  return buttons;
};

export default function VoiceCardList(props: {
  voices: Voice[];
  videos: Video[];
}) {
  const [order, setOrder] = React.useState("ids");
  const [filteringTags, setFilteringTags] = React.useState<string[]>([]);

  const addFilteringTag = (tag: string) => {
    setFilteringTags([...filteringTags, tag]);
  };

  const removeFilteringTag = (tag: string) => {
    setFilteringTags(filteringTags.filter((t) => t !== tag));
  };

  const mySort = (a: Voice, b: Voice, order: string) => {
    switch (order) {
      case "ids":
        return a.id - b.id; // decrease
      case "name":
        return a.text.localeCompare(b.text, "ja", {
          numeric: true,
          sensitivity: "base",
        });
      // case "goods":
      //   return b.goodCount - a.goodCount;
      // case "updatedDate":
      //   return Date.parse(b.updateDate) - Date.parse(a.updateDate);
      default:
        return 1;
    }
  };

  const items = props.voices
    .filter((voice) => {
      if (filteringTags.length === 0) {
        return true;
      }
      return filteringTags.every((tag) => voice.tags.includes(tag));
    })
    .sort((a, b) => mySort(a, b, order))
    .map((voice) => {
      const filteredVideo = props.videos.find((v) => {
        return voice.url.includes(v.url);
      });

      return (
        <VoiceCard
          voice={voice}
          video={filteredVideo}
          addTagHandler={addFilteringTag}
        />
      );
    });

  return (
    <Box>
      {/* https://custom-icon-badges.demolab.com/badge/num_stackchans-46-blue.svg?logo=paintbrush&logoColor=white */}

      <Box>
        {/* <Box
          component="img"
          sx={{
            objectFit: "cover",
            "&:hover": {
              opacity: 0.8,
            },
          }}
          alt="Badge"
          src={`https://custom-icon-badges.demolab.com/badge/stackchans-${items.length}-blue.svg?logo=people&logoColor=gray&style=social`}
          key={"counter"}
        /> */}

        <Box>
          <Stack direction="row" spacing={1}>
            {filteringTags.map((tag) => (
              <Chip
                label={tag}
                icon={<RemoveIcon />}
                onClick={() => {
                  removeFilteringTag(tag);
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* sorting radio-like buttons */}

        <ListItem>
          <ListItemText primary="Sort:" />
          <OrderButtons
            currentOrder={order}
            setOrder={setOrder}
            items={[
              { order: "ids", icon: <PinIcon /> },
              // { order: "views", icon: <VisibilityIcon /> },
              // { order: "goods", icon: <ThumbUpIcon /> },
              { order: "name", icon: <AbcIcon /> },
            ]}
          />
        </ListItem>
      </Box>

      <Grid container spacing={2}>
        {items.map((item, idx) => (
          <Grid size={{ xs: 12, sm: 6 }} key={idx}>
            {item}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
