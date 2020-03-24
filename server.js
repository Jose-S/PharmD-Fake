const jsonServer = require("json-server");
const auth = require("json-server-auth");
const server = jsonServer.create();
const router = jsonServer.router(require("./generate.js")());
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 4000;

// /!\ Bind the router db to the app
server.db = router.db;

const rules = auth.rewriter({
  // Permission rules
  students: 660,
  courses: 640
});

server.use(rules);
server.use(auth);
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
