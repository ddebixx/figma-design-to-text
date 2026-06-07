# Figson Converter

Convert Figma frames and components into AI-ready exports. Figson Converter turns your selection into structured **JSON**, **YAML**, **Markdown**, or plain **text** — with optional compression so you can trade fidelity for fewer tokens when feeding designs into LLM workflows.

## Demo

![Figson Converter demo](./src/assets/demo/plugin-demo.gif)


## Features

- **Multi-format export** — JSON, YAML, Markdown, and text summaries
- **Detail levels** — Precise, Balanced, or Efficient compression for LLM context windows
- **Live preview** — Syntax-highlighted export preview with line numbers
- **One-click download** — Save the current preview in the chosen format
- **Internationalization** — UI available in English, German, French, Italian, Japanese, Polish, Ukrainian, and Chinese

## How to use in Figma

### Install the plugin (development)

1. Clone this repository and install dependencies:

   ```bash
   npm install
   ```

2. Build the plugin UI and controller:

   ```bash
   npm run build
   ```

   This produces `dist/index.html` (UI) and `dist/main.js` (plugin controller) referenced by `manifest.json`.

3. In Figma, open **Plugins → Development → Import plugin from manifest…**

4. Select the `manifest.json` file in this project root.

5. Run the plugin via **Plugins → Development → figson-converter**.

### Convert a selection

1. Open a Figma file and select one or more frames, components, or layers.
2. Open **Figson Converter**.
3. Choose a **Detail level**:
   - **Precise** — full cleaned JSON, best fidelity
   - **Balanced** — removes noise like IDs and layout metadata (default)
   - **Efficient** — semantic compression, smallest token footprint
4. Choose an **Output format** (JSON, YAML, Markdown, or Text).
5. Click **Convert selection**.
6. Expand **Export preview** to review the output.
7. Click **Download** to save the file (`figson-export.<ext>`).

### Tips

- Select at least one layer before converting — empty selections show an error.
- Change detail level or format after conversion; the preview updates without re-running Figma serialization until you click **Convert selection** again.
- Use **Efficient** + **YAML** or **Text** when you need the smallest prompt payload; use **Precise** + **JSON** when downstream tools need full structure.

## Development

| Command | Description |
| --- | --- |
| `npm run dev` | Run the UI locally with Vite (UI-only, no Figma sandbox) |
| `npm run build` | Build UI + plugin controller for Figma |
| `npm run build:ui` | Build UI only (`dist/index.html`) |
| `npm run build:plugin` | Build plugin controller only (`dist/main.js`) |
| `npm run check` | Run Biome lint/format checks |
| `npm run test:run` | Run Vitest tests |

After changing plugin code, run `npm run build` and reload the plugin in Figma (**Plugins → Development → figson-converter**).

## Project structure

```text
src/
  plugin/          Figma plugin controller + scene serialization
  features/
    Converter/     UI, export pipeline, preview, workflow
  locales/         i18n translation files
  types/           Shared TypeScript types and Zod schemas
manifest.json      Figma plugin manifest
dist/              Build output (generated)
docs/              Demo GIF/screenshots for README
```

## Tech stack

- [Figma Plugin API](https://www.figma.com/plugin-docs/)
- React 19 + TypeScript + Vite
- Tailwind CSS + Radix UI
- [Shiki](https://shiki.style/) for syntax highlighting
- [js-yaml](https://github.com/nodeca/js-yaml) for YAML export
- i18next for translations
