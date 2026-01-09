<div align="center">
    <img src="/aseets//screenshots/banner.png">
    <h1>Simple Jellyfin Discord RPC</h1>
    <p>A Node.js application that displays your current Jellyfin viewing activity as a Discord Rich Presence status. Updates your Discord status to show what you're watching, including details like series name, episode, and playback state (playing/paused).</p>
</div>

## Features
![Image 0](/aseets/screenshots/img0.png)

*   **Detailed Information:** Shows series name, season/episode number, and episode title for TV shows.
*   **Playback State:** Indicates whether the media is `Playing` or `Paused` with a corresponding icon.
*   **Idle Status:** Displays a generic "On Homepage" status when you are not actively watching anything on Jellyfin.
*   **Configurable:** Easily configured to point to your Jellyfin server and track a specific user account via environment variables.

## Requirements

*   Node.js `>=21`
*   Discord Desktop client

## Quick Install & Dev

1.  Clone the repository:
    ```sh
    git clone https://github.com/adwerygaming/jellyfin-discord-presence.git
    cd jellyfin-discord-presence
    ```

2.  Install dependencies:
    ```sh
    npm install
    ```

3.  Create a `.env` file from the example:
    ```sh
    cp .env.example .env
    ```

4.  Configure your environment variables in the `.env` file. See the Configuration section for details.

5.  Run the application in development mode:
    ```sh
    npm run dev
    ```
    The application will start, connect to Discord, and begin polling your Jellyfin server.

## Configuration

The application is configured using environment variables. These must be defined in a `.env` file in the project root.

| Variable | Description |
| ------------------------ | ---------------------------------- |
| `DISCORD_CLIENT_ID`      | The client ID of your Discord application. Used to authenticate with Discord RPC.  |
| `JELLYFIN_URL`           | The full URL of your Jellyfin server instance. Used as the base URL for API requests.  |
| `JELLYFIN_TARGET_USERID` | The user ID of the Jellyfin account you want to track. Used to find the correct session. |
| `JELLYFIN_ACCESS_TOKEN`  | An API access token for your Jellyfin account. Used to authenticate API requests.  |

Instructions for obtaining `JELLYFIN_TARGET_USERID` and `JELLYFIN_ACCESS_TOKEN` are provided in `.env.example`.

## Build & Run

The project includes scripts for development, production execution, and building.

*   **Run:**
    ```sh
    npm run dev
    ```

*   **Build:**
    ```sh
    npm run build
    ```
    
## License

This project is licensed under the **ISC License**.