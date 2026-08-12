import { ChapterInfo } from "@jellyfin/sdk/lib/generated-client/index";

export function getCurrentChapter(chapters: ChapterInfo[], positionTicks: number): ChapterInfo | null {
    const chapter = chapters.find(ch => {
        if (ch.StartPositionTicks === undefined) {
            return false;
        }

        if (ch.StartPositionTicks <= positionTicks) {
            return true;
        }
    });

    return chapter ?? null;
}

