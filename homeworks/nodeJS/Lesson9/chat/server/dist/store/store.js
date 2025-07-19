"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const DB_PATH = path.resolve(__dirname, './store.json');
let Store = class Store {
    users = [];
    chats = [];
    messages = [];
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
};
exports.Store = Store;
exports.Store = Store = __decorate([
    (0, common_1.Injectable)()
], Store);
//# sourceMappingURL=store.js.map