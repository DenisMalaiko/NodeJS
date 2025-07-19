import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserDTO, MessageDTO, ChatDTO } from "../dto";
import * as fs from "fs";
import * as path from "path";

const DB_PATH = path.resolve(__dirname, './store.json');

@Injectable()
export class Store implements OnModuleInit {
  users: UserDTO[] = [];
  chats: ChatDTO[] = [];
  messages: MessageDTO[] = [];

  onModuleInit() {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, 'utf-8');
      const data = JSON.parse(raw);
      this.users = data.users || [];
      this.chats = data.chats || [];
      this.messages = data.messages || [];
    }
  }

  save() {
    const data = {
      users: this.users,
      chats: this.chats,
      messages: this.messages,
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  }
}