import { createClient } from "@redis/client";

const client = createClient({
  password: process.env["REDIS_PASSWORD"],
  username: "default",
  socket: {
    reconnectStrategy: function (retries) {
      if (retries > 20) {
        console.log(
          "Too many attempts to reconnect. Redis connection was terminated",
        );
        return new Error("Too many retries.");
      } else {
        return retries * 500;
      }
    },
    connectTimeout: 10000,
  },
});

client.on("error", error => console.error("Redis client error:", error));

export default client;
