# Puppy Word Race 🐶🏁

A colorful, responsive HTML5 typing game for young learners. Type short words to help Dash the puppy race toward the finish line.

## Included
- Intro screen with a linked TypingGamesFree.io wordmark and links back to https://typinggamesfree.io/
- 60-second word-typing round
- Short, familiar words for beginning readers
- Keyboard input and mobile-friendly text input
- Score, completed words, accuracy, race progress, and a friendly rival racer
- Correct/incorrect feedback, results screen, replay, and intro navigation
- Responsive desktop and mobile layout
- No framework, build step, or server required

## Files
- `index.html` — page structure and clickable TypingGamesFree.io links
- `style.css` — layout, colors, puppy illustration, and responsive styles
- `game.js` — word list, typing logic, scoring, race movement, and timer

## Run locally
Unzip the project and open `index.html` in a modern browser.

## Deploy to GitHub Pages
1. Create a new GitHub repository, such as `puppy-word-race`.
2. Upload `index.html`, `style.css`, `game.js`, and `README.md` to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/(root)`, then click **Save**.
6. Wait for GitHub Pages to publish your site.

The game uses relative file paths and works at a project URL such as `https://YOUR-USERNAME.github.io/puppy-word-race/`.

## TypingGamesFree.io links
The wordmark in the header, “More typing games” link, intro credit, result-screen link, and footer all open https://typinggamesfree.io/ in a new tab. The wordmark is a lightweight text-based logo treatment that links to the site; it does not copy an external logo image file.

## Customize
- Change the round duration by updating `time: 60` in the state and reset object in `startGame()`.
- Add or remove words in the `WORDS` array in `game.js`.
- Adjust points in `state.score += 10 + ...`.
- Change the site link in `index.html` if needed.

## License and assets
The puppy artwork is made from CSS shapes and emoji. Google Fonts is loaded from an external stylesheet with system-font fallbacks. Review all third-party assets you add before publishing.
