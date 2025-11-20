import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const tourId = getRouterParam(event, "id");
  if (!tourId) {
    throw createError({ statusCode: 400, statusMessage: "Tour ID is required" });
  }

  const client = await serverSupabaseClient(event);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (client as any).rpc("increment_tour_views", {
    p_tour_id: tourId,
  });

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return { success: true };
});