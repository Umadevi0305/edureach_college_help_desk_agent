import serverless from "serverless-http";
import app from "./app.js";

// Wrap the existing Express app once, at module load (cold start).
const wrapped = serverless(app);

export const handler = async (event, context) => {
  // Reuse the cached MongoDB connection across warm invocations:
  // don't wait for the Node event loop to drain before returning.
  context.callbackWaitsForEmptyEventLoop = false;
  return wrapped(event, context);
};