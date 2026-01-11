export interface SystemInfo {
  LocalAddress: string
  ServerName: string
  Version: string
  ProductName: string
  OperatingSystem: string
  Id: string
  StartupWizardCompleted: boolean
  OperatingSystemDisplayName: string
  PackageName: string
  HasPendingRestart: boolean
  IsShuttingDown: boolean
  SupportsLibraryMonitor: boolean
  WebSocketPortNumber: number
  CompletedInstallations: CompletedInstallation[]
  CanSelfRestart: boolean
  CanLaunchWebBrowser: boolean
  ProgramDataPath: string
  WebPath: string
  ItemsByNamePath: string
  CachePath: string
  LogPath: string
  InternalMetadataPath: string
  TranscodingTempPath: string
  CastReceiverApplications: CastReceiverApplication[]
  HasUpdateAvailable: boolean
  EncoderLocation: string
  SystemArchitecture: string
}

export interface CompletedInstallation {
  Guid: string
  Name: string
  Version: string
  Changelog: string
  SourceUrl: string
  Checksum: string
  PackageInfo: PackageInfo
}

export interface PackageInfo {
  name: string
  description: string
  overview: string
  owner: string
  category: string
  guid: string
  versions: Version[]
  imageUrl: string
}

export interface Version {
  version: string
  VersionNumber: string
  changelog: string
  targetAbi: string
  sourceUrl: string
  checksum: string
  timestamp: string
  repositoryName: string
  repositoryUrl: string
}

export interface CastReceiverApplication {
  Id: string
  Name: string
}
