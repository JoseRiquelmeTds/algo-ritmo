import type { AudioMoment } from './types';
import { extractCommand } from './lexer';

export function parseCode(codeString: string) : AudioMoment[] {
    const timeline: AudioMoment[] = [];
    let currentTime = 0;

    const lines = codeString
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0); 

for (const line of lines) {
        const command = extractCommand(line);

        switch (command.type) {
            case 'play':
                // O payload do play é o nome do som (string)
                timeline.push({
                    moment: currentTime,
                    sound: command.payload as string
                });
                // Conforme seu plano, adiciona uma folga padrão de 0.5s após tocar
                currentTime += 0.5;
                break;

            case 'wait':
                // O payload do wait já vem convertido para número pelo seu Lexer
                const waitTime = command.payload as number;
                currentTime += waitTime;
                break;

            case 'unknown':
            default:
                // Tratar comando inválido ou ignorar. 
                // Para o MVP, você pode lançar um erro de sintaxe ou apenas ignorar.
                console.warn(`[Parser] Comando desconhecido ou inválido ignorado: "${line}"`);
                break;
        }
    }

    return timeline;
}