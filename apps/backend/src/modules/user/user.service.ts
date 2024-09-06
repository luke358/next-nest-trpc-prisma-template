import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "@server/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }
  private Logger = new Logger(UserService.name)

  async getUser(id: number): Promise<any> {
    this.Logger.log(`Getting user with id ${id}`)
    return { id, name: `User ${id}` }
  }
  async list(): Promise<any> {
    this.Logger.log(`Listing all users`)
    return [
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
      { id: 3, name: "User 3" },
    ]
  }
  async create(data: { name: string; email: string }): Promise<any> {
    this.Logger.log(`Creating user with data ${JSON.stringify(data)}`)
    try {
      return await this.prismaService.user.create({ data })
    } catch (error) {
      this.Logger.error(`Error creating user: ${error}`)
      throw error
    }
  }
}
