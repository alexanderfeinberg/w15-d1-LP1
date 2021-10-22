# Refactor Widgets App

In this project, you will refactor the Class Components in an existing React
application into Function Components. By the end of the project you should be
able to:

* Use the `useState` Hook to convert state instance variables to function-based
  state variables
* Explain the use cases for the lifecycle methods `componentDidMount`,
  `componentDidUpdate`, and `componentWillUnmount`, as well as when each will
  run
* Use `useEffect` to replicate the behavior of those lifecycle methods while
  also understanding how the application of `useEffect` differs from those
  methods
* Use `useRef` to create a ref that will persist across renders

## Phase 0: Set Up

Start by cloning the Widgets application starter from the `Download` link at the
bottom of this page.

Run `npm install` to install all the packages.

To start the application, run `npm start` and open [http://localhost:3000] to
see the widgets displayed. Each section shown on the page is a different
component in the __components__ folder.

## Phase 1: `App`

In this phase, you will refactor the `App` component from a Class Component into
a Function Component. The `App` component, which receives no props, is rendered
inside of the entry file (__src/index.js__) and is responsible for rendering the
different widgets.

Begin by changing the opening class declaration to a function declaration. 

Next, use `useState` to convert the `showClock` state variable in the `App`
Class Component into a state variable in the `App` Function Component. (Don't
forget to update your imports!) Replace any calls to `this.setState` with calls
to the setter function returned by `useState`. Similarly, convert any instances
of `this.state.showClock` to its corresponding `showClock` variable in the
Function Component.

Convert the `toggleClock` instance method into a regular function. Change any
references to `this.toggleClock` simply to `toggleClock` to reflect this change.

Test your changes in the browser. Do all the widgets still work?
Congratulations! You've successfully converted your first Class Component into a
Function Component. Worth noting: all the components that the `App` component
renders as its children are still Class Components while `App` is now a Function
Component. Class and Function Components can be used interchangeably in a React
application.

## Phase 2: `Folder`

In this phase, you will refactor the `Folder` component from a Class Component
into a Function Component. The `Folder` component is rendered inside of `App`,
where it's passed an array of folder objects as props. The `Folder` component
renders the tabs of the folder as a sub-component called `Header`. The selected
tab is stored as a component state variable in `Folder`, and the content of the
selected tab is rendered inside of the `Folder` component.

Create a new `Folder` Function Component that expects the `folders` prop passed
in from its parent component, `App`.

Convert the `currentTab` state variable in the `Folder` Class Component into a
state variable in the `Folder` Function Component.

Convert any instances of `this.state` or `this.props` in the `Folder` Class
Component to their respective variables in the `Folder` Function Component.

Convert the `selectTab` method into a regular function.

Test your conversion in the browser. Be sure to use debugging tools like
`debugger`, `console.log`, and setting breakpoints in the browser's DevTools.
Also remember to check the error messages if you run into any issues.

## Phase 3: `Weather`

In this phase, you will refactor the `Weather` component from a Class Component
into a Function Component. The `Weather` component is rendered inside of the
`App` component but is not passed any props. Instead, it fetches data from a
weather data API endpoint after the component is first rendered. It then renders
the data it gets from the API.

In order to get the API to accept your HTTP requests, you'll need an API key.
API keys should be stored in a __.env__ file, so create a __.env__ file in your
root directory and paste the following into that file:

```sh
REACT_APP_WEATHER_API=b65b43cc09af164f099fe5a807d56972
# REACT_APP_WEATHER_API=8119be3ea48a73ad298d0b280a0d98ad
# REACT_APP_WEATHER_API=e14bad32abd13d701515672995a36e6a
# REACT_APP_WEATHER_API=2a7d6ce7cdd33961673705d6f754d472
# REACT_APP_WEATHER_API=0009c9f9b5283b47fe0b716582e300e0
```

Make sure the __.env__ file is included in your __.gitignore__. (You don't want
to expose your keys by pushing them to Github!) If you encounter a fetch limit,
comment out the first API key in the __.env__ file and comment in the second API
key. Repeat the process if you encounter an error again: comment out the second
key and comment in the third key, and so on.

Use the API key in the `Weather` component by changing the relevant line in that
component from

```js
const apiKey = `???`
```

to

```js
const apiKey = process.env.REACT_APP_WEATHER_API
```

As in the previous phase, convert any component props and state in the
`Weather` Class Component to props and state in a Function Component.

Convert the class's instance methods other than the lifecycle method
`componentDidMount` into regular functions in the Function Component.

`componentDidMount` will run after the component's first render. Convert
this into a `useEffect` with an empty dependency array in the Function
Component. `navigator.geolocation.getCurrentPosition` is a method that will
invoke the callback function passed in as its first argument with the user's
coordinates. In this case, `pollWeather` is the function that gets passed the
coordinates. You can define the `pollWeather` function inside the `useEffect`
since it will only be used in the `useEffect`.

Test your conversion in the browser.

## Phase 4: `Clock`

In this phase, you will refactor the `Clock` and `ClockToggle` components from
Class Components into Function Components. The `Clock` component is rendered
inside of `App` but is not passed any props. It displays the current date/time
information and will be updated every second. The `ClockToggle` is basically a
button that will mount and unmount the `Clock` component from the page. (This
will enable you to test your `useEffect` clean-up function.) It is also rendered
inside of `App` and is passed one prop: the `toggleClock` callback that should
run when the button is clicked. 

Just like with the previous phases, begin by converting the component props and
state in the `Clock` and `ClockToggle` Class Components to props and state in
Function Components. That should be all you need to do for `ClockToggle`.

As for `Clock`, convert its instance methods besides the lifecycle methods
(i.e., `componentDidMount` and `componentWillUnmount`) into regular functions in
the Function Component.

`componentDidMount` will run after the first render of the component. Convert
this into a `useEffect` with an empty dependency array in the Function
Component.

`componentWillUnmount` takes the interval id returned by `setInterval` and
clears the interval. `componentWillUnmount` will be called right before the
component is removed from the component tree. Have the `useEffect` function that
replaced `componentDidMount` return a function that will clear the interval set
by the `useEffect` function. (This step is a bit tricky, so call for help if you
can't solve it within 15 minutes.) React will automatically run this returned
function behind the scenes when the component is about to unmount. React would
also run this function to clean up before running the `useEffect` again after a
subsequent render, but the empty dependency array assures that this particular
`useEffect` will only run once per component lifecycle.

Once again, test your conversion in the browser.

## Phase 5: `Auto`

In this phase, you will refactor the `Auto` component from a Class Component
into a Function Component. The `Auto` component is rendered inside of the
`App` component, where it's passed an array of names as props. The `Auto`
component renders a list of names that could match the rendered input's value.

### Experimenting with lifecycle methods

**Before you start converting this Class Component,** take a moment to examine
the behavior of the two lifecycle methods, `componentDidUpdate` and
`componentWillUnmount`. `componentDidUpdate` runs whenever the component's props
or state update. (It does not run after the initial mount, however; to cover
that case, you would have to use `componentDidMount`.) `Auto` uses this method
to add (when the dropdown opens) and remove (when the dropdown closes) an event
listener to the document. This listener enables `Auto` to close the dropdown
menu if a user clicks outside of the component while the dropdown is open.

In contrast, `componentWillUnmount` runs only once, right before the component
is unmounted. It is accordingly used to clean up any lingering effects of the
component such as subscriptions, scheduled events, or event listeners so that
they will not continue to tie up resources once the component is gone. Here
`componentWillUnmount` makes sure to remove the event listener if it is
currently active. (`removeEventListener` does nothing if it cannot find the
listener to remove, so you don't need to worry about checking the status.)

Each of these lifecycle methods removes an event listener. The includes distinct
`console.log` messages that should enable you to determine which method removes
the listener in any given case. Try to trigger a removal. When is the first time
a message gets logged for removing a listener? Which method does the removal?
Can you get the other method to remove a listener? Why or why not? **Take a few
minutes to experiment and answer these questions before proceeding.**

As you will probably note, `componentDidUpdate` is almost always the method
doing the removal. Why? Because it runs whenever `Auto` updates the `showList`
state variable to open and close the dropdown. Remember that
`componentWillUnmount` runs only before the component unmounts; it will
accordingly never run as long as `Auto` stays mounted on your page. 

(If you want to trigger `componentWillUnmount`, run `npm start` to watch for
changes to your files, then type an extra return somewhere inside a method in
__Auto.js__. Once detected, the non-breaking change will cause the browser to
update the component dynamically, which essentially involves removing the
original `Auto` component and (re-)mounting the updated version. Voilà! If your
DevTools inspector is open while this happens, you should see the
`componentWillUnmount` message: "Cleaning up event listener from Autocomplete!")

### Conversion to Function Component

Now on to conversion! As in the previous phases, convert the component props and
state in the `Auto` Class Component to props and state in a Function Component.
Convert the class's instance methods (other than the lifecycle methods
`componentDidUpdate` and `componentWillUnmount`) into regular functions in the
Function Component.

`Auto` uses a ref (`inputRef`) to assign focus to the input field when a user
clicks anywhere inside the component. A ref is essentially a POJO with a
`current` key pointing to the assigned value. In the class version of `Auto`,
`inputRef` is created with `React.createRef` and assigned by setting the `ref`
attribute on the input field to `this.inputRef`. The input element can then be
accessed as `this.inputRef.current`. 

`React.createRef` returns a new ref every time. In a Class Component, you can
store that ref in an instance variable that will persist, but you don't have
that luxury in a Function Component. Enter the `useRef` Hook, which returns a
ref that will persist through re-renders: in contrast to `createRef`, `useRef`
always returns the same ref object on each render. This behavior is similar to
what we would expect for a variable created with `useState`, but there is a
crucial difference: **changing the value of a `useRef` ref will not cause a
re-render**. (You can store any value in a `useRef` ref; it is not restricted to
HTML element references, although that is a common use case.) You can read more
about `useRef` [here][useRef].

While you could still use `createRef` in a Function Component, go ahead and
convert `inputRef` to use `useRef`. The stable nature of a `useRef` ref will
make the `useEffect` that you will write in the next step a little more
straightforward. For now, however, leave the `createRef` in the `map` that
calculates `results` as it is. The first bonus phase below will discuss this
other `createRef`.  

As for the lifecycle methods, convert `componentDidUpdate` into a `useEffect`.
What will you need to put in your dependency array? Remember that a `useEffect`
Hook will only run when an element in its dependency array changes. Next convert
`componentWillUnmount` to a clean-up function returned by your `useEffect`. Look
back at the `useEffect` Hook in your `Clock` component if you are having
trouble.

### Comparing lifecycle methods and `useEffect`

If you kept the Class Component's code largely intact, then your `useEffect`
probably has two calls to remove an event listener, one in the main function and
one in the returned, clean-up function:

```javascript
useEffect (()=> {
    if (showList)
      document.addEventListener('click', handleOutsideClick);
    else {
      console.log("Removing Autocomplete listener on update!");
      document.removeEventListener('click', handleOutsideClick);
    }
      
    return (() => {
      console.log("Cleaning up event listener from Autocomplete!");
      document.removeEventListener('click', handleOutsideClick)
    });
  }, [showList]);
```

Once you get everything working, **run the same kind of tests** that you ran for
the Class Component. As before, try to trigger the removal of an event listener.
(Make sure to have the console in the browser's DevTools open when you first
load the page.) When does a removal first occur, and which function causes it?
How does that compare to the lifecycle methods in the Class Component? How
frequently does the clean-up function fire compared to `componentWillUnmount`?
Why is that?  

Several points are worth noting. First, notice that, unlike with the Class
Component, the first removal attempt occurs as soon as you load the page. Why?
Whereas `componentDidUpdate` waits to run until state and/or props have updated
from the values initially set during mounting, `useEffect` runs every time a
value in its dependency array has changed after a render, **including after the
first render**. When a page first loads, React runs the render function of each
component on the page. Once it finishes the renders, it then proceeds to the
`useEffect`s (which could potentially trigger another render, and so on). `Auto`
initially sets the value of `showList` to `false`, so the first pass through the
`useEffect` results in an attempted removal. 

Once the page has fully loaded, what happens when you first click in the
Autocomplete widget? The removal from the clean-up function runs! Why does this
happen? Remember that React always runs the clean-up function before running the
`useEffect` again. As seen above, the `useEffect` has already run right after
mounting. When you click in Autocomplete, it changes the value of `showList` to
`true` so the dropdown will show. React notices the change in `useEffect`'s
dependent variable and, in preparation for running the `useEffect` again, runs
the clean-up function from the previous iteration. 

If you continue opening and closing the dropdown, you will note that for every
open/close cycle, the clean-up function removal runs twice, the main `useEffect`
removal, once. This discrepancy occurs because the clean-up function runs after
every change to `showList`--i.e., on both open and close--while the main removal
occurs only when the dropdown closes (i.e., when `showList` changes to `false`).

Finally, this last observation means that the removal in the main `useEffect`
function is essentially redundant: even on dropdown close, any previously
mounted listener will already have been removed by the clean-up function. Since
you don't need it, go ahead and remove it! Try triggering a few more removals to
confirm that your code still works as expected.

## Bonus Phase 1: Convert `createRef` to `useRef` inside a `map`

What if you want to convert the `createRef` inside the `results` `map` to a
`useRef`? This is more complicated than your previous conversion to `useRef`
because Hooks must be used at a Function Component's top level and not be inside
any kind of loop. You accordingly cannot simply replace the `createRef` with
`useRef`.

To make this conversion work, define a new Function Component--e.g.,
`TransitionItem`--outside of `Auto` that returns the necessary `CSSTransition`
component. Create the `useRef` ref at the top-level of the `TransitionItem`.
Then inside the `map`, simply return a `TransitionItem` for each `result`. 

One final wrinkle: To work correctly, `CSSTransition` needs certain props passed
down behind the scenes from the `TransitionGroup` that ultimately wraps
`results` in `Auto`'s `render`/`return`. You want to make sure those props get
passed through `TransitionItem` to `CSSTransition`. To make this happen,
deconstruct the props you are passing into `TransitionItem`, storing any
additional props in `props`. (Use the rest operator.) Then, in addition to the
specific props you set when instantiating `CSSTransition`, also pass the rest of
the `props`. (Use the spread operator.) 

Test your solution!

## Bonus Phase 2: Convert a previous project into Class Components

Now that you've converted Class Components into Function Components, you should
test your understanding of Class Components by trying to do the reverse
conversion.

Convert a previous project that uses Function Components into Class Components.
You can choose any project to convert.

## What you've learned

In this project you have learned how to convert a React Class Component into a
Function Component. You began with the simplest component, `App`, learning
primarily how to use `useState` to convert a class's state variables. In
`Folder`, you added the capability to handle props. `Weather` then introduced
the lifecycle method `componentDidMount` to fetch data from an API, and you
learned how to replicate this behavior using `useEffect` with an empty
dependency array. Moving to `Clock`, you gained experience using a clean-up
function returned from `useEffect` to mimic the behavior of
`componentWillUnmount`. Finally, with `Auto`, you used `useRef` to create a ref
that would persist across renders and discovered how to use a dependency array
with `useEffect` to take the place of `componentDidUpdate`. You also
experimented with `useEffect` and the lifecycle methods to see not only how they
could achieve similar effects, but also how they differed.

[http://localhost:3000]: http://localhost:3000
[useRef]: https://reactjs.org/docs/hooks-reference.html#useref