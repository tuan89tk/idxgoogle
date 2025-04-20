import { spawn } from "child_process";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { stream_url, output_url } = req.body;

  if (!stream_url || !output_url) {
    return res.status(400).json({ error: "Missing stream_url or output_url" });
  }

  const ffmpeg = spawn("ffmpeg", [
    "-re",
    "-i", stream_url,
    "-c:v", "copy",
    "-c:a", "copy",
    "-f", "flv",
    output_url
  ], {
    detached: true,
    stdio: "ignore"
  });

  ffmpeg.unref(); // Cho phép chạy background

  return res.status(200).json({
    message: "FFmpeg started",
    pid: ffmpeg.pid
  });
}
