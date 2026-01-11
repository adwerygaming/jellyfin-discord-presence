import { NowPlayingItemType } from "../../Types.js"

export type SessionsInfo = SessionInfo[]

export interface SessionInfo {
    PlayState: PlayState
    AdditionalUsers: AdditionalUser[]
    Capabilities: Capabilities
    RemoteEndPoint: string
    PlayableMediaTypes: string[]
    Id: string
    UserId: string
    UserName: string
    Client: string
    LastActivityDate: string
    LastPlaybackCheckIn: string
    LastPausedDate: string
    DeviceName: string
    DeviceType: string
    NowPlayingItem: NowPlayingItem
    NowViewingItem: NowViewingItem
    DeviceId: string
    ApplicationVersion: string
    TranscodingInfo: TranscodingInfo
    IsActive: boolean
    SupportsMediaControl: boolean
    SupportsRemoteControl: boolean
    NowPlayingQueue: NowPlayingQueue[]
    NowPlayingQueueFullItems: NowPlayingQueueFullItem[]
    HasCustomDeviceName: boolean
    PlaylistItemId: string
    ServerId: string
    UserPrimaryImageTag: string
    SupportedCommands: string[]
}

export interface PlayState {
    PositionTicks: number
    CanSeek: boolean
    IsPaused: boolean
    IsMuted: boolean
    VolumeLevel: number
    AudioStreamIndex: number
    SubtitleStreamIndex: number
    MediaSourceId: string
    PlayMethod: string
    RepeatMode: string
    PlaybackOrder: string
    LiveStreamId: string
}

export interface AdditionalUser {
    UserId: string
    UserName: string
}

export interface Capabilities {
    PlayableMediaTypes: string[]
    SupportedCommands: string[]
    SupportsMediaControl: boolean
    SupportsPersistentIdentifier: boolean
    DeviceProfile: DeviceProfile
    AppStoreUrl: string
    IconUrl: string
}

export interface DeviceProfile {
    Name: string
    Id: string
    MaxStreamingBitrate: number
    MaxStaticBitrate: number
    MusicStreamingTranscodingBitrate: number
    MaxStaticMusicBitrate: number
    DirectPlayProfiles: DirectPlayProfile[]
    TranscodingProfiles: TranscodingProfile[]
    ContainerProfiles: ContainerProfile[]
    CodecProfiles: CodecProfile[]
    SubtitleProfiles: SubtitleProfile[]
}

export interface DirectPlayProfile {
    Container: string
    AudioCodec: string
    VideoCodec: string
    Type: string
}

export interface TranscodingProfile {
    Container: string
    Type: string
    VideoCodec: string
    AudioCodec: string
    Protocol: string
    EstimateContentLength: boolean
    EnableMpegtsM2TsMode: boolean
    TranscodeSeekInfo: string
    CopyTimestamps: boolean
    Context: string
    EnableSubtitlesInManifest: boolean
    MaxAudioChannels: string
    MinSegments: number
    SegmentLength: number
    BreakOnNonKeyFrames: boolean
    Conditions: Condition[]
    EnableAudioVbrEncoding: boolean
}

export interface Condition {
    Condition: string
    Property: string
    Value: string
    IsRequired: boolean
}

export interface ContainerProfile {
    Type: string
    Conditions: Condition2[]
    Container: string
    SubContainer: string
}

export interface Condition2 {
    Condition: string
    Property: string
    Value: string
    IsRequired: boolean
}

export interface CodecProfile {
    Type: string
    Conditions: Condition3[]
    ApplyConditions: ApplyCondition[]
    Codec: string
    Container: string
    SubContainer: string
}

export interface Condition3 {
    Condition: string
    Property: string
    Value: string
    IsRequired: boolean
}

export interface ApplyCondition {
    Condition: string
    Property: string
    Value: string
    IsRequired: boolean
}

export interface SubtitleProfile {
    Format: string
    Method: string
    DidlMode: string
    Language: string
    Container: string
}

