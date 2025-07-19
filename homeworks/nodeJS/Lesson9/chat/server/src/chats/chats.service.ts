import {Injectable} from "@nestjs/common";
import {Store} from "../store/store";

@Injectable()
export class ChatsService {
  constructor(private store: Store) {}

  getChats(name: any) {
    console.log("USER NAME ", name);
    console.log("CHATS ", this.store.chats);
    console.log("RESULT ", this.store.chats.filter(chat => chat.members.includes(name)))

    return this.store.chats.filter(chat => chat.members.includes(name));
  }
}