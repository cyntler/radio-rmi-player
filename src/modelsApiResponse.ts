export interface ApiResponse {
  station: ApiResponseStation;
  now_playing: ApiResponseNowPlaying;
}

export interface ApiResponseStation {
  listen_url: string;
  description: string;
}

export interface ApiResponseNowPlaying {
  song: ApiResponseNowPlayingSong;
}

export interface ApiResponseNowPlayingSong {
  artist: string;
  title: string;
  art: string;
}
