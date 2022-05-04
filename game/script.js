let commandsPanel = document.querySelector(".commandPanel");
let rover = document.querySelector(".rover");
let roverX = 0;
let roverY = 0;
let roverDirection = "N";
let roverRotage = 0;
function moveRover(direction) { //ใช้สำหรับขยับหุ่นจากด้านหน้าหรือด้านหลัง
  let move = 1;
  switch (direction) {
    case "forward":
      move = 1;
      break;
    case "backward":
      move = -1;
      break;
    default:
      break;
  }

  switch (roverDirection) {
    case "N":
      roverX += move;
      break;
    case "E":
      roverY += move;
      break;
    case "S":
      roverX -= move;
      break;
    case "W":
      roverY -= move;
      break;
    default:
      break;
  }
  rover.style.top = roverY + "0vh";
  rover.style.left = roverX + "0vh";
}

function rotageRover(direction) { //ใช้สำหรับหมุนหุ่น
  switch (direction) {
    case "L":
      switch (roverDirection) {
        case "N":
          roverDirection = "W";
          break;
        case "E":
          roverDirection = "N";
          break;
        case "S":
          roverDirection = "E";
          break;
        case "W":
          roverDirection = "S";
          break;
        default:
          break;
      }
      roverRotage -= 90;
      break;
    case "R":
      switch (roverDirection) {
        case "N":
          roverDirection = "E";
          break;
        case "E":
          roverDirection = "S";
          break;
        case "S":
          roverDirection = "W";
          break;
        case "W":
          roverDirection = "N";
          break;
        default:
          break;
      }
      roverRotage += 90;
      break;
    default:
      break;
  }
  rover.style.transform = `rotate(${roverRotage}deg)`;
}

function addComand(command) { //เพิ่มคำสั่งในกล่องคำสั่ง
  let commandElement = document.createElement("div");
  commandElement.classList.add("cmdItems");
  commandElement.innerHTML = command;
  commandElement.dataset.command = command;
  commandElement.onclick = () => {
    commandElement.remove();
  };
  commandsPanel.appendChild(commandElement);
}

function getCommands() { //ดึงคำสั่งทั้งหมดจากกล่องคำสั่ง
  let commands = [];
  commandsPanel.childNodes.forEach((element) => {
    commands.push(element.dataset.command);
  });
  return commands;
}

async function sendCommands() { //ส่งคำสั่งไปยังหุ่น
  if (rover.dataset.mission == "on") { //ถ้าหุ่นกำลังทำงาน
    return;
  }
  let commands = getCommands();
  let commandMove = 0;
  rover.dataset.mission = "on";
  setTimeout(() => { //ปรับให้หุ่นเป็นสถานะว่าง
    rover.dataset.mission = "off";
  }, commands.length * 1000);
  await commands.forEach((command) => { //สั่งหุ่นทำงาน
    setTimeout(() => {
      switch (command) {
        case "forward":
          moveRover("forward");
          break;
        case "backward":
          moveRover("backward");
          break;
        case "left":
          rotageRover("L");
          break;
        case "right":
          rotageRover("R");
          break;
        default:
          break;
      }
    }, 1000 * commandMove);
    commandMove++;
  });
}
