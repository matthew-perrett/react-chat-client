https://codeutopia.net/blog/2016/01/25/getting-started-with-npm-and-browserify-in-a-react-project/



????
Lastly, we return an empty object. The function we’re exporting returns an object representing the host connection. This means we could have multiple connections if we want. This is also why we’re directly exporting the function rather than an object. Exporting an object is convenient for things we’ll always have only one of, like the message store, but sometimes we return constructor functions like this. Exported React components also behave in a somewhat similar way.
