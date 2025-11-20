import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { SupabaseJwtPayload } from "~/interfaces/SupabaseJwtPayload";

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);

  const userId = (user as SupabaseJwtPayload).id ?? (user as SupabaseJwtPayload).sub;
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const id = getRouterParam(event, "id");
  const client = await serverSupabaseClient(event);

  const { error } = await client
    .from("tours")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return { success: true };
});

