import { readDB, writeDB } from "../helpers/database.ts";

export const getUsers = async () => {
  try {
    return await readDB();
  } catch(e) {
    const error = new Error("SERVER ERROR") as any;
    error.status = 500;
    throw error;
  }
}

export const addUser = async (user: any) => {
  try {
    if (!user) return;
    const db = await readDB();
    await writeDB([...db, user]);

    return await readDB();
  } catch(e) {
    const error = new Error("SERVER ERROR") as any;
    error.status = 500;
    throw error;
  }
}

export const getUser = async (id: string) => {
  try {
    if (!id) return;
    const db = await readDB();

    return db.find((u: any) => u.id === id);
  } catch(e) {
    const error = new Error("SERVER ERROR") as any;
    error.status = 500;
    throw error;
  }
}

export const updateUser = async (id: string, user: any) => {
  try {
   if (!id || !user) return;
   const db = await readDB();
   const index = db.findIndex((u: any) => u.id === id);
   if (index === -1) return;
   db[index] = {
     id: id,
     ...user
   };
   await writeDB(db);

   return await getUser(id);
  } catch(e) {
    const error = new Error("SERVER ERROR") as any;
    error.status = 500;
    throw error;
  }
}

export const deleteUser = async (id: string) => {
  try {
    if (!id) return;
    const db = await readDB();
    const index = db.findIndex((u: any) => u.id === id);
    if (index === -1) return;
    db.splice(index, 1);
    await writeDB(db);

    return {
      message: "User has been successfully deleted",
      status: 200
    };
  } catch(e) {
    const error = new Error("SERVER ERROR") as any;
    error.status = 500;
    throw error;
  }
}