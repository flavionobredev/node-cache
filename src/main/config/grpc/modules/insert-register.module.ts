import { ProtoGrpcType } from "@/infra/proto/proto-types/insert-register";
import { RegisterServiceHandlers } from "@/infra/proto/proto-types/InsertRegisterPackage/RegisterService";
import GRPCModule from "@/main/factories/grpc-module.factory";
import { insertRegisterGRPCFactory } from "@/main/factories/insert-register.factory";
import { resolve } from 'path';

export default class InsertRegisterModule extends GRPCModule<ProtoGrpcType>{

  constructor(){
    super({
      filePath: resolve(__dirname, '..', '..', '..', '..', 'infra', 'proto', 'insert-register.proto'),
    })
    this.registerService({
      service: this.proto.InsertRegisterPackage.RegisterService.service,
      implementation: {
        SaveRegister: insertRegisterGRPCFactory
      } as RegisterServiceHandlers
    })
  }
}