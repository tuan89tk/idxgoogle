// pages/api/ffmpeg-count.js
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';

const exec = promisify(execCallback);

async function countFfmpegProcesses(req, res) {
  try {
    const { stdout } = await exec("ps aux | grep '[f]fmpeg' | wc -l");
    const count = parseInt(stdout.trim(), 10);

    if (isNaN(count)) {
      return res.status(500).json({ error: 'Invalid output from command' });
    }

    return res.status(200).json({ ffmpeg_processes: count });
  } catch (error) {
    console.error('Exec error:', error);
    return res.status(500).json({ error: 'Error executing command' });
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return await countFfmpegProcesses(req, res);
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).json({ error: `Method ${req.method} not allowed` });
}
