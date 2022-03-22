## ⚡️ Typescript

I took the liberty of adding Typescript to the project.

This was decided for a range of reasons, some of which I've listed below:

- Adding types makes it easier to spot mistakes.
- Component properties are easier to look up, i.e. built-in mouse-hover support in VSCode and Webstorm.
- Refactoring is easier.

## 🏡 Architecture

My project architecture takes inspiration from past experiences. A good write-up of my approach - in comparison to for example Domain Driven Design - can be summarised pretty descriptively by reading this blog post:

https://michalzalecki.com/elegant-frontend-architecture/


### 🗂 Folder Structure

```
src
├── application
├── domain
├── components
├── infrastructure
└── utils
```

## 🚀 Commit Convention

I have had a good experience over the last two years following ["Conventional Commits"](https://www.conventionalcommits.org/en/v1.0.0/#summary)