let dir;
const grid = [
  [
    document.getElementById("TopLeft"),
    document.getElementById("CenterTop"),
    document.getElementById("TopRight"),
  ],
  [
    document.getElementById("CenterLeft"),
    document.getElementById("Center"),
    document.getElementById("CenterLeft"),
  ],
  [
    document.getElementById("BottomLeft"),
    document.getElementById("CenterBottom"),
    document.getElementById("BottomRight"),
  ],
];
let randomTileX = Math.floor(Math.random() * grid.length);
let randomTileY = Math.floor(Math.random() * grid[0].length);
grid[randomTileX][randomTileY].innerHTML = "2";
function FullTiles() {
  let Left = [];
  let XCenter = [];
  let Right = [];
  let Up = [];
  let YCenter = [];
  let Bottom = [];
  let Line = [Left, XCenter, Right, Up, YCenter, Bottom];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].innerHTML != "") {
        switch (dir) {
          case "down" || "right":
            for (let i = 0; i < grid.length; i++) {
              for (let j = 0; j < grid[i].length; j++) {
                switch (i) {
                  case 0:
                    Up.push(grid[i][j].innerHTML);
                    break;
                  case 1:
                    XCenter.push(grid[i][j].innerHTML);
                    break;
                  case 2:
                    Bottom.push(grid[i][j].innerHTML);
                    break;
                }
                switch (i) {
                  case 0:
                    Left.push(grid[i][j].innerHTML);
                    break;
                  case 1:
                    YCenter.push(grid[i][j].innerHTML);
                    break;
                  case 2:
                    Right.push(grid[i][j].innerHTML);
                    break;
                }
              }
            }
            break;
          case "right" || "up":
            for (let i = grid.length; i < 0; i--) {
              for (let j = grid[j].length; j < 0; j--) {
                switch (i) {
                  case 0:
                    Up.push(grid[i][j].innerHTML);
                    break;
                  case 1:
                    XCenter.push(grid[i][j].innerHTML);
                    break;
                  case 2:
                    Bottom.push(grid[i][j].innerHTML);
                    break;
                }
                switch (i) {
                  case 0:
                    Left.push(grid[i][j].innerHTML);
                    break;
                  case 1:
                    YCenter.push(grid[i][j].innerHTML);
                    break;
                  case 2:
                    Right.push(grid[i][j].innerHTML);
                    break;
                }
              }
            }
            break;
        }
      }
    }
  }
  let continu = false;
  for (let i = 0; i < Line.length; i++) {
    for (let j = 0; j < (Line[i].length - (Left.length % 2)) / 2; j++) {
      if (continu) {
        continu = false;
        continue;
      }
      if (Line[i][j] == Line[i][j + 1]) {
        Line[i][j] = 2 * Line[i][j];
        continu = true;
      }
    }
  }
  return {
    Y: {
      left: Left,
      Center: XCenter,
      right: Right,
    },
    X: {
      up: Up,
      Center: YCenter,
      bottom: Bottom,
    },
  };
}
const beginClick = { x: undefined, y: undefined };
const endClick = { x: undefined, y: undefined };
document.addEventListener("mousedown", (e) => {
  beginClick.x = e.pageX;
  beginClick.y = e.pageY;
});
document.addEventListener("mouseup", (e) => {
  endClick.x = e.pageX;
  endClick.y = e.pageY;
  let right = endClick.x - beginClick.x;
  let down = endClick.y - beginClick.y;
  let xDirection = right > 0 ? "right" : "left";
  let yDirection = down > 0 ? "down" : "up";
  if (Math.abs(right) < Math.abs(down)) {
    dir = yDirection;
  } else if (Math.abs(down) < Math.abs(right)) {
    dir = xDirection;
  }
  let gridValue = FullTiles();
  let gridColumns = [gridValue.Y.left, gridValue.Y.Center, gridValue.Y.right];
  let gridRows = [gridValue.X.up, gridValue.X.Center, gridValue.X.bottom];
  for (let i = 0; i < grid.length; i++) {
    switch (dir) {
      case "left" || "right":
        for (let j = 0; j < grid[i].length; j++) {
          grid[i][j].innerHTML = gridRows[i][j];
        }
        break;
      case "up" || "down":
        for (let j = 0; j < grid[i].length; j++) {
          grid[j][i].innerHTML = gridColumns[i][j];
        }
        break;
    }
  }
});
