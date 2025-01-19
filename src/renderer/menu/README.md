# Dynamic Menu System

This directory contains the implementation of MarkText's dynamic menu system.

## Files

- `config.js` - Menu structure and translation keys
- `menuBuilder.js` - Menu building and translation logic
- `index.js` - Menu initialization and event handling
- `locales/` - Translation files for menu items
- `dynamicMenu.js` - Main process menu handling

## Features

- Dynamic menu generation
- Real-time language switching
- Maintains all original menu functionality
- IPC communication between main and renderer processes

## Architecture

1. Menu configuration is defined in `config.js`
2. `menuBuilder.js` creates translated menu templates
3. `index.js` handles initialization and events
4. Main process creates actual menu from template
5. IPC messages handle communication between processes

## Usage

The menu system is automatically initialized when the app starts.
Language changes are handled through Vuex store watchers.
