import { ConfigModule, ConfigService } from "@nestjs/config"
import { JwtModuleAsyncOptions } from "@nestjs/jwt";

export const JwtOptions: JwtModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
        return {
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: {
                expiresIn:  configService.get<string>('EXPIRE_IN_TOKEN'),
            }
        }
    }
}