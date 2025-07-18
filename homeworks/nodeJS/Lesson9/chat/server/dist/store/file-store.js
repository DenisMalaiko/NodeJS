"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStore = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs/promises");
const path = require("path");
let FileStore = class FileStore {
    chatsPath = path.resolve('storage/chats.json');
    messagesPath = path.resolve('storage/messages.json');
    saveFile(file) {
        console.log('Pretending to save file:', file);
    }
    async saveChat(chat) {
        const chats = await this.getAllChats();
        chats.push(chat);
        await fs.mkdir(path.dirname(this.chatsPath), { recursive: true });
        await fs.writeFile(this.chatsPath, JSON.stringify(chats, null, 2));
    }
    async getAllChats() {
        try {
            const data = await fs.readFile(this.chatsPath, 'utf-8');
            return JSON.parse(data);
        }
        catch {
            return [];
        }
    }
    async saveMessage(msg) {
        const messages = await this.getAllMessages();
        messages.push(msg);
        await fs.mkdir(path.dirname(this.messagesPath), { recursive: true });
        await fs.writeFile(this.messagesPath, JSON.stringify(messages, null, 2));
    }
    async getAllMessages() {
        try {
            const data = await fs.readFile(this.messagesPath, 'utf-8');
            return JSON.parse(data);
        }
        catch {
            return [];
        }
    }
    async getMessagesByChatId(chatId) {
        const all = await this.getAllMessages();
        return all.filter((m) => m.chatId === chatId);
    }
};
exports.FileStore = FileStore;
exports.FileStore = FileStore = __decorate([
    (0, common_1.Injectable)()
], FileStore);
//# sourceMappingURL=file-store.js.map