export const useImageProxy = () => {
  const getProxiedImageUrl = (imageUrl: string | null | undefined): string | null => {
    if (!imageUrl) {
      return null;
    }

    try {
      const url = new URL(imageUrl);
      const currentOrigin = typeof window !== "undefined" ? window.location.origin : "";

      if (url.origin === currentOrigin || url.protocol === "data:") {
        return imageUrl;
      }

      return `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
    } catch {
      return imageUrl;
    }
  };

  return {
    getProxiedImageUrl,
  };
};

