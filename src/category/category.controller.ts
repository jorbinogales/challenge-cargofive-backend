import { hasRoles } from '@app/auth/decorator/role.decorator';
import { JwtAuthGuard } from '@app/auth/guard/jwtAuth.guard';
import { RolesGuard } from '@app/auth/guard/role.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Category, Role } from '@prisma/client';
import { CategoryService } from './category.service';

@Controller('category')
@ApiTags('category')
export class CategoryController {

    constructor(private readonly _categoryService: CategoryService){}

    @Get()
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Role.USER)
    @ApiBasicAuth("XYZ")
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get All Users [ALL]" })
    async find(): Promise<Category[]>{
        return await this._categoryService.find();
    }

}
