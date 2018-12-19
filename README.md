# Game of Life

Your task is to build Conway's Game of Life. You can learn a little more about it [here](https://www.youtube.com/watch?v=0XI6s-TGzSs). [Here](https://www.youtube.com/watch?v=C2vgICfQawE) is an awesome video showing more sophisticated configurations. Skip to about 1:10 for where things start.

To reiterate the rules:

1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

## Getting Setup

I've created a starter project that you will work off of. You will need to download the project with [git](https://git-scm.com/downloads).

Download the project using `git clone git@github.com:nadrane/game-of-life.git`

## Running the Program

You can open the game in your browser by pasting in the file path to your `index.html` in the URL search bar.

The filepath will look something like this, though the specifics will depend on where you clone the start project:

`file:///Users/nickdrane/clients/spantree/rush/game-of-life/index.html`

## Completing the game

I've written some scaffolding that gets the game working on the web, but I've omitted the implementations to some key functions.

Your job is to get complete these functions. All of the code is located in `app.js`

## Solution

There is a separate branch with the solution. You can view it with

`git branch solution`

from without your game of life folder

