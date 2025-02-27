import { formatInTimeZone } from 'date-fns-tz';

const brasilTimezone = 'America/Sao_Paulo';

export function nowBrasil(formatStr = 'yyyy-MM-dd HH:mm:ssXXX') {
  const data = formatInTimeZone(new Date(), brasilTimezone, formatStr);

  console.log('Brazil Time:', data);

  return data;
}

export function logAgora() {
  const agora = new Date();

  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(agora);
}
