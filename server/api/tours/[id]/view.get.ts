import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const tourId = getRouterParam(event, "id");
  if (!tourId) {
    throw createError({ statusCode: 400, statusMessage: "Tour ID is required" });
  }

  const client = await serverSupabaseClient(event);

  // Increment views first
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: rpcError } = await (client as any).rpc("increment_tour_views", {
    p_tour_id: tourId,
  });

  if (rpcError) {
    throw createError({ statusCode: 500, statusMessage: rpcError.message });
  }

  // Then fetch the tour with updated views
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: tour, error } = await (client as any)
    .from("tours")
    .select("*")
    .eq("id", tourId)
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  if (!tour) {
    throw createError({ statusCode: 404, statusMessage: "Tour not found" });
  }

  // Fetch author details
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: author } = await (client as any)
    .from("public_profiles")
    .select("full_name, avatar_url")
    .eq("id", tour.user_id)
    .single();

  return {
    ...tour,
    user: author,
  };
});

