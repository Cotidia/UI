Cotidia UI
==========

## Why Fractal?

Fractal is a pattern library. It allows us to document and display user interface patterns,
including styles and scripts. The base style library is Sixteen and the core UI module is React UI.
Each of those two libraries are self sufficient and should be independently tested. The main goal
of Fractal is to bring together those libraries into one single documentation site that explains
how components are used and demonstrate how they work.

Both Sixteen and React UI should be included to the Fractal project using NPM link. The idea is to
be able to work on those libraries as GIT repositories and use their source code directly in Fractal
to compile the documentation.

The Fractal project may use a Gulp worker to compile the styles and scrips assets from Sixteen and
React UI, as well as reloading the actual document site.

## Installation

Clone the git repository and install the dependencies:

```console
$ npm install
```

Make sure that Gulp CLI is installed globally:

```console
$ npm install --global gulp-cli
```

### Link the Sixteen library

You should have Sixteen installed on your machine. If not, clone the repository
[Sixteen](git@code.cotidia.com:cotidia/sixteen.git) to a location of your choice. Then `cd` to the
sixteen folder and run `npm link`. This will create a global package for it.

Then, go to your project folder, and add Sixteen to the project `node_modules` by using the link
method. It will create a symbolic link to the Sixteen repository.

```console
$ cd /myproject
$ npm link sixteen
/Users/guillaumepiot/Documents/Projects/packages/UI/node_modules/sixteen -> /usr/local/lib/node_modules/sixteen -> /Users/guillaumepiot/Documents/Projects/packages/sixteen
```

Using Gulp, we can then compile the CSS for our project using Sixteen.

```console
$ gulp css
```

You will then be able to run the site, which auto-sync enabled:

```console
$ gulp dev
```

The documentation site will then be available on [http://localhost:3000/](http://localhost:3000/).
