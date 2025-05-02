import validator from "validator";

import { User } from "../../models/users";
import { HttpRequest, HttpResponse } from "../protocols";
import { CreateUserParams, ICreateUserController, ICreateUserRepository } from "./protocols";

export class CreateUserController implements ICreateUserController {
    constructor(private readonly createUserRepository: ICreateUserRepository) {}

    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
        try {
            const requiredParams = ["firstName", "lastName", "email", "password"];
            for (const param of requiredParams) {
                if (!httpRequest?.body?.[param as keyof CreateUserParams]?.length) {
                    return {
                        statusCode: 400,
                        body: `Missing param: ${param}`
                    }
                }
            }

            if (!httpRequest.body) {
                return {
                    statusCode: 400,
                    body: "Missing body"
                }
            }

            if (!validator.isEmail(httpRequest.body!.email)) {
                return {
                    statusCode: 400,
                    body: "Invalid email"
                }
            }

            const user = await this.createUserRepository.createUser(httpRequest.body!);

            return {
                statusCode: 201,
                body: user
            }
        } catch(error) {
            return {
                statusCode: 500,
                body: "Something went wrong"
            }
        } 
    }

}