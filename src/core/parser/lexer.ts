import { 
  type ExtractedCommand, 
  AVAILABLE_SOUNDS,
} from "./types";
// Tipo auxiliar interno para mapear os padrões suportados
interface CommandPattern {
  type: ExtractedCommand["type"]; // Garante correspondência estrita com os tipos do projeto
  regex: RegExp;
  // Função extratora para tratar o payload com base no casamento da Regex
  getPayload: (match: RegExpMatchArray) => string | number | null;
}

// Tabela de comandos suportados (Fácil de estender no futuro)
const COMMAND_PATTERNS: CommandPattern[] = [
  {
    type: "play",
    regex: /^play\(["](.+?)["]\);?$/,
    getPayload: (match) => {
        const sound = match[1];
        return (AVAILABLE_SOUNDS as readonly string[]).includes(sound) ? sound : null;
    }
  },
  {
    type: "wait",
    regex: /^wait\(([0-9.]+)\);?$/,
    getPayload: (match) => Number(match[1]),
  },
];

export function extractCommand(line: string): ExtractedCommand {
  const cleanLine = line.trim();

  // Percorre os padrões disponíveis para encontrar o primeiro correspondente
  for (const pattern of COMMAND_PATTERNS) {
const match = cleanLine.match(pattern.regex);
    if (match) {
      const payload = pattern.getPayload(match);
      
      // Se o validador interno retornar null (som inválido), ele ignora e vira 'unknown'
      if (payload !== null) {
        return {
          type: pattern.type,
          payload: payload,
        } as ExtractedCommand; // Asserção limpa: nós garantimos a estrutura correta através do getPayload
      }
    }
  }

  return { type: "unknown", payload: cleanLine };
}