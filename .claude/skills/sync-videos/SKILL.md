---
name: sync-videos
description: Pull YouTube videos from the "Ariv Videos" Notion database, enrich new rows with real title/creator and a Twist written in ARIV's voice, regenerate videos.txt from all current rows, and publish.
---

Notion data source: `collection://023c699a-d372-43a5-a257-1988dfc9b3e3`
(database "Ariv Videos"). Use `notion-query-data-sources` /
`ReadMcpResourceTool`-style Notion tools against this ID; use
`notion-update-page` to write fields back to a row.

## ARIV's voice (apply this to every Twist you write)

Ariv is a kid whose mind lives in fantasy — to him, cooking is building new
worlds with his own two hands. He talks in simple, direct words, not fancy
ones. He's often thinking about impressing his friends, and his mom is part
of his kitchen world too. A Twist in his voice reframes one real detail
about the video as a small piece of that imagination (melted cheese becomes
lava, a stacked sandwich becomes a tower, a spice becomes a treasure) —
never abandon the real fact underneath for the sake of the fantasy.

## Steps

1. Query the "Ariv Videos" Notion data source for all rows (Title, YouTube
   URL, Creator, Twist, Status, Notes).

2. For every row where Status is "New" or "Error", enrich it:

   a. Extract the YouTube video ID from YouTube URL with this pattern:
      `/(?:youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtube\.com\/embed\/|youtu\.be\/)([\w-]{11})/`
      If it doesn't match or the URL is empty: set Status=Error,
      Notes="Missing or invalid YouTube URL", move to the next row.

   b. WebFetch `https://www.youtube.com/oembed?url=<url-encoded YouTube URL>&format=json`.
      On failure: Status=Error, Notes="oEmbed fetch failed: <detail>", continue.
      On success: use the real `title` and `author_name` verbatim — never
      guess or invent these. Creator = `author_name` prefixed with `@` if
      it doesn't already start with `@`.

   c. Gather material for the Twist:
      - WebFetch the watch page (`https://www.youtube.com/watch?v=<id>`) for
        the video description and, if present in the fetched content, a
        pinned/top comment. This is best-effort — modern YouTube pages load
        comments via JS, so you'll often only get the description. That's
        fine; don't treat a missing comment as an error.
      - WebSearch using the real title + creator for the recipe/trend's
        origin, background, or technique.
      - Skim the other rows already at Status=Enriched (from step 1's query)
        for recurring cuisines/creators/themes, so the Twist can nod to
        continuity across videos if it fits naturally (optional flavor,
        never required).
      - Write ONE sentence, roughly 100-160 characters, in ARIV's voice,
        grounded in a real detail from the sources above. If description,
        comment, and search all come up empty, fall back to a short
        ARIV-voiced line based only on the oEmbed title/creator, and note
        "Twist: generic fallback, no strong source material" in Notes.

   d. Strip newlines and any "Title:"/"Creator:"/"Link:"/"Twist:"-like
      prefixes from all generated text (protects the videos.txt parser).

   e. `notion-update-page` on this row: Title, Creator, Twist,
      Status=Enriched, and clear Notes (unless it holds the fallback note
      from step c).

   Process rows one at a time, not in parallel.

3. Re-query the full "Ariv Videos" data source (fresh — this must include
   rows just enriched), sorted by created time ascending.

4. Regenerate `videos.txt` completely from this query result — this file is
   fully rebuilt every run, so manual edits/deletions in Notion are always
   reflected, not just newly-enriched rows:
   - Keep the existing header comment block as-is.
   - For every row with Status=Enriched, write a block:
     ```
     Title: <Title>
     Creator: <Creator>
     Link: <YouTube URL>
     Twist: <Twist>
     ```
     Omit the `Twist:` line entirely if Twist is empty. Separate blocks with
     one blank line.
   - Skip rows still at New/Error — they aren't ready for the public site.
   - Overwrite `videos.txt` in place.

5. Run `npm run publish` (reuse it exactly as-is — do not reimplement its
   git add/commit/push logic).

6. Report to the user: how many rows were newly enriched, how many were
   skipped/errored (with a one-line reason each), and the verbatim output
   of `npm run publish`.
