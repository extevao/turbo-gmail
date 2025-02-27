import { gmail_v1 } from 'googleapis';
import { MessageHelper } from './message-helper';

const PayloadHeadersNameTarget = [
  'Delivered-To',
  'From',
  'To',
  'Subject',
  'Thread-Topic',
  'Thread-Index',
  'Date',
];
const PartsHeadersNameTarget = ['Content-Type'];
const MimeTypeHtml = 'text/html';

export type OptionsEmailMapper = { transform: boolean; raw: boolean };

export class EmailMapper {
  static format(
    gmailMessage: gmail_v1.Schema$Message,
    { transform, raw }: OptionsEmailMapper,
  ) {
    if (raw && gmailMessage.raw) {
      return {
        ...gmailMessage,
        raw: b64_to_utf8(gmailMessage.raw),
        rawOriginal: gmailMessage.raw,
      };
    }

    if (!transform) {
      return gmailMessage;
    }

    console.log('EmailMapper', { transform, raw }, { id: gmailMessage.id });

    const email = {
      id: gmailMessage.id,
      threadId: gmailMessage.threadId,
      labels: gmailMessage.labelIds,
      snippet: gmailMessage.snippet,
    };

    const payload = EmailMapper.getPayload(gmailMessage);

    return {
      ...email,
      payload,
    };
  }

  static getPayload(gmailMessage: gmail_v1.Schema$Message) {
    if (!gmailMessage.payload) return null;

    const payload = {
      partId: gmailMessage.payload.partId,
      mimeType: gmailMessage.payload.mimeType,
      headers: gmailMessage.payload.headers.filter((header) =>
        PayloadHeadersNameTarget.includes(header.name),
      ),
    };

    const parts =
      gmailMessage.payload.parts?.map((part) => {
        const item = {
          partId: part.partId,
          mimeType: part.mimeType,
          headers: part.headers.filter((header) =>
            PartsHeadersNameTarget.includes(header.name),
          ),
          body: b64_to_utf8(part.body.data),
          original: part.body.data,
          lastMessage: EmailMapper.getLastMessage(part),
        };

        return item;
      }) ?? null;

    const body =
      gmailMessage.payload.body && gmailMessage.payload.body.data
        ? b64_to_utf8(gmailMessage.payload.body.data)
        : null;

    return {
      ...payload,
      parts,
      body,
    };
  }

  static getLastMessage(part: gmail_v1.Schema$MessagePart) {
    if (MimeTypeHtml === part.mimeType) {
      return MessageHelper.extractLastMessage(b64_to_utf8(part.body.data));
    }

    return null;
  }
}

function b64_to_utf8(base64EncodedString) {
  // Cria um buffer a partir da string Base64
  const buffer = Buffer.from(base64EncodedString, 'base64');

  // Converte o buffer para uma string UTF-8
  const utf8String = buffer.toString('utf8');

  return utf8String; // Saída: "Hello World"
}
