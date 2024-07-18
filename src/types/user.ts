import { UserSchema } from "@/zod-types";
import * as z from "zod";

export const GetUserTypeRequestSchema = UserSchema.pick({
  id: true,
});
export type GetUserTypeRequestPayload = z.infer<
  typeof GetUserTypeRequestSchema
>;
