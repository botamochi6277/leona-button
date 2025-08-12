import * as React from "react";
// mui
import {
  Box,
  IconButton,
  Typography,
  ListItem,
  ListItemText,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Link,
  Avatar,
  Icon,
} from "@mui/material";

// icons
import {
  Abc as AbcIcon,
  Pin as PinIcon,
  Stream as StreamIcon,
} from "@mui/icons-material";

// assets

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

const StreamCard = (props: { video: Video }) => {
  return (
    <Card>
      <CardHeader
        title={
          <Link
            href={props.video.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.video.title}
          </Link>
        }
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <StreamIcon />
          </Avatar>
        }
      />
    </Card>
  );
};

export default function StreamList(props: {
  voices: Voice[];
  videos: Video[];
}) {
  const [order, setOrder] = React.useState("name");

  const mySort = (a: Video, b: Video, order: string) => {
    switch (order) {
      case "ids":
        return a.id.localeCompare(b.id);
      case "name":
        return a.title.localeCompare(b.title, "ja", {
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

  const items = props.videos
    .sort((a, b) => mySort(a, b, order))
    .map((video) => {
      return <StreamCard video={video} />;
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
