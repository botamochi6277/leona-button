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
import TeamHeader from "./TeamHeader";
import StreamList from "./StreamList";
import MyFooter from "./MyFooter";

// assets
import { myTheme, myPalette } from "./theme";
import voiceData from "./assets/voices.json";

// icons
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import StreamIcon from "@mui/icons-material/Stream";

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

          <TeamHeader
            team_name={"Leona Button"}
            user_name={""}
            avatar_img={"leona.jpg"}
            description={
              "Leona Buttonはしぐれういボタンに触発されてbotamochiが開発した, Re:AcT所属のVtuber獅子神レオナさんの音声切り抜きを集めたサイトです. 音声はyoutubeの全体公開の配信から切り抜いています. 音声の利用は各自の責任でお願いします."
            }
            socials={[
              {
                name: "YouTube-shishigami_leona",
                link: "https://www.youtube.com/@Leona_Shishigami",
                badge:
                  "https://img.shields.io/badge/レオナちゃんねる-orange.svg?style=for-the-badge&logo=youtube",
              },
              {
                name: "shigure_ui_button",
                link: "https://leiros.cloudfree.jp/usbtn/usbtn.html",
                badge:
                  "https://custom-icon-badges.demolab.com/badge/%E3%81%97%E3%81%90%E3%82%8C%E3%81%86%E3%81%84%E3%83%9C%E3%82%BF%E3%83%B3-BE3D47.svg?style=for-the-badge&logo=box&logoSource=feather",
              },
              {
                name: "botamochi",
                link: "https://github.com/botamochi6277",
                badge:
                  "https://img.shields.io/badge/botamochi-gray.svg?style=for-the-badge&logo=github",
              },
            ]}
            key={"team_header"}
          />

          <MyTabs
            key={"my_tabs"}
            items={[
              {
                icon: <LibraryMusicIcon fontSize="small" />,
                label: "Voices",
                content: (
                  <VoiceCardList
                    voices={voiceData.voices}
                    videos={voiceData.videos}
                  />
                ),
              },
              {
                icon: <StreamIcon fontSize="small" />,
                label: "Streams",
                content: (
                  <StreamList
                    voices={voiceData.voices}
                    videos={voiceData.videos}
                  />
                ),
              },
            ]}
          />
        </Stack>
        <MyFooter />
      </Container>
    </ThemeProvider>
  );
}

export default App;
