import { Jellyfin } from '@jellyfin/sdk';

export const jellyfin = new Jellyfin({
  clientInfo: { name: 'Jellyfin Discord Presence', version: '1.0.0' },
  deviceInfo: { name: 'NodeJS', id: 'this-is-not-a-placeholder-but-if-u-want-to-change-this-go-ahread' }
});
