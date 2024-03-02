import Fastify from "fastify";
import Register from "./controllers/UserController";

// Define the User model

const app = Fastify({
  logger: true,
});

app.post("/register", Register);

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("SERVER  IS RUNNING ON PORT", port);
});
