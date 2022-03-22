## 📡 Hosting

I've decided on using Vercel to host my implementation of the Space Rocket challenge.

At the time of writing, you can see it running on the following URL:

https://space-rockets-challenge-pleo.vercel.app/

---

## ⚡️ Typescript

I took the liberty of adding Typescript to the project.

This was decided for a range of reasons, some of which I've listed below:

- Adding types makes it easier to spot mistakes.
- Component properties are easier to look up, i.e. built-in mouse-hover support in VSCode and Webstorm.
- Refactoring is easier.

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
