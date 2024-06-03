import { ulid } from "ulidx";
import { Identifier } from "./Indentifier";

export class UniqueEntityID extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id ? id : ulid());
  }
}
