import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

/**
 * Creates and configures an HTTP server
 */
class HttpServer {
  constructor({
    config, routes, logger, handleSocketConnected, authenticateSocket,
  }) {
    const app = express();
    app.disable("x-powered-by");
    app.use("/rest-docs", express.static(path.resolve(__dirname, "../../../docs/apidocs/")));
    app.use(routes);
    this.server = http.createServer(app);
    this.io = new Server(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    this.config = config;
    this.logger = logger;

    this.io.use(authenticateSocket);

    this.io.on("connection", handleSocketConnected);
  }

  async start() {
    const port = this.config.get("app.httpPort");
    const serviceName = this.config.get("app.serviceName");
    const serviceVersion = this.config.get("app.serviceVersion");
    return this.server.listen(port, () => {
      this.logger.info(`REST server for ${serviceName} v${serviceVersion} listening on port ${port}`);
    });
  }

  close(cb) {
    return this.server.close(cb);
  }
}

export default HttpServer;
