import { Metadata } from 'next';

export const dynamic = 'force-static'; // no necessary, just for demonstration

export const metadata: Metadata = {
  title: 'About Wavey',
  description: 'About Wavey',
};

export default function About() {
  return (
    <div>
      <h1>About Wavey</h1>
      <p>Generate beautiful waveform views of your favorite albums using Spotify Web API and Next.js 13</p>
    </div>
  );
}