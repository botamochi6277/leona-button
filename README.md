# Leona button

_Leona Button_ is a website that collects voice clips of Vtuber [SHISHIGAMI Leona](https://www.youtube.com/@Leona_Shishigami), a member of Re:AcT, inspired by [Shigure-Ui Button](https://leiros.cloudfree.jp/usbtn/usbtn.html).
The voice clips are taken from publicly available YouTube broadcasts. Please use the voice clips at your own risk.

## How to make video clip

Download video with yt-dlp

```bash
yt-dlp  -S "res:480" {video_url}
```

trim video roughly

```bash
ffmpeg -ss 4:45 -i {video} -t 10 dst.mp4
```

extract audio from video file

```bash
ffmpeg -i dst.mp4 -vn -acodec mp3 dst.mp3
```

extract vocal from audio file with [vocal remover](https://vocalremover.org/ja/)
