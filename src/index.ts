import { createYoga } from "graphql-yoga";
import "graphql-import-node";
import { schema } from "./schema/schema";
import { createServer } from "http";

async function main() {
  const yoga = createYoga({
    schema,
  });

  const server = createServer(yoga);

  const PORT = process.env.PORT || 3000;

  // Start the server
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main();
