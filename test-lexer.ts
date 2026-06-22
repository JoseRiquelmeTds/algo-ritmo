import { parseCode } from './src/core/parser/interpreter'; // Ajuste o caminho se necessário

console.log("==================================================");
console.log("🎵 ACADEMIA DE TESTES - INTERPRETER ALGO_RITMO 🎵");
console.log("==================================================\n");

// --- TESTE 1: O Cenário Solicitado ---
console.log("🧪 TESTE 1: Sequência Padrão (Play, Wait misturados)");
const codigoTeste1 = `
play("clap");
play("clap");
wait(0.5);
play("clap");
play("toc");
wait(0.5);
play("KABOOOOM");
`;

const timeline1 = parseCode(codigoTeste1);
console.log("Resultado da Timeline 1:");
console.log(JSON.stringify(timeline1, null, 2));
console.log("\n--------------------------------------------------\n");


// --- TESTE 2: Robustez contra Código "Sujo" ---
console.log("🧪 TESTE 2: Espaços em branco, quebras de linha extras e Tabulações");
const codigoTeste2 = `
    play("kick");

  wait(  1.5  );
        play("clap");
        
play("toc");
`;

const timeline2 = parseCode(codigoTeste2);
console.log("Resultado da Timeline 2 (Devem ser calculados tempos progressivos limpos):");
console.log(JSON.stringify(timeline2, null, 2));
console.log("\n--------------------------------------------------\n");


// --- TESTE 3: Resiliência contra Comandos Inválidos ---
console.log("🧪 TESTE 3: Lidando com Erros de Sintaxe (Deve ignorar sem crashar)");
const codigoTeste3 = `
play("bass");
wait(1);
dance_like_crazy(); // Comando inválido! O Parser deve apenas avisar e continuar
play("toc");
`;

console.log("Avisos esperados do Parser durante o processamento:");
const timeline3 = parseCode(codigoTeste3);
console.log("\nResultado da Timeline 3 (O 'synth' deve tocar no tempo certo, ignorando o erro):");
console.log(JSON.stringify(timeline3, null, 2));
console.log("\n==================================================");