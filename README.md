# Algorithm Visualizer 3D

A 3D interactive visualization tool for sorting algorithms, built with React, TypeScript, and React Three Fiber.  
It shows step-by-step animations of sorting, with colored bars and arrows for comparisons, swaps, and pivots.


## Features
- **Multiple algorithms**: Bubble Sort, Insertion Sort, Selection Sort, Quick Sort (more coming soon!)
- **3D visualization** with animated bars
- **Steps Board** to track the history of operations
- **Complexity Table** showing time & space complexities
- **Reset and rerun**

## Tech Stack
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) for 3D rendering
- [drei](https://github.com/pmndrs/drei) for helpers like 3D text
- Vite for fast development

## CI/CD & Deployment
This project uses GitHub Actions to automatically build and deploy the app to GitHub Pages whenever changes are merged into the `main` branch.  

- **Workflow triggers**: pushes or merges to `main`
- **Build**: runs `npm ci` and `npm run build`
- **Deploy**: the `dist` folder is published to GitHub Pages
- **Secrets**: GitHub provides `GITHUB_TOKEN` automatically for deployment

## Usage
Pick an algorithm from the home page.
Click Sort to start the animation.
Watch the bars move, with arrows/bars highlighting comparisons, pivots, and swaps.
Click Reset to shuffle the array and try again.

## License
MIT License
