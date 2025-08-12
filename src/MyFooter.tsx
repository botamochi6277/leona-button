import { AppBar, Box, Typography, Link } from "@mui/material";

const MyFooter = () => {
  return (
    <AppBar
      position="static"
      color="secondary"
      sx={{
        top: "auto",
        bottom: 0,
      }}
    >
      <Box sx={{ padding: 1, textAlign: "center" }}>
        <Typography variant="body2">
          Leona Button developed by{" "}
          <Link
            href="https://github.com/botamochi6277"
            target="_blank"
            rel="noopener noreferrer"
          >
            botamochi
          </Link>
          , and the code is in{" "}
          <Link
            href="https://github.com/botamochi6277/leona-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          .
        </Typography>
      </Box>
    </AppBar>
  );
};

export default MyFooter;
