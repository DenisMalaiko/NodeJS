import { Injectable} from "@nestjs/common";
import {Store} from "../store/store";
import * as fs from "fs";
import * as path from "path";
import {UserDTO} from "../dto";
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class UsersService {
  constructor(private store: Store) {}

  createUser(user: { name: string, icon: Express.Multer.File | undefined }) {
    const id = uuidv4();
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

    const userData: UserDTO = {
      id: id,
      name: user.name,
      iconUrl: `/api/users/icons/${iconUrl}`
    }

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
}