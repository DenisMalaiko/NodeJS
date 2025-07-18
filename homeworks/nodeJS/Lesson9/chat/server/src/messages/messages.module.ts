import { Module } from '@nestjs/common';
import {MessagesController} from "./messages.controller";
import {FileStore} from "../store/file-store";
import {StoreModule} from "../store/store.module";

@Module({
  imports: [StoreModule],
  controllers: [MessagesController],
  providers: [FileStore]
})
export class MessagesModule {}
