import { exec } from 'child_process';

export default function handler(req, res) {
  if (req.method === 'GET') {
    exec("ps aux | grep '[f]fmpeg' | wc -l", (error, stdout, stderr) => {
      if (error) {
        console.error('Exec error:', error);
        return res.status(500).json({ error: 'Error executing command' });
      }

      const count = parseInt(stdout.trim(), 10);
      if (isNaN(count)) {
        return res.status(500).json({ error: 'Invalid output from command' });
      }

      return res.status(200).json({ ffmpeg_processes: count });
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
