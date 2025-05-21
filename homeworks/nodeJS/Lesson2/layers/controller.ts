import router from "../helpers/router.ts";
import { getUserService } from "./service.ts";

router.addRoute("GET", "/data", (req, res) => {
  const data = getUserService();
  res.end(JSON.stringify(data));
});