import * as React from "react";
// mui
import {
  Box,
  IconButton,
  Typography,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";

// icons
import { Abc as AbcIcon } from "@mui/icons-material";

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

export default function VoiceCardList(props: { voices: Voice[] }) {
  const [order, setOrder] = React.useState("ids");

  const mySort = (a: Voice, b: Voice, order: string) => {
    switch (order) {
      // case "ids":
      //   return a.id - b.id; // decrease
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
    .sort((a, b) => mySort(a, b, order))
    .map((p) => {
      return <VoiceCard voice={p} />;
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
        <Typography>{items.length} voices are in this page.</Typography>

        {/* sorting radio-like buttons */}

        <ListItem>
          <ListItemText primary="Sort:" />
          <OrderButtons
            currentOrder={order}
            setOrder={setOrder}
            items={[
              // { order: "ids", icon: <PinIcon /> },
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
