import { Controller, Get, HttpStatus, Param } from '@nestjs/common'
import { RolesService } from './roles.service'
import { Roles } from './models/roles.model'
import { CreateRolesDto } from './dto/create-roles.dto'
import { UpdateRolesDto } from './dto/update-roles.dto'
import { ROLES } from '../../../constants/roles.constants'
import { RolesGuards } from '../../../decorators/roles-guards.decorator'
import { EntityController } from '../../../classes/core/entity.controller'

@Controller('/roles')
export class RolesController extends EntityController<Roles, CreateRolesDto, UpdateRolesDto> {
  constructor(protected service: RolesService) {
    super(service)
  }

  @RolesGuards([ROLES.ADMIN])
  @Get('/name/:name')
  async findByName(@Param('name') name: string): Promise<{ response: Roles; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByName(name),
    }
  }
}
