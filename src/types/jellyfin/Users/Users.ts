export type Users = User[]

export interface User {
  Name: string
  ServerId: string
  ServerName: string
  Id: string
  PrimaryImageTag: string
  HasPassword: boolean
  HasConfiguredPassword: boolean
  HasConfiguredEasyPassword: boolean
  EnableAutoLogin: boolean
  LastLoginDate: string
  LastActivityDate: string
  Configuration: Configuration
  Policy: Policy
  PrimaryImageAspectRatio: number
}

export interface Configuration {
  AudioLanguagePreference: string
  PlayDefaultAudioTrack: boolean
  SubtitleLanguagePreference: string
  DisplayMissingEpisodes: boolean
  GroupedFolders: string[]
  SubtitleMode: string
  DisplayCollectionsView: boolean
  EnableLocalPassword: boolean
  OrderedViews: string[]
  LatestItemsExcludes: string[]
  MyMediaExcludes: string[]
  HidePlayedInLatest: boolean
  RememberAudioSelections: boolean
  RememberSubtitleSelections: boolean
  EnableNextEpisodeAutoPlay: boolean
  CastReceiverId: string
}

export interface Policy {
  IsAdministrator: boolean
  IsHidden: boolean
  EnableCollectionManagement: boolean
  EnableSubtitleManagement: boolean
  EnableLyricManagement: boolean
  IsDisabled: boolean
  MaxParentalRating: number
  MaxParentalSubRating: number
  BlockedTags: string[]
  AllowedTags: string[]
  EnableUserPreferenceAccess: boolean
  AccessSchedules: AccessSchedule[]
  BlockUnratedItems: string[]
  EnableRemoteControlOfOtherUsers: boolean
  EnableSharedDeviceControl: boolean
  EnableRemoteAccess: boolean
  EnableLiveTvManagement: boolean
  EnableLiveTvAccess: boolean
  EnableMediaPlayback: boolean
  EnableAudioPlaybackTranscoding: boolean
  EnableVideoPlaybackTranscoding: boolean
  EnablePlaybackRemuxing: boolean
  ForceRemoteSourceTranscoding: boolean
  EnableContentDeletion: boolean
  EnableContentDeletionFromFolders: string[]
  EnableContentDownloading: boolean
  EnableSyncTranscoding: boolean
  EnableMediaConversion: boolean
  EnabledDevices: string[]
  EnableAllDevices: boolean
  EnabledChannels: string[]
  EnableAllChannels: boolean
  EnabledFolders: string[]
  EnableAllFolders: boolean
  InvalidLoginAttemptCount: number
  LoginAttemptsBeforeLockout: number
  MaxActiveSessions: number
  EnablePublicSharing: boolean
  BlockedMediaFolders: string[]
  BlockedChannels: string[]
  RemoteClientBitrateLimit: number
  AuthenticationProviderId: string
  PasswordResetProviderId: string
  SyncPlayAccess: string
}

export interface AccessSchedule {
  Id: number
  UserId: string
  DayOfWeek: string
  StartHour: number
  EndHour: number
}
