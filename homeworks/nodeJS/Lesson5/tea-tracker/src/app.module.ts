import { Module } from '@nestjs/common';
import { TeaModule } from './tea/tea.module';

@Module({
  imports: [TeaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
