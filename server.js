const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(require("./generate.js")());
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 4000;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`
  
  JSON Server is Running!  
  
  Resources
  http://localhost:4000/students
  http://localhost:4000/courses

  Home
  http://localhost:4000
  
  `);
});
