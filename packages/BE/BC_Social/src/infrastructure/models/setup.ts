import { SqlBuilder } from "@rcp-and-plan/commons";

import { User } from "./User";

export const setupModels = async () => {
  const { db: sequelize } = new SqlBuilder(
    process.env.CONNECTION_STRING_CONTENT!,
  );

  sequelize.addModels([User]);

  await Promise.all([User.sync()]);
};
