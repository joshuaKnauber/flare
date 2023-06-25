# Flare - The most powerful text input (not quite yet..)

Flare gives you an input a shortcut that opens a text input. That's it. But also not...

Thanks to open ai's function calling models you can add functionality by write a python script (that does whatever you can imagine).

You describe what your function does and however you phrase your command, the right function will be run with the correct inputs.

## Limitations

This is currently nothing but a prototype. I only tested it on windows. You need an open ai key. It's a bit slow (~2 seconds to run any command). There's still a lot to do to make it properly usable (see below).

## Getting Started

Install dependencies:

```
npm install
```

Run in development mode:

```
npm run tauri dev
```

Build for production:

```
npm run tauri build
```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## TODO

- [ ] Figure out transparent windows so more things can be displayed as return values
- [ ] Improve reliability of opening, focusing and closing with shortcuts
- [ ] Experiment with function descriptions to trigger not just correct but also preferred (e.g. open url vs search google / or use more specific functions / double descriptions?)
- [ ] Experiment with 3.5 vs 4 (especially regarding speed)
- [ ] Display return values from functions
- [ ] Display auto complete suggestions as you type based on previous runs and context of open programs (complete with tab)
- [ ] Styling
- [ ] Add more functions

---

- [ ] Run function on selected text (e.g. translate)
- [ ] Default install path should be same as config folder
- [ ] Multi step functions, e.g. ask for input before running more
- [ ] UI to enable/disable functions

---

- [ ] Consider even more interactive functions with custom uis
- [ ] Deeper integration into what you're doing in the UI -> make more relevant suggestions before you even type (e.g. based on selection, based on images, based on program, based on time, calendar, music, ...)

## Functions

- [ ] Open Website
- [ ] Google search
- [ ] Youtube search
- [ ] Open program
- [ ] Calculator
- [ ] Timer
- [ ] Converter
- [ ] Meta commands (enable, disable, list, ...)
- [ ] Translate
- [ ] Get weather
- [ ] Tick Tick (add task)
- [ ] Spotify (play, pause, next, previous, ...)