export interface NowPlayingItem {
    Name: string
    OriginalTitle: string
    ServerId: string
    Id: string
    Etag: string
    SourceType: string
    PlaylistItemId: string
    DateCreated: string
    DateLastMediaAdded: string
    ExtraType: string
    AirsBeforeSeasonNumber: number
    AirsAfterSeasonNumber: number
    AirsBeforeEpisodeNumber: number
    CanDelete: boolean
    CanDownload: boolean
    HasLyrics: boolean
    HasSubtitles: boolean
    PreferredMetadataLanguage: string
    PreferredMetadataCountryCode: string
    Container: string
    SortName: string
    ForcedSortName: string
    Video3DFormat: string
    PremiereDate: string
    ExternalUrls: ExternalUrl[]
    MediaSources: MediaSource[]
    CriticRating: number
    ProductionLocations: string[]
    Path: string
    EnableMediaSourceDisplay: boolean
    OfficialRating: string
    CustomRating: string
    ChannelId: string
    ChannelName: string
    Overview: string
    Taglines: string[]
    Genres: string[]
    CommunityRating: number
    CumulativeRunTimeTicks: number
    RunTimeTicks: number
    PlayAccess: string
    AspectRatio: string
    ProductionYear: number
    IsPlaceHolder: boolean
    Number: string
    ChannelNumber: string
    IndexNumber: number
    IndexNumberEnd: number
    ParentIndexNumber: number
    RemoteTrailers: RemoteTrailer[]
    ProviderIds: ProviderIds
    IsHD: boolean
    IsFolder: boolean
    ParentId: string
    Type: NowPlayingItemType
    People: People[]
    Studios: Studio[]
    GenreItems: GenreItem[]
    ParentLogoItemId: string
    ParentBackdropItemId: string
    ParentBackdropImageTags: string[]
    LocalTrailerCount: number
    UserData: UserData
    RecursiveItemCount: number
    ChildCount: number
    SeriesName: string
    SeriesId: string
    SeasonId: string
    SpecialFeatureCount: number
    DisplayPreferencesId: string
    Status: string
    AirTime: string
    AirDays: string[]
    Tags: string[]
    PrimaryImageAspectRatio: number
    Artists: string[]
    ArtistItems: ArtistItem[]
    Album: string
    CollectionType: string
    DisplayOrder: string
    AlbumId: string
    AlbumPrimaryImageTag: string
    SeriesPrimaryImageTag: string
    AlbumArtist: string
    AlbumArtists: AlbumArtist[]
    SeasonName: string
    MediaStreams: MediaStream2[]
    VideoType: string
    PartCount: number
    MediaSourceCount: number
    ImageTags: ImageTags
    BackdropImageTags: string[]
    ScreenshotImageTags: string[]
    ParentLogoImageTag: string
    ParentArtItemId: string
    ParentArtImageTag: string
    SeriesThumbImageTag: string
    ImageBlurHashes: ImageBlurHashes2
    SeriesStudio: string
    ParentThumbItemId: string
    ParentThumbImageTag: string
    ParentPrimaryImageItemId: string
    ParentPrimaryImageTag: string
    Chapters: Chapter3[]
    Trickplay: Trickplay
    LocationType: string
    IsoType: string
    MediaType: string
    EndDate: string
    LockedFields: string[]
    TrailerCount: number
    MovieCount: number
    SeriesCount: number
    ProgramCount: number
    EpisodeCount: number
    SongCount: number
    AlbumCount: number
    ArtistCount: number
    MusicVideoCount: number
    LockData: boolean
    Width: number
    Height: number
    CameraMake: string
    CameraModel: string
    Software: string
    ExposureTime: number
    FocalLength: number
    ImageOrientation: string
    Aperture: number
    ShutterSpeed: number
    Latitude: number
    Longitude: number
    Altitude: number
    IsoSpeedRating: number
    SeriesTimerId: string
    ProgramId: string
    ChannelPrimaryImageTag: string
    StartDate: string
    CompletionPercentage: number
    IsRepeat: boolean
    EpisodeTitle: string
    ChannelType: string
    Audio: string
    IsMovie: boolean
    IsSports: boolean
    IsSeries: boolean
    IsLive: boolean
    IsNews: boolean
    IsKids: boolean
    IsPremiere: boolean
    TimerId: string
    NormalizationGain: number
    CurrentProgram: string
}

export interface ExternalUrl {
    Name: string
    Url: string
}

export interface MediaSource {
    Protocol: string
    Id: string
    Path: string
    EncoderPath: string
    EncoderProtocol: string
    Type: string
    Container: string
    Size: number
    Name: string
    IsRemote: boolean
    ETag: string
    RunTimeTicks: number
    ReadAtNativeFramerate: boolean
    IgnoreDts: boolean
    IgnoreIndex: boolean
    GenPtsInput: boolean
    SupportsTranscoding: boolean
    SupportsDirectStream: boolean
    SupportsDirectPlay: boolean
    IsInfiniteStream: boolean
    UseMostCompatibleTranscodingProfile: boolean
    RequiresOpening: boolean
    OpenToken: string
    RequiresClosing: boolean
    LiveStreamId: string
    BufferMs: number
    RequiresLooping: boolean
    SupportsProbing: boolean
    VideoType: string
    IsoType: string
    Video3DFormat: string
    MediaStreams: MediaStream[]
    MediaAttachments: MediaAttachment[]
    Formats: string[]
    Bitrate: number
    FallbackMaxStreamingBitrate: number
    Timestamp: string
    RequiredHttpHeaders: RequiredHttpHeaders
    TranscodingUrl: string
    TranscodingSubProtocol: string
    TranscodingContainer: string
    AnalyzeDurationMs: number
    DefaultAudioStreamIndex: number
    DefaultSubtitleStreamIndex: number
    HasSegments: boolean
}

