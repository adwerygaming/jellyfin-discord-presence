import { Jellyfin } from '@jellyfin/sdk';

export const jellyfin = new Jellyfin({
  clientInfo: { name: 'MyApp', version: '1.0.0' },
  deviceInfo: { name: 'MyDevice', id: 'unique-device-id' }
});
