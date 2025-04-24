/* eslint-disable @typescript-eslint/no-unused-vars */

import { IGetUsersRepository, IGetUsersController } from "./protocols";

export class GetUsersController implements IGetUsersController {
    constructor(private readonly getUsersRepository: IGetUsersRepository) {}

    async handle() {
        try {
            const users = await this.getUsersRepository.getUsers();

            return {
                statusCode: 200,
                body: users,
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: "Something went wrong",
            }
        }
    }
}