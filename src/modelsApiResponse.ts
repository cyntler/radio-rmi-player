export interface ApiResponse {
  station: ApiResponseStation;
  now_playing: ApiResponsePlaying;
  playing_next?: ApiResponsePlaying;
}

export interface ApiResponseStation {
  listen_url: string;
  description: string;
}

export interface ApiResponsePlaying {
  song: ApiResponsePlayingSong;
}

export interface ApiResponsePlayingSong {
  artist: string;
  title: string;
  art: string;
}