export interface MediaStream {
    Codec: string
    CodecTag: string
    Language: string
    ColorRange: string
    ColorSpace: string
    ColorTransfer: string
    ColorPrimaries: string
    DvVersionMajor: number
    DvVersionMinor: number
    DvProfile: number
    DvLevel: number
    RpuPresentFlag: number
    ElPresentFlag: number
    BlPresentFlag: number
    DvBlSignalCompatibilityId: number
    Rotation: number
    Comment: string
    TimeBase: string
    CodecTimeBase: string
    Title: string
    VideoRange: string
    VideoRangeType: string
    VideoDoViTitle: string
    AudioSpatialFormat: string
    LocalizedUndefined: string
    LocalizedDefault: string
    LocalizedForced: string
    LocalizedExternal: string
    LocalizedHearingImpaired: string
    DisplayTitle: string
    NalLengthSize: string
    IsInterlaced: boolean
    IsAVC: boolean
    ChannelLayout: string
    BitRate: number
    BitDepth: number
    RefFrames: number
    PacketLength: number
    Channels: number
    SampleRate: number
    IsDefault: boolean
    IsForced: boolean
    IsHearingImpaired: boolean
    Height: number
    Width: number
    AverageFrameRate: number
    RealFrameRate: number
    ReferenceFrameRate: number
    Profile: string
    Type: string
    AspectRatio: string
    Index: number
    Score: number
    IsExternal: boolean
    DeliveryMethod: string
    DeliveryUrl: string
    IsExternalUrl: boolean
    IsTextSubtitleStream: boolean
    SupportsExternalStream: boolean
    Path: string
    PixelFormat: string
    Level: number
    IsAnamorphic: boolean
}

export interface MediaAttachment {
    Codec: string
    CodecTag: string
    Comment: string
    Index: number
    FileName: string
    MimeType: string
    DeliveryUrl: string
}

