import { ChapterInfo } from "@jellyfin/sdk/lib/generated-client/index";

export function getCurrentChapter(chapters: ChapterInfo[], positionTicks: number): ChapterInfo | null {
    return [...chapters]
        .reverse()
        .find(ch => ch.StartPositionTicks !== undefined && ch.StartPositionTicks <= positionTicks) ?? null;
}

