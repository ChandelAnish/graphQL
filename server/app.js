//This code sets up an Apollo GraphQL server using Express for handling requests. It integrates Apollo Server with Express and uses plugins to manage server shutdowns gracefully.

// npm install @apollo/server express graphql cors
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';//Middleware that integrates Apollo Server with Express, handling GraphQL queries.
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import mergedTypeDefs from './typeDefs/index.js';
import mergedResolvers from './resolvers/index.js';
import dotenv from 'dotenv';
dotenv.config()
import connectDB from './DB/connectDB.js';


const __dirname = path.resolve()//This function resolves the sequence of paths or path segments into an absolute path. When called without any arguments, it will resolve the current working directory (***the directory from which the Node.js process was launched).
// console.log(__dirname)


// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.

const httpServer = http.createServer(app);//An HTTP server is created to handle incoming requests to the Express app. This server is necessary because ApolloServer doesn't directly handle HTTP requests—it relies on an HTTP server like this one.

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
  typeDefs:mergedTypeDefs,
  resolvers:mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],//This plugins is used to ensure that the server shuts down gracefully when it is stopped or restarted.The ApolloServerPluginDrainHttpServer is like a polite way of shutting down your server.
    // This plugin gives the server time to finish ongoing work before shutting down.
    // It stops taking new requests but lets the current ones finish so no data is lost or interrupted.
    // The reason httpServer is passed into ApolloServerPluginDrainHttpServer({ httpServer }) is to give Apollo Server access to the underlying HTTP server (created by Express) so that it can manage the shutdown process gracefully
    //ApolloServerPluginDrainHttpServer needs to interact with this httpServer because the GraphQL API you're running through Apollo Server is served via this HTTP server.
    //You pass httpServer to the plugin so that Apollo can manage the entire lifecycle of the HTTP server, ensuring that when your app shuts down, it does so smoothly without cutting off active connections or requests.
});

// Ensure we wait for our server to start
await server.start();//This ensures the Apollo server is started and ready to handle requests before Express starts.


 
// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/graphql',//This sets up middleware for the / route, which means any request sent to the root of your server (like http://localhost:4000/) will go through this middleware stack.
  cors({
    origin:"http://localhost:5173",
    credentials: true
  }),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  //This part connects Apollo Server to the Express app.
  //expressMiddleware(server, ...) is the bridge that lets the Apollo GraphQL server handle requests that come through the Express app.
  expressMiddleware(server, {
    context: async ({ req, res }) => ({ req, res})
    // context: async ({ req }) => ({ token: req.headers.token }),// The context function is where you can pass data or configuration that can be accessed in your resolvers (functions that handle GraphQL queries/mutations).
    // In this case, it takes the incoming request (req) and looks at its headers for a token (req.headers.token), usually used for authentication.
    // This token is then passed to the context, and you can use it in your resolvers to identify or authorize the user making the request.
  }),
);

// connect to database
connectDB()


app.use(express.static(path.join(__dirname,"client/dist")))

app.use("*",(req,res)=>{// i.e for all route other than /graphql our client side will be rendered
  res.sendFile(path.join(__dirname,"client/dist","index.html"))
})


// Modified server startup
await new Promise((resolve) =>
  httpServer.listen({ port: 4000 }, resolve),
);

console.log(`🚀 Server ready at http://localhost:4000/graphql`);


// write this in package.json (**recommended) --> "build": "npm install && cd client && npm install && npm run build"

//            OR

// write this in package.json --> "build": "npm install && npm install --prefix client && npm run build --prefix client"


// Breakdown of the Command :

// npm install: Installs all dependencies listed in the root project's package.json, creating a node_modules folder if it doesn't exist.

// &&: Ensures that the second command only runs if the first command completes successfully.

// npm install --prefix client: The --prefix flag specifies the directory where npm should look for the package.json    file and install dependencies. In this case, it points to the client directory.
// This command will install the dependencies listed in the package.json file located in the client directory, creating or updating the node_modules folder inside the client folder.

// npm run build --prefix client : similarly for this command also