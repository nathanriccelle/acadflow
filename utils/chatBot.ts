const RESPOSTAS_BOT = [
  'Compreendo perfeitamente. Como isso fez você se sentir no momento?',
  'Entendo. É muito comum se sentir assim diante dessa situação.',
  'Estou aqui para ouvir você. Pode me dar mais detalhes?',
  'Isso parece ter sido desafiador. O que você acha que ajudaria agora?',
  'Agradeço por compartilhar isso comigo. Respire fundo, estamos juntos nessa.',
];

const PALAVRAS_CRISE = [
  'suicid',
  'me matar',
  'quero morrer',
  'não aguento',
  'nao aguento',
  'autolesão',
  'autolesao',
  'me cortar',
  'acabar com tudo',
];

const MENSAGEM_CRISE =
  'Percebo que você está passando por um momento muito difícil. ' +
  'Este app não substitui atendimento profissional. ' +
  'Por favor, ligue agora para o CVV: 188 (24h, gratuito). ' +
  'Se houver risco imediato, ligue 192 (SAMU) ou vá ao hospital mais próximo.';

export function getSaudacaoBot(primeiroNome: string): string {
  return `Olá, ${primeiroNome}! Como posso te ajudar hoje?`;
}

export function getRespostaBot(mensagemUsuario: string): string {
  const texto = mensagemUsuario.toLowerCase();

  if (PALAVRAS_CRISE.some((palavra) => texto.includes(palavra))) {
    return MENSAGEM_CRISE;
  }

  return RESPOSTAS_BOT[Math.floor(Math.random() * RESPOSTAS_BOT.length)];
}
