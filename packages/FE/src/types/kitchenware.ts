import { Language } from "./user";

export type Tool = {
  id: string;
  content: Partial<Record<Language, ToolTranslatableContent>>;
};

export type ToolTranslatableContent = { name: string; singularName: string };

export type KitchenwareDTO = Tool[];

export type KitchenwareCreateDTO = Omit<Tool, "id">;

export type KitchenwareEditDTO = Tool;

export type KitchenwareMergeDTO = { targetId: Tool["id"]; toolIds: Array<Tool["id"]> };
