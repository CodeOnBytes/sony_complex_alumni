# Alumni Website (React + TypeScript + Vite)

## Run
    npm install
    cp .env.example .env     # optional: set VITE_API_URL
    npm run dev              # http://localhost:5173
    npm run build            # production build in /dist

## Structure
    public/
      favicon.svg
      images/                 your photos (see images/README.txt)
    src/
      main.tsx                entry point
      App.tsx                 layout shell: Header, page, Footer
      pages/
        Home.tsx              home page = list of sections
      components/
        layout/               Header, Footer
        sections/             Hero, About, WhyJoin, Events, Programs,
                              Initiatives, Testimonials, CtaBanner
        ui/                   Badge, SplitButton, Photo, Icons, BackToTop
      data/
        site.ts               name, contact details, menu, footer links
        home.ts               all home page text, links and image paths
      hooks/useScrolledPast.ts
      services/api.ts         newsletter call (set VITE_API_URL)
      types/index.ts          shared TypeScript types
      styles/index.css        all styles; colours and fonts at the top

## Common changes
- Text, links, years, member count: `src/data/home.ts` and `src/data/site.ts`
- Colours and fonts: CSS variables at the top of `src/styles/index.css`
- New section: add a component in `components/sections` and list it in `pages/Home.tsx`
- New page (About, Contact): `npm i react-router-dom`, add a file in `pages/`,
  then replace `<Home />` in `App.tsx` with routes and point the menu links in `data/site.ts` to them
