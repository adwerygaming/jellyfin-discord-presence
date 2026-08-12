export class ServerCredsNotFoundError extends Error {
    constructor(message = "Server credentials not found. Please run the setup process to configure your Jellyfin server connection.") {
        super(message);
        this.name = "ServerCredsNotFoundError";
    }
}
