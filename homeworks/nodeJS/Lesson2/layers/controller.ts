import router from "../helpers/router.ts";

router.addRoute("GET", "/data", (req, res) => {
  console.log("GET DATA")
  const data = "DATA";
  res.end(data);
});