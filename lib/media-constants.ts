export const MEDIA_BUCKET = "media"
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export type MediaFile = {
  id: string
  name: string
  url: string
  created_at: string
  size: number
}
