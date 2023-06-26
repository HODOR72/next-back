import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Subscriptions } from './models/subscriptions.model'
import { EntityService } from '../../../classes/core/entity.service'
import { Users } from '../../usersComponent/users/models/users.model'
import { UsersService } from '../../usersComponent/users/users.service'
import { CreateSubscriptionsDto } from './dto/create-subscriptions.dto'
import { LoggerService } from '../../loggerComponent/logger/logger.service'

@Injectable()
export class SubscriptionsService extends EntityService<Subscriptions> {
  constructor(
    @InjectModel(Subscriptions) protected repository: typeof Subscriptions,
    private usersService: UsersService,
    protected loggerService: LoggerService,
  ) {
    super(repository, 'Subscriptions', loggerService)
  }

  async create(dto: CreateSubscriptionsDto): Promise<Subscriptions> {
    const user: Users = await this.usersService.findByEmail(dto.userEmail)

    await this.loggerService?.create({
      user_id: user.id,
      method_name: 'Create',
      model_name: 'Subscriptions',
      props: JSON.stringify(dto)
    })

    return await this.repository.create({ ...dto, user_id: user.id })
  }
}
