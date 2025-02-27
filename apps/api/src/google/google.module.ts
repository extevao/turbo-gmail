import { Module } from '@nestjs/common';
import { GoogleOAuthClientModule } from './google-oauth-client/google-oauth-client.module';
import { GmailModule } from './gmail/gmail.module';
import { CredenciaisGoogleModule } from './credenciais-google/credenciais-google.module';
import { PubSubModule } from './pub-sub/pub-sub.module';

@Module({
  imports: [
    GoogleOAuthClientModule,
    GmailModule,
    CredenciaisGoogleModule,
    PubSubModule,
  ],
  controllers: [],
  providers: [],
})
export class GoogleModule {}
