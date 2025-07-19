"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const store_1 = require("../store/store");
const fs = require("fs");
const path = require("path");
const uuid_1 = require("uuid");
let UsersService = class UsersService {
    store;
    constructor(store) {
        this.store = store;
    }
    createUser(user) {
        const id = (0, uuid_1.v4)();
        let iconUrl = "default.png";
        if (user.icon) {
            const uploadDir = path.resolve(__dirname, '../../public/icons/');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }
            const extension = path.extname(user.icon.originalname);
            const fileName = `${id}${extension}`;
            const filePath = path.join(uploadDir, fileName);
            fs.writeFileSync(filePath, user.icon.buffer);
            iconUrl = fileName;
        }
        const userData = {
            id: id,
            name: user.name,
            iconUrl: `/api/users/icons/${iconUrl}`
        };
        this.store.users.push(userData);
        this.store.save();
        return userData;
    }
    getUsers() {
        return {
            items: this.store.users,
            total: this.store.users.length
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [store_1.Store])
], UsersService);
//# sourceMappingURL=users.service.js.map