import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { SupabaseJwtPayload } from "~/interfaces/SupabaseJwtPayload";

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);

  const userId = (user as SupabaseJwtPayload).id ?? (user as SupabaseJwtPayload).sub;
  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const client = await serverSupabaseClient(event);


  const { data, error } = await client
    .from("tours")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return data;
});