export interface RequiredHttpHeaders {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface RemoteTrailer {
    Url: string
    Name: string
}

export interface ProviderIds {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface People {
    Name: string
    Id: string
    Role: string
    Type: string
    PrimaryImageTag: string
    ImageBlurHashes: ImageBlurHashes
}

export interface ImageBlurHashes {
    Primary: Primary
    Art: Art
    Backdrop: Backdrop
    Banner: Banner
    Logo: Logo
    Thumb: Thumb
    Disc: Disc
    Box: Box
    Screenshot: Screenshot
    Menu: Menu
    Chapter: Chapter
    BoxRear: BoxRear
    Profile: Profile
}

export interface Primary {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Art {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Backdrop {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Banner {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Logo {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Thumb {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Disc {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Box {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Screenshot {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Menu {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Chapter {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface BoxRear {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Profile {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Studio {
    Name: string
    Id: string
}

export interface GenreItem {
    Name: string
    Id: string
}

export interface UserData {
    Rating: number
    PlayedPercentage: number
    UnplayedItemCount: number
    PlaybackPositionTicks: number
    PlayCount: number
    IsFavorite: boolean
    Likes: boolean
    LastPlayedDate: string
    Played: boolean
    Key: string
    ItemId: string
}

export interface ArtistItem {
    Name: string
    Id: string
}

export interface AlbumArtist {
    Name: string
    Id: string
}

export interface MediaStream2 {
    Codec: string
    CodecTag: string
    Language: string
    ColorRange: string
    ColorSpace: string
    ColorTransfer: string
    ColorPrimaries: string
    DvVersionMajor: number
    DvVersionMinor: number
    DvProfile: number
    DvLevel: number
    RpuPresentFlag: number
    ElPresentFlag: number
    BlPresentFlag: number
    DvBlSignalCompatibilityId: number
    Rotation: number
    Comment: string
    TimeBase: string
    CodecTimeBase: string
    Title: string
    VideoRange: string
    VideoRangeType: string
    VideoDoViTitle: string
    AudioSpatialFormat: string
    LocalizedUndefined: string
    LocalizedDefault: string
    LocalizedForced: string
    LocalizedExternal: string
    LocalizedHearingImpaired: string
    DisplayTitle: string
    NalLengthSize: string
    IsInterlaced: boolean
    IsAVC: boolean
    ChannelLayout: string
    BitRate: number
    BitDepth: number
    RefFrames: number
    PacketLength: number
    Channels: number
    SampleRate: number
    IsDefault: boolean
    IsForced: boolean
    IsHearingImpaired: boolean
    Height: number
    Width: number
    AverageFrameRate: number
    RealFrameRate: number
    ReferenceFrameRate: number
    Profile: string
    Type: string
    AspectRatio: string
    Index: number
    Score: number
    IsExternal: boolean
    DeliveryMethod: string
    DeliveryUrl: string
    IsExternalUrl: boolean
    IsTextSubtitleStream: boolean
    SupportsExternalStream: boolean
    Path: string
    PixelFormat: string
    Level: number
    IsAnamorphic: boolean
}

export interface ImageTags {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface ImageBlurHashes2 {
    Primary: Primary2
    Art: Art2
    Backdrop: Backdrop2
    Banner: Banner2
    Logo: Logo2
    Thumb: Thumb2
    Disc: Disc2
    Box: Box2
    Screenshot: Screenshot2
    Menu: Menu2
    Chapter: Chapter2
    BoxRear: BoxRear2
    Profile: Profile2
}

export interface Primary2 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Art2 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Backdrop2 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Banner2 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Logo2 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Thumb2 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Disc2 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Box2 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Screenshot2 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Menu2 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Chapter2 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface BoxRear2 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Profile2 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Chapter3 {
    StartPositionTicks: number
    Name: string
    ImagePath: string
    ImageDateModified: string
    ImageTag: string
}

export interface Trickplay {
    additionalProp1: AdditionalProp1
    additionalProp2: AdditionalProp22
    additionalProp3: AdditionalProp33
}

export interface AdditionalProp1 {
    additionalProp1: AdditionalProp12
    additionalProp2: AdditionalProp2
    additionalProp3: AdditionalProp3
}

export interface AdditionalProp12 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp2 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp3 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp22 {
    additionalProp1: AdditionalProp13
    additionalProp2: AdditionalProp23
    additionalProp3: AdditionalProp32
}

export interface AdditionalProp13 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp23 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp32 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp33 {
    additionalProp1: AdditionalProp14
    additionalProp2: AdditionalProp24
    additionalProp3: AdditionalProp34
}

export interface AdditionalProp14 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp24 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp34 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface NowViewingItem {
    Name: string
    OriginalTitle: string
    ServerId: string
    Id: string
    Etag: string
    SourceType: string
    PlaylistItemId: string
    DateCreated: string
    DateLastMediaAdded: string
    ExtraType: string
    AirsBeforeSeasonNumber: number
    AirsAfterSeasonNumber: number
    AirsBeforeEpisodeNumber: number
    CanDelete: boolean
    CanDownload: boolean
    HasLyrics: boolean
    HasSubtitles: boolean
    PreferredMetadataLanguage: string
    PreferredMetadataCountryCode: string
    Container: string
    SortName: string
    ForcedSortName: string
    Video3DFormat: string
    PremiereDate: string
    ExternalUrls: ExternalUrl2[]
    MediaSources: MediaSource2[]
    CriticRating: number
    ProductionLocations: string[]
    Path: string
    EnableMediaSourceDisplay: boolean
    OfficialRating: string
    CustomRating: string
    ChannelId: string
    ChannelName: string
    Overview: string
    Taglines: string[]
    Genres: string[]
    CommunityRating: number
    CumulativeRunTimeTicks: number
    RunTimeTicks: number
    PlayAccess: string
    AspectRatio: string
    ProductionYear: number
    IsPlaceHolder: boolean
    Number: string
    ChannelNumber: string
    IndexNumber: number
    IndexNumberEnd: number
    ParentIndexNumber: number
    RemoteTrailers: RemoteTrailer2[]
    ProviderIds: ProviderIds2
    IsHD: boolean
    IsFolder: boolean
    ParentId: string
    Type: string
    People: People2[]
    Studios: Studio2[]
    GenreItems: GenreItem2[]
    ParentLogoItemId: string
    ParentBackdropItemId: string
    ParentBackdropImageTags: string[]
    LocalTrailerCount: number
    UserData: UserData2
    RecursiveItemCount: number
    ChildCount: number
    SeriesName: string
    SeriesId: string
    SeasonId: string
    SpecialFeatureCount: number
    DisplayPreferencesId: string
    Status: string
    AirTime: string
    AirDays: string[]
    Tags: string[]
    PrimaryImageAspectRatio: number
    Artists: string[]
    ArtistItems: ArtistItem2[]
    Album: string
    CollectionType: string
    DisplayOrder: string
    AlbumId: string
    AlbumPrimaryImageTag: string
    SeriesPrimaryImageTag: string
    AlbumArtist: string
    AlbumArtists: AlbumArtist2[]
    SeasonName: string
    MediaStreams: MediaStream4[]
    VideoType: string
    PartCount: number
    MediaSourceCount: number
    ImageTags: ImageTags2
    BackdropImageTags: string[]
    ScreenshotImageTags: string[]
    ParentLogoImageTag: string
    ParentArtItemId: string
    ParentArtImageTag: string
    SeriesThumbImageTag: string
    ImageBlurHashes: ImageBlurHashes4
    SeriesStudio: string
    ParentThumbItemId: string
    ParentThumbImageTag: string
    ParentPrimaryImageItemId: string
    ParentPrimaryImageTag: string
    Chapters: Chapter6[]
    Trickplay: Trickplay2
    LocationType: string
    IsoType: string
    MediaType: string
    EndDate: string
    LockedFields: string[]
    TrailerCount: number
    MovieCount: number
    SeriesCount: number
    ProgramCount: number
    EpisodeCount: number
    SongCount: number
    AlbumCount: number
    ArtistCount: number
    MusicVideoCount: number
    LockData: boolean
    Width: number
    Height: number
    CameraMake: string
    CameraModel: string
    Software: string
    ExposureTime: number
    FocalLength: number
    ImageOrientation: string
    Aperture: number
    ShutterSpeed: number
    Latitude: number
    Longitude: number
    Altitude: number
    IsoSpeedRating: number
    SeriesTimerId: string
    ProgramId: string
    ChannelPrimaryImageTag: string
    StartDate: string
    CompletionPercentage: number
    IsRepeat: boolean
    EpisodeTitle: string
    ChannelType: string
    Audio: string
    IsMovie: boolean
    IsSports: boolean
    IsSeries: boolean
    IsLive: boolean
    IsNews: boolean
    IsKids: boolean
    IsPremiere: boolean
    TimerId: string
    NormalizationGain: number
    CurrentProgram: string
}

export interface ExternalUrl2 {
    Name: string
    Url: string
}

export interface MediaSource2 {
    Protocol: string
    Id: string
    Path: string
    EncoderPath: string
    EncoderProtocol: string
    Type: string
    Container: string
    Size: number
    Name: string
    IsRemote: boolean
    ETag: string
    RunTimeTicks: number
    ReadAtNativeFramerate: boolean
    IgnoreDts: boolean
    IgnoreIndex: boolean
    GenPtsInput: boolean
    SupportsTranscoding: boolean
    SupportsDirectStream: boolean
    SupportsDirectPlay: boolean
    IsInfiniteStream: boolean
    UseMostCompatibleTranscodingProfile: boolean
    RequiresOpening: boolean
    OpenToken: string
    RequiresClosing: boolean
    LiveStreamId: string
    BufferMs: number
    RequiresLooping: boolean
    SupportsProbing: boolean
    VideoType: string
    IsoType: string
    Video3DFormat: string
    MediaStreams: MediaStream3[]
    MediaAttachments: MediaAttachment2[]
    Formats: string[]
    Bitrate: number
    FallbackMaxStreamingBitrate: number
    Timestamp: string
    RequiredHttpHeaders: RequiredHttpHeaders2
    TranscodingUrl: string
    TranscodingSubProtocol: string
    TranscodingContainer: string
    AnalyzeDurationMs: number
    DefaultAudioStreamIndex: number
    DefaultSubtitleStreamIndex: number
    HasSegments: boolean
}

export interface MediaStream3 {
    Codec: string
    CodecTag: string
    Language: string
    ColorRange: string
    ColorSpace: string
    ColorTransfer: string
    ColorPrimaries: string
    DvVersionMajor: number
    DvVersionMinor: number
    DvProfile: number
    DvLevel: number
    RpuPresentFlag: number
    ElPresentFlag: number
    BlPresentFlag: number
    DvBlSignalCompatibilityId: number
    Rotation: number
    Comment: string
    TimeBase: string
    CodecTimeBase: string
    Title: string
    VideoRange: string
    VideoRangeType: string
    VideoDoViTitle: string
    AudioSpatialFormat: string
    LocalizedUndefined: string
    LocalizedDefault: string
    LocalizedForced: string
    LocalizedExternal: string
    LocalizedHearingImpaired: string
    DisplayTitle: string
    NalLengthSize: string
    IsInterlaced: boolean
    IsAVC: boolean
    ChannelLayout: string
    BitRate: number
    BitDepth: number
    RefFrames: number
    PacketLength: number
    Channels: number
    SampleRate: number
    IsDefault: boolean
    IsForced: boolean
    IsHearingImpaired: boolean
    Height: number
    Width: number
    AverageFrameRate: number
    RealFrameRate: number
    ReferenceFrameRate: number
    Profile: string
    Type: string
    AspectRatio: string
    Index: number
    Score: number
    IsExternal: boolean
    DeliveryMethod: string
    DeliveryUrl: string
    IsExternalUrl: boolean
    IsTextSubtitleStream: boolean
    SupportsExternalStream: boolean
    Path: string
    PixelFormat: string
    Level: number
    IsAnamorphic: boolean
}

export interface MediaAttachment2 {
    Codec: string
    CodecTag: string
    Comment: string
    Index: number
    FileName: string
    MimeType: string
    DeliveryUrl: string
}

export interface RequiredHttpHeaders2 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface RemoteTrailer2 {
    Url: string
    Name: string
}

export interface ProviderIds2 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface People2 {
    Name: string
    Id: string
    Role: string
    Type: string
    PrimaryImageTag: string
    ImageBlurHashes: ImageBlurHashes3
}

export interface ImageBlurHashes3 {
    Primary: Primary3
    Art: Art3
    Backdrop: Backdrop3
    Banner: Banner3
    Logo: Logo3
    Thumb: Thumb3
    Disc: Disc3
    Box: Box3
    Screenshot: Screenshot3
    Menu: Menu3
    Chapter: Chapter4
    BoxRear: BoxRear3
    Profile: Profile3
}

export interface Primary3 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Art3 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Backdrop3 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Banner3 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Logo3 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Thumb3 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Disc3 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Box3 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Screenshot3 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Menu3 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Chapter4 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface BoxRear3 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Profile3 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Studio2 {
    Name: string
    Id: string
}

export interface GenreItem2 {
    Name: string
    Id: string
}

export interface UserData2 {
    Rating: number
    PlayedPercentage: number
    UnplayedItemCount: number
    PlaybackPositionTicks: number
    PlayCount: number
    IsFavorite: boolean
    Likes: boolean
    LastPlayedDate: string
    Played: boolean
    Key: string
    ItemId: string
}

export interface ArtistItem2 {
    Name: string
    Id: string
}

export interface AlbumArtist2 {
    Name: string
    Id: string
}

export interface MediaStream4 {
    Codec: string
    CodecTag: string
    Language: string
    ColorRange: string
    ColorSpace: string
    ColorTransfer: string
    ColorPrimaries: string
    DvVersionMajor: number
    DvVersionMinor: number
    DvProfile: number
    DvLevel: number
    RpuPresentFlag: number
    ElPresentFlag: number
    BlPresentFlag: number
    DvBlSignalCompatibilityId: number
    Rotation: number
    Comment: string
    TimeBase: string
    CodecTimeBase: string
    Title: string
    VideoRange: string
    VideoRangeType: string
    VideoDoViTitle: string
    AudioSpatialFormat: string
    LocalizedUndefined: string
    LocalizedDefault: string
    LocalizedForced: string
    LocalizedExternal: string
    LocalizedHearingImpaired: string
    DisplayTitle: string
    NalLengthSize: string
    IsInterlaced: boolean
    IsAVC: boolean
    ChannelLayout: string
    BitRate: number
    BitDepth: number
    RefFrames: number
    PacketLength: number
    Channels: number
    SampleRate: number
    IsDefault: boolean
    IsForced: boolean
    IsHearingImpaired: boolean
    Height: number
    Width: number
    AverageFrameRate: number
    RealFrameRate: number
    ReferenceFrameRate: number
    Profile: string
    Type: string
    AspectRatio: string
    Index: number
    Score: number
    IsExternal: boolean
    DeliveryMethod: string
    DeliveryUrl: string
    IsExternalUrl: boolean
    IsTextSubtitleStream: boolean
    SupportsExternalStream: boolean
    Path: string
    PixelFormat: string
    Level: number
    IsAnamorphic: boolean
}

export interface ImageTags2 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface ImageBlurHashes4 {
    Primary: Primary4
    Art: Art4
    Backdrop: Backdrop4
    Banner: Banner4
    Logo: Logo4
    Thumb: Thumb4
    Disc: Disc4
    Box: Box4
    Screenshot: Screenshot4
    Menu: Menu4
    Chapter: Chapter5
    BoxRear: BoxRear4
    Profile: Profile4
}

export interface Primary4 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Art4 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Backdrop4 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Banner4 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Logo4 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Thumb4 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Disc4 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Box4 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Screenshot4 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Menu4 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Chapter5 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface BoxRear4 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Profile4 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Chapter6 {
    StartPositionTicks: number
    Name: string
    ImagePath: string
    ImageDateModified: string
    ImageTag: string
}

export interface Trickplay2 {
    additionalProp1: AdditionalProp15
    additionalProp2: AdditionalProp26
    additionalProp3: AdditionalProp37
}

export interface AdditionalProp15 {
    additionalProp1: AdditionalProp16
    additionalProp2: AdditionalProp25
    additionalProp3: AdditionalProp35
}

export interface AdditionalProp16 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp25 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp35 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp26 {
    additionalProp1: AdditionalProp17
    additionalProp2: AdditionalProp27
    additionalProp3: AdditionalProp36
}

export interface AdditionalProp17 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp27 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp36 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp37 {
    additionalProp1: AdditionalProp18
    additionalProp2: AdditionalProp28
    additionalProp3: AdditionalProp38
}

export interface AdditionalProp18 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp28 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp38 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface TranscodingInfo {
    AudioCodec: string
    VideoCodec: string
    Container: string
    IsVideoDirect: boolean
    IsAudioDirect: boolean
    Bitrate: number
    Framerate: number
    CompletionPercentage: number
    Width: number
    Height: number
    AudioChannels: number
    HardwareAccelerationType: string
    TranscodeReasons: string[]
}

export interface NowPlayingQueue {
    Id: string
    PlaylistItemId: string
}

export interface NowPlayingQueueFullItem {
    Name: string
    OriginalTitle: string
    ServerId: string
    Id: string
    Etag: string
    SourceType: string
    PlaylistItemId: string
    DateCreated: string
    DateLastMediaAdded: string
    ExtraType: string
    AirsBeforeSeasonNumber: number
    AirsAfterSeasonNumber: number
    AirsBeforeEpisodeNumber: number
    CanDelete: boolean
    CanDownload: boolean
    HasLyrics: boolean
    HasSubtitles: boolean
    PreferredMetadataLanguage: string
    PreferredMetadataCountryCode: string
    Container: string
    SortName: string
    ForcedSortName: string
    Video3DFormat: string
    PremiereDate: string
    ExternalUrls: ExternalUrl3[]
    MediaSources: MediaSource3[]
    CriticRating: number
    ProductionLocations: string[]
    Path: string
    EnableMediaSourceDisplay: boolean
    OfficialRating: string
    CustomRating: string
    ChannelId: string
    ChannelName: string
    Overview: string
    Taglines: string[]
    Genres: string[]
    CommunityRating: number
    CumulativeRunTimeTicks: number
    RunTimeTicks: number
    PlayAccess: string
    AspectRatio: string
    ProductionYear: number
    IsPlaceHolder: boolean
    Number: string
    ChannelNumber: string
    IndexNumber: number
    IndexNumberEnd: number
    ParentIndexNumber: number
    RemoteTrailers: RemoteTrailer3[]
    ProviderIds: ProviderIds3
    IsHD: boolean
    IsFolder: boolean
    ParentId: string
    Type: string
    People: People3[]
    Studios: Studio3[]
    GenreItems: GenreItem3[]
    ParentLogoItemId: string
    ParentBackdropItemId: string
    ParentBackdropImageTags: string[]
    LocalTrailerCount: number
    UserData: UserData3
    RecursiveItemCount: number
    ChildCount: number
    SeriesName: string
    SeriesId: string
    SeasonId: string
    SpecialFeatureCount: number
    DisplayPreferencesId: string
    Status: string
    AirTime: string
    AirDays: string[]
    Tags: string[]
    PrimaryImageAspectRatio: number
    Artists: string[]
    ArtistItems: ArtistItem3[]
    Album: string
    CollectionType: string
    DisplayOrder: string
    AlbumId: string
    AlbumPrimaryImageTag: string
    SeriesPrimaryImageTag: string
    AlbumArtist: string
    AlbumArtists: AlbumArtist3[]
    SeasonName: string
    MediaStreams: MediaStream6[]
    VideoType: string
    PartCount: number
    MediaSourceCount: number
    ImageTags: ImageTags3
    BackdropImageTags: string[]
    ScreenshotImageTags: string[]
    ParentLogoImageTag: string
    ParentArtItemId: string
    ParentArtImageTag: string
    SeriesThumbImageTag: string
    ImageBlurHashes: ImageBlurHashes6
    SeriesStudio: string
    ParentThumbItemId: string
    ParentThumbImageTag: string
    ParentPrimaryImageItemId: string
    ParentPrimaryImageTag: string
    Chapters: Chapter9[]
    Trickplay: Trickplay3
    LocationType: string
    IsoType: string
    MediaType: string
    EndDate: string
    LockedFields: string[]
    TrailerCount: number
    MovieCount: number
    SeriesCount: number
    ProgramCount: number
    EpisodeCount: number
    SongCount: number
    AlbumCount: number
    ArtistCount: number
    MusicVideoCount: number
    LockData: boolean
    Width: number
    Height: number
    CameraMake: string
    CameraModel: string
    Software: string
    ExposureTime: number
    FocalLength: number
    ImageOrientation: string
    Aperture: number
    ShutterSpeed: number
    Latitude: number
    Longitude: number
    Altitude: number
    IsoSpeedRating: number
    SeriesTimerId: string
    ProgramId: string
    ChannelPrimaryImageTag: string
    StartDate: string
    CompletionPercentage: number
    IsRepeat: boolean
    EpisodeTitle: string
    ChannelType: string
    Audio: string
    IsMovie: boolean
    IsSports: boolean
    IsSeries: boolean
    IsLive: boolean
    IsNews: boolean
    IsKids: boolean
    IsPremiere: boolean
    TimerId: string
    NormalizationGain: number
    CurrentProgram: string
}

export interface ExternalUrl3 {
    Name: string
    Url: string
}

export interface MediaSource3 {
    Protocol: string
    Id: string
    Path: string
    EncoderPath: string
    EncoderProtocol: string
    Type: string
    Container: string
    Size: number
    Name: string
    IsRemote: boolean
    ETag: string
    RunTimeTicks: number
    ReadAtNativeFramerate: boolean
    IgnoreDts: boolean
    IgnoreIndex: boolean
    GenPtsInput: boolean
    SupportsTranscoding: boolean
    SupportsDirectStream: boolean
    SupportsDirectPlay: boolean
    IsInfiniteStream: boolean
    UseMostCompatibleTranscodingProfile: boolean
    RequiresOpening: boolean
    OpenToken: string
    RequiresClosing: boolean
    LiveStreamId: string
    BufferMs: number
    RequiresLooping: boolean
    SupportsProbing: boolean
    VideoType: string
    IsoType: string
    Video3DFormat: string
    MediaStreams: MediaStream5[]
    MediaAttachments: MediaAttachment3[]
    Formats: string[]
    Bitrate: number
    FallbackMaxStreamingBitrate: number
    Timestamp: string
    RequiredHttpHeaders: RequiredHttpHeaders3
    TranscodingUrl: string
    TranscodingSubProtocol: string
    TranscodingContainer: string
    AnalyzeDurationMs: number
    DefaultAudioStreamIndex: number
    DefaultSubtitleStreamIndex: number
    HasSegments: boolean
}

export interface MediaStream5 {
    Codec: string
    CodecTag: string
    Language: string
    ColorRange: string
    ColorSpace: string
    ColorTransfer: string
    ColorPrimaries: string
    DvVersionMajor: number
    DvVersionMinor: number
    DvProfile: number
    DvLevel: number
    RpuPresentFlag: number
    ElPresentFlag: number
    BlPresentFlag: number
    DvBlSignalCompatibilityId: number
    Rotation: number
    Comment: string
    TimeBase: string
    CodecTimeBase: string
    Title: string
    VideoRange: string
    VideoRangeType: string
    VideoDoViTitle: string
    AudioSpatialFormat: string
    LocalizedUndefined: string
    LocalizedDefault: string
    LocalizedForced: string
    LocalizedExternal: string
    LocalizedHearingImpaired: string
    DisplayTitle: string
    NalLengthSize: string
    IsInterlaced: boolean
    IsAVC: boolean
    ChannelLayout: string
    BitRate: number
    BitDepth: number
    RefFrames: number
    PacketLength: number
    Channels: number
    SampleRate: number
    IsDefault: boolean
    IsForced: boolean
    IsHearingImpaired: boolean
    Height: number
    Width: number
    AverageFrameRate: number
    RealFrameRate: number
    ReferenceFrameRate: number
    Profile: string
    Type: string
    AspectRatio: string
    Index: number
    Score: number
    IsExternal: boolean
    DeliveryMethod: string
    DeliveryUrl: string
    IsExternalUrl: boolean
    IsTextSubtitleStream: boolean
    SupportsExternalStream: boolean
    Path: string
    PixelFormat: string
    Level: number
    IsAnamorphic: boolean
}

export interface MediaAttachment3 {
    Codec: string
    CodecTag: string
    Comment: string
    Index: number
    FileName: string
    MimeType: string
    DeliveryUrl: string
}

export interface RequiredHttpHeaders3 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface RemoteTrailer3 {
    Url: string
    Name: string
}

export interface ProviderIds3 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface People3 {
    Name: string
    Id: string
    Role: string
    Type: string
    PrimaryImageTag: string
    ImageBlurHashes: ImageBlurHashes5
}

export interface ImageBlurHashes5 {
    Primary: Primary5
    Art: Art5
    Backdrop: Backdrop5
    Banner: Banner5
    Logo: Logo5
    Thumb: Thumb5
    Disc: Disc5
    Box: Box5
    Screenshot: Screenshot5
    Menu: Menu5
    Chapter: Chapter7
    BoxRear: BoxRear5
    Profile: Profile5
}

export interface Primary5 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Art5 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Backdrop5 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Banner5 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Logo5 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Thumb5 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Disc5 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Box5 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Screenshot5 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Menu5 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Chapter7 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface BoxRear5 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Profile5 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Studio3 {
    Name: string
    Id: string
}

export interface GenreItem3 {
    Name: string
    Id: string
}

export interface UserData3 {
    Rating: number
    PlayedPercentage: number
    UnplayedItemCount: number
    PlaybackPositionTicks: number
    PlayCount: number
    IsFavorite: boolean
    Likes: boolean
    LastPlayedDate: string
    Played: boolean
    Key: string
    ItemId: string
}

export interface ArtistItem3 {
    Name: string
    Id: string
}

export interface AlbumArtist3 {
    Name: string
    Id: string
}

export interface MediaStream6 {
    Codec: string
    CodecTag: string
    Language: string
    ColorRange: string
    ColorSpace: string
    ColorTransfer: string
    ColorPrimaries: string
    DvVersionMajor: number
    DvVersionMinor: number
    DvProfile: number
    DvLevel: number
    RpuPresentFlag: number
    ElPresentFlag: number
    BlPresentFlag: number
    DvBlSignalCompatibilityId: number
    Rotation: number
    Comment: string
    TimeBase: string
    CodecTimeBase: string
    Title: string
    VideoRange: string
    VideoRangeType: string
    VideoDoViTitle: string
    AudioSpatialFormat: string
    LocalizedUndefined: string
    LocalizedDefault: string
    LocalizedForced: string
    LocalizedExternal: string
    LocalizedHearingImpaired: string
    DisplayTitle: string
    NalLengthSize: string
    IsInterlaced: boolean
    IsAVC: boolean
    ChannelLayout: string
    BitRate: number
    BitDepth: number
    RefFrames: number
    PacketLength: number
    Channels: number
    SampleRate: number
    IsDefault: boolean
    IsForced: boolean
    IsHearingImpaired: boolean
    Height: number
    Width: number
    AverageFrameRate: number
    RealFrameRate: number
    ReferenceFrameRate: number
    Profile: string
    Type: string
    AspectRatio: string
    Index: number
    Score: number
    IsExternal: boolean
    DeliveryMethod: string
    DeliveryUrl: string
    IsExternalUrl: boolean
    IsTextSubtitleStream: boolean
    SupportsExternalStream: boolean
    Path: string
    PixelFormat: string
    Level: number
    IsAnamorphic: boolean
}

export interface ImageTags3 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface ImageBlurHashes6 {
    Primary: Primary6
    Art: Art6
    Backdrop: Backdrop6
    Banner: Banner6
    Logo: Logo6
    Thumb: Thumb6
    Disc: Disc6
    Box: Box6
    Screenshot: Screenshot6
    Menu: Menu6
    Chapter: Chapter8
    BoxRear: BoxRear6
    Profile: Profile6
}

export interface Primary6 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Art6 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Backdrop6 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Banner6 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Logo6 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Thumb6 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Disc6 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Box6 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Screenshot6 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Menu6 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Chapter8 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface BoxRear6 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Profile6 {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}

export interface Chapter9 {
    StartPositionTicks: number
    Name: string
    ImagePath: string
    ImageDateModified: string
    ImageTag: string
}

export interface Trickplay3 {
    additionalProp1: AdditionalProp19
    additionalProp2: AdditionalProp210
    additionalProp3: AdditionalProp311
}

export interface AdditionalProp19 {
    additionalProp1: AdditionalProp110
    additionalProp2: AdditionalProp29
    additionalProp3: AdditionalProp39
}

export interface AdditionalProp110 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp29 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp39 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp210 {
    additionalProp1: AdditionalProp111
    additionalProp2: AdditionalProp211
    additionalProp3: AdditionalProp310
}

export interface AdditionalProp111 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp211 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp310 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp311 {
    additionalProp1: AdditionalProp112
    additionalProp2: AdditionalProp212
    additionalProp3: AdditionalProp312
}

export interface AdditionalProp112 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp212 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}

export interface AdditionalProp312 {
    Width: number
    Height: number
    TileWidth: number
    TileHeight: number
    ThumbnailCount: number
    Interval: number
    Bandwidth: number
}
