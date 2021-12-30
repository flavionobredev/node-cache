import { Server, ServerCredentials } from '@grpc/grpc-js';
import { PackageDefinition } from '@grpc/proto-loader';

export interface GrpcAppConfigs {
  host: string;
}

export default interface GRPCModule {
  packageDefinition: PackageDefinition;
  initProtoServices(gRPCServer: Server): void;
}

export default class GrpcApp {
  private gRPCServer;

  constructor(private readonly gRPCConfigs: GrpcAppConfigs) {
    this.gRPCServer = new Server();
  }

  async listen() {
    this.gRPCServer.bindAsync(
      this.gRPCConfigs.host,
      ServerCredentials.createInsecure(),
      (err, port) => {
        if (err) {
          console.error(err);
          return process.exit(1);
        }

        this.gRPCServer.start();
        console.log(
          `${GrpcApp.name} gRPC server listen on ${this.gRPCConfigs.host}`,
        );
      },
    );
  }
}
