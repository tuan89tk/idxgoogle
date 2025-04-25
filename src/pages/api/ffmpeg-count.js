import { exec } from 'child_process';

export default function handler(req, res) {
  if (req.method === 'GET') {
    exec("ps aux | grep '[f]fmpeg' | wc -l", (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing command:', error);
        return res.status(500).json({ error: 'Failed to count ffmpeg processes' });
      }

      const count = parseInt(stdout.trim(), 10);
      res.status(200).json({ ffmpeg_processes: count });
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
