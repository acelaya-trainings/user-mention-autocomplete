# User mention autocomplete

Example application which includes a comment box component, which captures mentions to users via `@`, like on Twitter, GitHub, Atlassian tools, etc.

When that character is typed, the component suggests users matching the text coming next, and one of them can be selected and automatically inserted in the comment.

## Start project

The project uses react to avoid reinventing the wheel in some basic aspects, and then provides the custom functionality on top of it.

The project provides a `docker-compose.yml` file to ease starting it.

* Install docker and docker-compose.
* Run `docker-compose up`.
* Open http://localhost:3000 in a modern browser.

## Run tests

Tests are collocated inside `src`, next to the modules they test.

For react components, the tests use `@testing-library/react`.

Run the tests with `npm run test` (or inside the running docker container with `./indocker npm run test`).

## Using the component

The component is part of the project for simplicity, but everything inside `src/comment-widget` is agnostic to the app and could be exposed as a library of its own.

```tsx
import { CommentBox } from './comments-widget/CommentBox';

// [...]

const [textAreaValue, setTextAreaValue] = useState<string>('');

return (
  <CommentBox
    value={textAreaValue}
    onChange={setTextAreaValue}
    loadUsers={() => fetch('/users.json').then((res) => res.json())}
  />
);
```

## Missing nice-to-haves

Some features have been neglected, but could be improved with some extra time:

* Use a nicer UI. The component is based on a simple `textarea`. Some other type of element with `contenteditable` would allow displaying selected users in a nicer way (different color, background, etc). This example just displays the name of the user in quotes once selected.
* The users dropdown appears always under the textarea. Ideally it should appear right under the caret.
* This component considers it's in "search mode" while writing text after a `@` has been typed. If the `Backspace` is "typed", it resets the search and eventually gois out of "search mode" once the `@` is erased. However, it does not consider the `del` key, selecting all the text + `Backspace` or other combinations.
* Users in the list can only be selected via mouse click. Ideally it should allow focusing on the list, switching active user via up/down arrows, and selecting via `Enter`.
