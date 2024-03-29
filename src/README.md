# Introduction

This document outlines a range of choices I have made while working on this challenge, and my motivation behind them.

I am a strong believer in Team-driven development, and I'm used to adapt to whatever works best for the team. That doesn't mean I don't have an opinion on most topics :)

---

## 🛠 Package updates

Early in my project inspection phase, I noticed that a range of packages were out of date. One notable example was Chakra-UI.

I took the liberty of updating Chakra, together with other NPM package version bumps.

---

## 📡 Hosting

I've decided on using Vercel to host my implementation of the Space Rocket challenge. Easy to use, CI built-in.

At the time of writing, you can see it running on the following URL:

https://space-rockets-challenge-pleo.vercel.app/

---

## 🗓 Date parsing

I've always tried to avoid doing actual timezone parsing if I could avoid it, as ["dates are a headache in Javascript"](https://maggiepint.com/2017/04/09/fixing-javascript-date-getting-started/).

I rely on a Date library - currently `luxon` - for the heavy lifting in terms of date parsing.

Should this library become a large production application, then I would definitely find a more minimal library for date manipulation. I would even go as far to consider a completely custom library with a strong focus on only having exactly the utility functions we need.

---

## 💾 Storage

#### ⛰ Persistence

I've used my own storage adapter to persist data in the user's browser storage, mainly to prevent hard failures on incorrect getItem / setItem usage.

#### 🗂 Cache

I got a bit side-tracked adding a ["Least Recently Used Cache"](https://progressivecoder.com/lru-cache-implementation-using-javascript-linked-list-and-objects/#:~:text=LRU%20stands%20for%20Least%20Recently,is%20known%20as%20LRU%20Cache) in my Favorites storage implementation.

That was mainly done for fun.

In a production scenario, I would ensure I was aligned with the team and stakeholders before adding functionality of that nature.

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


#### 📂 Folder Structure

```
src
├── application
├── domains
├── components
├── infrastructure
└── utils
```

## Future considerations
- Adding other sections to the application.
  - Page with interactive chat to interact and discuss with others.
  - Page with upcoming launches.
- Ensure that components are properly kept DRY and kept performant using benchmarks.
- Nice animations throughout the application. I considered focusing on this, but decided not to.
- Add extensive unit and end to end tests to cover the majority of the application.
- Find a way to get the SpaceX API local dates with UTC offset, instead of the browser offset (in EU GMT+1).
- Properly type SpaceX API, instead of using quicktype.
- Round of TLC in terms of accessibility and SEO.
- Consider adding [Storybook](https://www.komododigital.co.uk/insights/react-storybook-why-should-you-use-it/) to have an isolated playground.
- Pull out domain-specific fetching hooks into dedicated wrapper hooks.
- Remote error handling and production monitoring - example: Sentry.
- Add proper guards against invalid/malformed API data.
  - We currently trust the API to always return the API in a certain format. This can and will break the app, if it changes.
- Simplify pages by splitting up component and business-logic into sub-domains.
- Considering performance, we probably want to use a virtual list or group for large data sets.
- Setup CI automation to accommodate [CI/CD](https://www.redhat.com/en/topics/devops/what-is-ci-cd), long term.
- Properly loop through all repo NPM modules and ensure they are up to date, to facilitate usage best.
- Generally I recommend that packages are kept updated as part of a maintenance flow.
  - Notable example: Update `swr` package and migrate to updated API. Comes with a lot of improvements.

