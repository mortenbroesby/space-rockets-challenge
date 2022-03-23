# Introduction

This document outlines a range of choices I have made while working on this challenge, and my motivation behind them.

I am a strong believer in Team-driven development, and I'm used to adapt to whatever works best for the team. That doesn't mean I don't have an opinion on most topics :)

### Considerations
- Add dark mode.
- Add animations.
- Add basic unit tests.

# Future considerations
- Add unit and/or end to end tests for the majority of the application.
- Potentially add service-worker to offload API fetching and offline caching.
- Consider properly typing SpaceX API, instead of using quicktype.
- Round of TLC in terms of accessibility and SEO.
- Pull out domain-specific fetching hooks into wrapper hooks.
- Proper error handling and production monitoring - example: Sentry.
- Add guards against invalid API data, or Middleware.
- Simplify pages by splitting up component and business-logic into sub-domains.
- Considering performance, we might want to use a virtual list or group for large data sets.


---

## 🛠 Package updates

Early in my project inspection phase, I noticed that a range of packages were out of date. One notable example was Chakra-UI.

I took the liberty of ["migrating to the latest version of Chakra"](https://chakra-ui.com/guides/migration), together with other package version bumps.

---

## 📡 Hosting

I've decided on using Vercel to host my implementation of the Space Rocket challenge. Easy to use, CI built-in.

At the time of writing, you can see it running on the following URL:

https://space-rockets-challenge-pleo.vercel.app/

---

## ⚡️ Typescript

I took the liberty of adding Typescript to the project.

This was decided for a range of reasons, some of which I've listed below:

- Adding types makes it easier to spot mistakes.
- Component properties are easier to look up, i.e. built-in mouse-hover support in VSCode and Webstorm.
- Refactoring is easier.

Example:
- Found a bug in `../LaunchPad.tsx` related to incorrectly typed API (`launchPad.stats` vs `launchPad.status`)

---

## 🔗 Commit Convention

I have had a good experience over the last two years by following ["Conventional Commits"](https://www.conventionalcommits.org/en/v1.0.0/#summary).

That's the approach I've used during this challenge, and also in my day-to-day.

Also, ["Commit early, Commit often"](https://deepsource.io/blog/git-best-practices/).

---

## 🏡 Architecture

My project architecture takes inspiration from past experiences. A good write-up of my approach - in comparison to for example Domain Driven Design - can be summarised pretty descriptively by reading this blog post:

https://michalzalecki.com/elegant-frontend-architecture/


#### ⚙️ Named exports

I use named exports throughout my code. This is useful to ensure an importable is consumed as intended. I've experienced a benefit to this approach when a project scales, but I'm not strongly oppinionated about it.


#### 🗂 Folder Structure

```
src
├── application
├── domains
├── components
├── infrastructure
└── utils
```
