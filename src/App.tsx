import {
  Container,
  CssBaseline,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import * as React from "react";

// custom

import MyAppBar from "./MyAppBar";
import MyTabs from "./MyTabs";
import VoiceCardList from "./VoiceCardList";

// assets
import { myTheme, myPalette } from "./theme";
import voiceData from "./assets/voices.json";

// icons
import { QuestionMark as QuestionMarkIcon } from "@mui/icons-material";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import CollectionsIcon from "@mui/icons-material/Collections";
import HubIcon from "@mui/icons-material/Hub";

function App() {
  const [theme, setTheme] = React.useState(
    createTheme({
      ...myTheme,
      palette: {
        ...myPalette,
        mode: "dark",
      },
    })
  );
  const toggleTheme = (theme: any) => {
    if (theme.palette.mode === "dark") {
      setTheme(
        createTheme({
          ...myTheme,
          palette: { ...myPalette, mode: "light" },
        })
      );
    } else {
      setTheme(
        createTheme({
          ...myTheme,
          palette: { ...myPalette, mode: "dark" },
        })
      );
    }
  };

  // try to create youtube channel top page
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Stack spacing={1}>
          <MyAppBar
            name={`Leona Button`}
            theme={theme}
            onToggleTheme={() => toggleTheme(theme)}
            avatarUrl={""}
          />
          {/* Banner/Header Image */}
          {/* https://jp.cyberlink.com/blog/photoeditor/1755/best-photo-software-to-make-youtube-banners#:~:text=YouTube%20ヘッダー・バナーサイズと作成時の注意点,-ヘッダー・バナー作成&text=以下の図のよう,のサイズで作ります%E3%80%82 */}
          {/* https://stackoverflow.com/questions/61263669/does-material-ui-have-an-image-component */}
          {/* <Box
            component="img"
            sx={{
              aspectRatio: { xs: 1546 / 423, md: 1855 / 423, lg: 2560 / 423 },
              width: "100%",
              objectFit: "cover",
              borderRadius: 4,
            }}
            alt="Channel Art"
            src={profile.header_image}
          /> */}

          {/* <TeamHeader
            team_name={profile.team_name}
            user_name={profile.user_name}
            avatar_img={profile.avatar_image}
            description={profile.description}
            socials={profile.socials}
            key={"team_header"}
          /> */}

          <MyTabs
            key={"my_tabs"}
            items={[
              {
                icon: <CollectionsIcon fontSize="small" />,
                label: "Voices",
                content: <VoiceCardList voices={voiceData.voices} />,
              },
            ]}
          />
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
