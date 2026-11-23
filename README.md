# Zolara Holdings Ltd

The corporate website uses React and Vite. The build renders each public route to static HTML with its own metadata. Production navigation works without JavaScript, with a small script to add Escape and breakpoint handling to the mobile menu.

## Development

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
```

Serve `dist/` on a host that supports directory indexes and custom 404 responses. The Vercel config keeps the canonical trailing slashes. For an isolated review build, run `ZOLARA_REVIEW=1 npm run build` to add noindex metadata and a blocking robots.txt. Vercel preview builds apply the same behavior automatically.

## Content and launch review

- The portfolio features Zolara Beauty Studio as operating in Tamale. The other four interests are presented as potential ventures. Registration, ownership structures, dates and financial or headcount claims need corporate records before publication.
- Contact uses the public group email and phone numbers carried over from the existing corporate site. No web form or automated delivery is configured. Confirm that the mailbox and phone numbers are monitored.
- Have Zolara review the privacy page for hosting, email handling and retention practices before the production launch.
- The existing founder portrait is used in the redesign. Confirm publication approval for that portrait and the two photographs sourced from the official Beauty Studio website.

## Photography

- Airport City, Accra. [Accra Skyline - Ghana.jpg](https://commons.wikimedia.org/wiki/File:Accra_Skyline_-_Ghana.jpg) by Synth85, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Resized, cropped and colour adjusted for display. Adapted image files under the same license are `public/images/accra-760.webp` and `public/images/accra-1550.webp`.
- National Theatre, Accra. [National Theatre - Ghana.jpg](https://commons.wikimedia.org/wiki/File:National_Theatre_-_Ghana.jpg) by Fquasie, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Resized, cropped and colour adjusted. Adapted image files under the same license are `public/images/theatre-760.webp` and `public/images/theatre-1550.webp`.
- Beauty Studio photographs come from [Zolara Beauty Studio](https://www.zolarasalon.com/). The founder image comes from the original repository.
- Newsreader and Manrope are redistributed under the SIL Open Font License included in `public/fonts/`.
