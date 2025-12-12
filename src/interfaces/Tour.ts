export interface Tour {
  id: string;
  user_id: string;
  name: string;
  description: string;
  url_slug: string;
  preview_url: string;
  tour_date: string;
  time_of_day: string;
  views_count: number;
  country: string;
  city: string;
  gpx_path: string;
  gpx_text: string;
  video_url?: string;
  user?: {
    full_name?: string;
    avatar_url?: string;
  };
  created_at: string;
  updated_at: string;
}
