const body =
  'VGVzdGUNCl9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fDQpEZTogRXN0ZXZhbyBUdXJib0dtYWlsIDxlc3RldmFvYmx2QGdtYWlsLmNvbT4NCkVudmlhZG86IHNleHRhLWZlaXJhLCAzMCBkZSBhZ29zdG8gZGUgMjAyNCAxNTo1Ng0KUGFyYTogZXN0ZXZhby52YXNxdWVzQGJtbG9nLmNvbS5iciA8ZXN0ZXZhby52YXNxdWVzQGJtbG9nLmNvbS5icj47IGVzdGV2YW92YXNxdWVzQGhvdG1haWwuY29tIDxlc3RldmFvdmFzcXVlc0Bob3RtYWlsLmNvbT47IHNpc3RlbWFAYm1sb2cuY29tLmJyIDxzaXN0ZW1hQGJtbG9nLmNvbS5icj4NCkFzc3VudG86IE9sYSBkbyBUdXJib0dtYWlsIE11bmRvISENCg0KRXN0YSDDqSB1bWEgbWVuc2FnZW0gcGFyYSBkaXplciBvbMOhIS4gRW50YW8uLi4gSGVsbG8hLCBPbGEhLCBPcGEhDQo=';

function b64_to_utf8(base64EncodedString) {
  // Cria um buffer a partir da string Base64
  const buffer = Buffer.from(base64EncodedString, 'base64');

  // Converte o buffer para uma string UTF-8
  const utf8String = buffer.toString('utf8');

  return utf8String; // Saída: "Hello World"
}

function base64ToUtf8(base64String) {
  // Decodificar base64 para uma string de bytes
  const binaryString = atob(base64String);

  // Converter a string binária em uma string UTF-8
  const utf8String = decodeURIComponent(escape(binaryString));

  return utf8String;
}
console.log('------------------- [b64_to_utf8] ---------------------');
console.log(b64_to_utf8(body));

console.log('----------------------------------------');

console.log('------------------- [base64ToUtf8]  ---------------------');

console.log(base64ToUtf8(body));

console.log('----------------------------------------');
