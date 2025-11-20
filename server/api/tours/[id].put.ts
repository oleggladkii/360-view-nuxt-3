import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { SupabaseJwtPayload } from "~/interfaces/SupabaseJwtPayload";

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);

  const userId = (user as SupabaseJwtPayload).id ?? (user as SupabaseJwtPayload).sub;
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const client = await serverSupabaseClient(event);

  const { data, error } = await client
    .from("tours")
    .update(body)
    .eq("id", id)
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  if (!data) {
    throw createError({ statusCode: 404, statusMessage: "Tour not found" });
  }

  return data;
});

