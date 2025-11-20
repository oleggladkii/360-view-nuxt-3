import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Tour ID is required" });
  }

  const client = await serverSupabaseClient(event);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (client as any)
    .from("tours")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  if (!data) {
    throw createError({ statusCode: 404, statusMessage: "Tour not found" });
  }

  return data;
});

