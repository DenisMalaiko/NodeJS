import { users } from "./model.ts";

export const UserService = {
  getUsers() {
    return users;
  },
  addUser(user: any) {
    if (!user) return;
    return users.push(user);
  },
  updateUser(user: any) {
    const doc = users.find((u: any) => u.id === user.id);
    if (!doc) return;
    doc.name = user.name;
    return users;
  },
  deleteUser(id: string) {
    const index = users.findIndex((u: any) => u.id === id);
    if (index === -1) return;
    users.splice(index, 1);
    return users;
  }
}