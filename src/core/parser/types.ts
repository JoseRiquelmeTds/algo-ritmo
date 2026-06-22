export interface AudioMoment {
    sound: string;
    moment: number;
}
export const AVAILABLE_SOUNDS = ['pow', 'clap', 'toc', 'kick'] as const;
export type SoundName = typeof AVAILABLE_SOUNDS[number];
export type CommandType = 'play' | 'wait' | 'unknown';

export type ExtractedCommand = 
| { type: 'play'; payload: SoundName }
| { type: 'wait'; payload: number }
| { type: 'unknown'; payload: string };
