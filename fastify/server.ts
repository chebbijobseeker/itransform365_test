import Fastify from "fastify";
import Register from "./controllers/UserController";

// Define the User model

const server = Fastify();

server.post("/register", Register);

server.listen(5000, (err, address) => {
  if (err) throw err;
  console.log(`Server listening on ${address}`);
});
