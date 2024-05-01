import { EntityNotFoundError } from "@rcp-and-plan/commons";

import { IUserQueries } from "@application/queries/users/IUserQueries";
import { UserAccountResponse } from "@dtos/index";
import { User } from "@infrastructure/models";

export class UserQueries implements IUserQueries {
  async getDataById(id: string) {
    const result = await User.findByPk(id);
    if (!result)
      throw new EntityNotFoundError("User not found", "User", [{ id }]);

    const response: UserAccountResponse = {
      id: result.dataValues.id,
      accountId: result.dataValues.account_id,
      email: result.dataValues.email,
      nickName: result.dataValues.nick_name,
      name: result.dataValues.name,
      lastName: result.dataValues.last_name,
      language: result.dataValues.language,
      profilePicture: result.dataValues.profile_picture,
    };

    return response;
  }

  async getDataByAccountId(accountId: string) {
    const result = await User.findOne({ where: { account_id: accountId } });
    if (!result)
      throw new EntityNotFoundError("User not found", "User", [{ accountId }]);

    const response: UserAccountResponse = {
      id: result.dataValues.id,
      accountId: result.dataValues.account_id,
      email: result.dataValues.email,
      nickName: result.dataValues.nick_name,
      name: result.dataValues.name,
      lastName: result.dataValues.last_name,
      language: result.dataValues.language,
      profilePicture: result.dataValues.profile_picture,
    };

    return response;
  }
}
