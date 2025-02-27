export function decodeEmail(base64EncodedString) {
  // Cria um buffer a partir da string Base64
  const buffer = Buffer.from(base64EncodedString, 'base64');

  // Converte o buffer para uma string UTF-8
  const utf8String = buffer.toString('utf8');

  return utf8String; // Saída: "Hello World"
}
