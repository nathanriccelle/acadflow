import { FirebaseError } from 'firebase/app';

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'E-mail inválido.';
      case 'auth/user-disabled':
        return 'Esta conta foi desativada.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'E-mail ou senha incorretos.';
      case 'auth/email-already-in-use':
        return 'Este e-mail já está cadastrado.';
      case 'auth/weak-password':
        return 'A senha deve ter pelo menos 6 caracteres.';
      case 'auth/too-many-requests':
        return 'Muitas tentativas. Tente novamente mais tarde.';
      case 'auth/network-request-failed':
        return 'Sem conexão. Verifique sua internet.';
      case 'auth/operation-not-allowed':
      case 'auth/configuration-not-found':
        return (
          'Autenticação não está ativa no Firebase.\n\n' +
          'No Console: Authentication → Começar → Sign-in method → ' +
          'ative "E-mail/senha".'
        );
      case 'auth/invalid-api-key':
        return 'Chave da API inválida. Confira o arquivo .env.';
      default:
        if (error.message.includes('CONFIGURATION_NOT_FOUND')) {
          return (
            'Autenticação não está ativa no Firebase.\n\n' +
            'No Console: Authentication → Começar → Sign-in method → ' +
            'ative "E-mail/senha".'
          );
        }
        break;
    }
  }

  return 'Não foi possível concluir. Tente novamente.';
}
