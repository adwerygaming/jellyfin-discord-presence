import axios from "axios";

const jellyfinUrl = process.env.JELLYFIN_URL; // Jellyfin server url
const accessToken = process.env.JELLYFIN_ACCESS_TOKEN; // Jellyfin API Access Token

if (!jellyfinUrl) {
    console.log("JELLYFIN_URL is missing on .env file. Please fill it out.")
    process.exit(1)
}

if (!accessToken) {
    console.log("JELLYFIN_ACCESS_TOKEN is missing on .env file. Please fill it out.")
    process.exit(1)
}

// Create axios instance for Jellyfin API
const JellyfinAPI = axios.create({
    baseURL: jellyfinUrl,

    // apperantly this is how jellyfin accepts requests.
    headers: {
        'X-Emby-Token': accessToken,
        'Content-Type': 'application/json'
    }
});

export default JellyfinAPI