# What the Hook? Learn the basics of Tapable

## What is Tapable
Tapable is a library that creates hooks for plugins. It is a core library of [webpack](https://webpack.js.org/), a popular module bundler. What makes Webpack powerful is you can write custom plugins. Tapable creates this powerful custom plugin system using hooks.

## What are hooks?
Hooks allow other users to get notified of important events, and run the other user's code when that important event happens. You've probably seen this before. The browser exposes many hooks for you to tap into. If you wanted to run code when a click event was going to happen, you would do this:

```js
// When a user clicks on the screen, a message is printed to the console
document.addEventListener("click", function() {
    console.log("You clicked me!");
});
```

Another example of hooks are React lifecycle methods. If you've worked with React, you've probably heard of `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`. You can think of these lifecycle methods as hooks. I can add code to run when a lifecycle event happens.

```js
import React from "react";

// When this component is mounted onto the screen, a message is printed to the console
class MyComponent extends React.Component {
    componentDidMount() {
        console.log("I mounted onto the screen!");
    }

    render() {
        return <h1>🎣</h1>
    }
}
```

> The new [React Hooks API](https://reactjs.org/docs/hooks-intro.html) allows you to use lifecycle methods outside of Component classes.

## How to create hooks with Tapable
The most basic hook Tapable provides is the `Synchronous Hook`, or `SyncHook`. You can create a hook like so.

```js
import { SyncHook } from "tapable";

const newHook = new SyncHook();
```

Tapable suggests exposing your hooks through a hook property. This allows developers to easily see what hooks are available to tap into. 

```js
import { SyncHook } from "tapable";

class Car {
  constructor() {
    this.hooks = {
      startCar: new SyncHook()
    };
  }
}
```

This is how webpack exposes its hooks to plugin authors.

```js
// Example taken from https://webpack.js.org/contribute/writing-a-plugin/
class MyExampleWebpackPlugin {
  apply(compiler) {
    // Notice compiler.hooks 🎣
    compiler.hooks.emit.tapAsync(
      'MyExampleWebpackPlugin',
      (compilation, callback) => {
        console.log('This is an example plugin!');

        callback();
      }
    );
  }
}
```

To call a hook, run its `call` method.

```js
import { SyncHook } from "tapable";

class Car {
  constructor() {
    this.hooks = {
      carStarted: new SyncHook()
    };
  }

  turnOn() {
    this.hooks.carStarted.call();
  }
}

const myCar = new Car();
myCar.turnOn();
```

A hook will trigger all tapped functions when it is called.

> Think of this like your click event listener. Calling a hook is like triggering a "click" event. All click event listener functions will fire now.

You can also pass arguments to your `call` method. If you do so, be sure to add argument names when instantiating your hook.

```js
import { SyncHook } from "tapable";

class Car {
  constructor() {
    this.hooks = {
      carStarted: new SyncHook(),
      radioChanged: new SyncHook(["radioStation"])
    };
  }

  turnOn() {
    this.hooks.carStarted.call();
  }

  setRadioStation(radioStation) {
    this.hooks.radioChanged.call(radioStation);
  }
}

const myCar = new Car();
myCar.setRadioStation("100.10");
```

This isn't exciting when nobody's listening, or tapped, into the hooks.

## How to tap hooks
To tap a hook, run its `tap` method.

```js
const myCar = new Car();
myCar.hooks.carStarted.tap("EngineLampPlugin", () => {
  console.log("Car started!");
});
myCar.hooks.radioChanged.tap("RadioPlugin", (radioStation) => {
  console.log(`Radio changed to ${radioStation}`);
});

myCar.turnOn();
// "Car started!"

myCar.setRadioStation("100.10");
// "Radio changed to 100.10"
```

The first argument is the name of your plugin. This name is used for diagnostic/debugging information.
The second argument is a callback function that is called when your hook is called. Your callback function has access to arguments passed to the hook's `call` method.

> Think of this like your click event listener. This callback function is triggered when a "click" event happens. The callback function has access to the event object. Our plugin has access to the arguments used in our `call` method.

## How to intercept hooks
Your Tapable hooks may want to know when it is getting interacted with. Hooks let you intercept the tapped code. There are 3 main ways that we can intercept.

### Register interceptor
This interceptor triggers each time a Plugin taps into a hook. This code is run only once. You have access to the Tap object, which has information about such as the name of the plugin, and what function the Tap will call.
```js
class Car {
  constructor() {
    this.hooks = {
      carStarted: new SyncHook()
    };

    this.hooks.carStarted.intercept({
        register: (tapInfo) => {
            console.log(`${tapInfo.name} is registered`);
            return tapInfo;
        }
    })
  }

  turnOn() {
    this.hooks.carStarted.call();
  }
}

const myCar = new Car();
myCar.hooks.carStarted.tap("EngineLampPlugin", () => {
  console.log("Car started!");
});
// EngineLampPlugin is registered
myCar.hooks.carStarted.tap("BluetoothPlugin", () => {
  console.log("Bluetooth enabled");
});
// BluetoothPlugin is registered

myCar.turnOn();
// Car started!
// Bluetooth enabled
```

You can also modify the Tap object in your register intercept code. For example, we can override the Tap function.
```js
class Car {
  constructor() {
    this.hooks = {
      carStarted: new SyncHook()
    };

    this.hooks.carStarted.intercept({
        register: (tapInfo) => {
            if (tapInfo.name === "NitroPlugin") {
                console.log(`🚫 ${tapInfo.name} is banned 🚫`);

                tapInfo.fn = () => {
                  console.log(`🚨 Police are on their way 🚨`);
                };
            } else {
                console.log(`${tapInfo.name} is registered`);
            }

            return tapInfo;
        }
    })
  }

  turnOn() {
    this.hooks.carStarted.call();
  }
}

const myCar = new Car();
myCar.hooks.carStarted.tap("EngineLampPlugin", () => {
  console.log("Car started!");
});
// EngineLampPlugin is registered
myCar.hooks.carStarted.tap("NitroPlugin", () => {
  console.log("🏎 lets go fast");
});
// 🚫 NitroPlugin is banned 🚫

myCar.turnOn();
// Car started!
// 🚨 Police are on their way 🚨
```

### Call interceptor
This interceptor triggers each time a Hook is called. You have access to all the arguments that your Plugin has.

```js
class Car {
    constructor() {
      this.hooks = {
        radioChanged: new SyncHook(["radioStation"])
      };
  
      this.hooks.radioChanged.intercept({
        call: (radioStation) => {
            console.log("Looking for signal...");
            console.log(`Signal found for ${radioStation}`);
        }
      })
    }

    setRadioStation(radioStation) {
        this.hooks.radioChanged.call(radioStation);
    }
  }
  
  const myCar = new Car();
  myCar.hooks.radioChanged.tap("RadioPlugin", radioStation => {
    console.log("Station was changed", radioStation);
  });
  
  myCar.setRadioStation("100.1");
  // Looking for signal...
  // Signal found for 100.1
  // Station was changed 100.1

  myCar.setRadioStation("100.3");
  // Looking for signal...
  // Signal found for 100.1
  // Station was changed 100.1
```

### Tap interceptor
This interceptor triggers each time a Hook is called. This is different than the `call` interceptor because it triggers once for each Plugin that is tapped to the Hook. You have access to the Tap object, but cannot change the Tap object.

```js
class Car {
    constructor() {
      this.hooks = {
        radioChanged: new SyncHook(["radioStation"])
      };
  
      this.hooks.radioChanged.intercept({
        tap: (tapInfo) => {
            console.log(`${tapInfo.name} is getting called`);
        }
      })
    }

    setRadioStation(radioStation) {
        this.hooks.radioChanged.call(radioStation);
    }
  }
  
  const myCar = new Car();
  myCar.hooks.radioChanged.tap("RadioPlugin", radioStation => {
    console.log("Station was changed", radioStation);
  });
  myCar.hooks.radioChanged.tap("SpeakerPlugin", radioStation => {
    console.log("Updating Speaker UI", radioStation);
  });
  
  myCar.setRadioStation("100.1");
  // RadioPlugin is getting called
  // Station was changed 100.1
  // SpeakerPlugin is getting called
  // Updating Speaker UI 100.1

  myCar.setRadioStation("100.3");
  // RadioPlugin is getting called
  // Station was changed 100.3
  // SpeakerPlugin is getting called
  // Updating Speaker UI 100.3
```

## UI Example


## Conclusion
This was a brief introduction to Tapable Hooks. Let me know if you've found other useful ways to use hooks.