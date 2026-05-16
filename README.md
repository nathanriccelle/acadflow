# AcadFlow

Projeto Senac — Sistema para Internet. App de apoio ao bem-estar estudantil (humor, tarefas, mural anônimo, respiração guiada e chat de apoio virtual).

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- Conta no [Firebase](https://console.firebase.google.com)
- [Expo Go](https://expo.dev/go) no celular ou emulador Android/iOS

## Configuração do Firebase

1. Crie um projeto no Firebase Console.
2. Ative **Authentication** → método **E-mail/senha**.
3. Crie o **Firestore Database** (modo produção).
4. Registre um app **Web** e copie as credenciais para o `.env`.
5. Publique regras de segurança no Firestore (usuário autenticado acessa apenas seus dados; mural e likes conforme regras do time).

## Variáveis de ambiente

Na **raiz do projeto**, crie o arquivo `.env` (não commite no Git):

```env
# Obrigatório — Auth + Firestore
EXPO_PUBLIC_FIREBASE_API_KEY=sua_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto-id
EXPO_PUBLIC_FIREBASE_APP_ID=1:000000000000:web:xxxxxxxxxxxxxxxx

# Opcional
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=000000000000
```

Os valores ficam em: **Firebase Console → Configurações do projeto → Seus apps → app Web → Configuração do SDK**.

Documentação Expo: [variáveis de ambiente](https://docs.expo.dev/guides/environment-variables/).

## Instalação e execução

```bash
npm install
npx expo start
```

Escaneie o QR code com o Expo Go ou pressione `a` (Android) / `i` (iOS) no terminal.

## Testar o app

**É necessário criar uma conta** para usar o aplicativo:

1. Na primeira abertura, toque em **Cadastre-se**.
2. Informe nome, e-mail e senha (mínimo 6 caracteres).
3. Após o cadastro, você entra na home e pode testar humor, tarefas, mural, respiração e chat.

Sem login, as telas principais não ficam acessíveis.

## Funcionalidades

| Recurso | Descrição |
|---------|-----------|
| Login / Cadastro | Firebase Authentication |
| Humor do dia | Check-in persistido no Firestore |
| Minhas tarefas | CRUD sincronizado |
| Mural de desabafos | Posts anônimos e likes |
| Respiração guiada | Sessão registrada ao concluir o timer |
| Chat | Apoio virtual com histórico (não substitui psicólogo) |
| Perfil | Streak de autocuidado (humor + respiração) |

## Repositório

[github.com/nathanriccelle/acadflow](https://github.com/nathanriccelle/acadflow)
