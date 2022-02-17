import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtOptions } from './jwt/jwtOptions';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RolesGuard } from './guard/role.guard';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync(JwtOptions)
  ],
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [AuthService, JwtStrategy, RolesGuard],
})
export class AuthModule {}
