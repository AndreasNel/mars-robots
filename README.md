# Mars Robots coding challenge

This is a simple Node.js project using ECMAScript Modules (ESM). It simulates an environment where a world is represented in a 2-dimensional grid, with an indeterminate amount of robots executing a number of predefined movements. If robots move out of bounds of the world, they are considered lost, and similar moves by other robots are avoided to reduce the amount of robots that get lost.

## Expected Input and Output

See the sample test data in `test-data.txt` for an example of the input that the program can handle.

### Input

Line 1 indicates the bounding box of the world.
Every pair of lines afterwards represent the initial (x,y,orientation) position and the command string of a robot.
Robot instructions are processed sequentially.

```
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
```

### Output

Each line represents the last position of a robot after executing its respective command string.
Should a robot move out of bounds of the world, its last known position is recorded together with the word `LOST`.
Similar subsequent commands that would result in other robots getting lost are avoided.

```
1 1 E
3 3 N LOST
2 3 S
```

## Requirements

- [Node.js](https://nodejs.org/) v22+ (with ESM support)
- [npm](https://www.npmjs.com/)

## Getting Started

1. **Clone the repository:**

   ```sh
   git clone https://github.com/AndreasNel/mars-robots.git
   cd mars-robots
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Run the app:**

   ```sh
   npm start <filename>
   ```

4. **(Optional) Run in Codespaces or VSCode Dev Containers:**
   - Open this repository in GitHub Codespaces or VSCode Dev Containers.
   - The environment is pre-configured and will install dependencies automatically.

## Project Structure

- `src/` – Source code
- `.github/` – GitHub configs and Copilot instructions
- `.devcontainer/` – Codespaces configuration

## Notes

- All JavaScript files use ES Modules (`import`/`export`).
- See `.github/copilot-instructions.md` for the style guide.
