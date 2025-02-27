import { Global, Module } from '@nestjs/common';
import { GoogleOAuthClientService } from './google-oauth-client.service';

@Global()
@Module({
  providers: [GoogleOAuthClientService],
  exports: [GoogleOAuthClientService],
})
export class GoogleOAuthClientModule {}
