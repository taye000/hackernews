import express, { Request, Response } from "express";
import {
  getGraphQLParameters,
  processRequest,
  shouldRenderGraphiQL,
  renderGraphiQL,
} from "graphql-helix";
import "graphql-import-node";
import { schema } from "./schema/schema";

async function main() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware to parse JSON requests
  app.use(express.json());

  // Test route
  app.get("/", (req: Request, res: Response) => {
    res.send({ test: true });
  });

  // GraphQL endpoint
  app.all("/graphql", async (req: Request, res: Response) => {
    const request = {
      headers: req.headers,
      method: req.method,
      query: req.query,
      body: req.body,
    };

    if (shouldRenderGraphiQL(request)) {
      res.header("Content-Type", "text/html");
      res.send(
        renderGraphiQL({
          endpoint: "/graphql",
        })
      );
      return;
    }

    const { operationName, query, variables } = getGraphQLParameters(request);

    const result = await processRequest({
      request,
      schema,
      operationName,
      query,
      variables,
    });

    res.setHeader("Content-Type", "application/json");
    res.send(result);
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main();
