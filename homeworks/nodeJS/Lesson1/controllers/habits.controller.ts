export async function handle(req: any, res: any, id: string) {
  try {
    console.group("TRY")
    console.log("REQ ", req)
    console.log("RES ", res)
    console.log("ID ", id)
    console.groupEnd()


  } catch (error) {
    console.log("ERR ", error)
  }
}