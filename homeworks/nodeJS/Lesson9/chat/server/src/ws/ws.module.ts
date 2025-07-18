import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import {ChatGateway} from "./chat.gateway";
import {FileStore} from "../store/file-store";
import {StoreModule} from "../store/store.module";

@Module({
  imports: [RedisModule, StoreModule],
  providers: [ChatGateway, FileStore],
})
export class WsModule {}
