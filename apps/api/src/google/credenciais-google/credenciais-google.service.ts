import { Injectable } from '@nestjs/common';

import { CreateCredencialGoogleDto } from './dto/create-credencial-google.dto';

import { getConnection } from 'src/db/connection';
import { GoogleOAuthClientService } from '../google-oauth-client/google-oauth-client.service';

@Injectable()
export class CredenciaisGoogleService {
  constructor(private googleOAuthClientService: GoogleOAuthClientService) {}

  async create(dto: CreateCredencialGoogleDto) {
    console.log('[create]', dto);

    const connection = getConnection();

    try {
      const googleTokens =
        await this.googleOAuthClientService.getTokensOAuthClient(dto.code);

      console.log('[googleTokens]', googleTokens);

      const dataExpiracaoToken = googleTokens.expiry_date
        ? new Date(googleTokens.expiry_date)
        : null;

      console.log('[dataExpiracaoToken]', { dataExpiracaoToken });

      const [credencial] = await connection
        .insert({
          code_response: {
            code: dto.code,
          },
          tokens: googleTokens,
          expiracao_token: dataExpiracaoToken,
        })
        .into('credenciais_google')
        .returning('*');

      return credencial;
    } catch (err) {
      console.error(err);

      throw err;
    }
  }

  async findAll() {
    const connection = getConnection();

    const codesClientResponses = await connection
      .select('*')
      .from('credenciais_google');

    return codesClientResponses;
  }
}
