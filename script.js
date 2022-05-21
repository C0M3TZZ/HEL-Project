let commandsPanel = document.querySelector(".commandPanel");
let panel = document.querySelector(".panel");
let alert_box = {
  element: document.querySelector(".alert_box"),
  content: document.querySelector(".alert_box_content"),
};

let statusUI = {
  posX: document.getElementById("posX"),
  posY: document.getElementById("posY"),
  energys: document.getElementById("energy"),
};

let rover = {
  element: document.querySelector(".rover"),
  x: 0,
  y: 0,
  direction: "N",
  rotage: 0,
};

let panelRes = {
  width: Math.floor(panel.clientWidth / rover.element.clientHeight) - 1,
  height: Math.floor(panel.clientHeight / rover.element.clientHeight) - 1,
};

let enegryValue = 140;
let enegry = {
  add: (value) => {
    enegryValue += value;
    if (enegryValue > 140) {
      enegryValue = 140;
    }
    statusUI.energys.innerHTML = `Energy : ${enegryValue}`;
  },
  sub: (value) => {
    enegryValue -= value;
    if (enegryValue < 0) {
      enegryValue = 0;
    }
    statusUI.energys.innerHTML = `Energy : ${enegryValue}`;
  },
};
let eventArray = [
  {
    name: "หินรูปกบ",
    desc: `It shows a larger rock towards the bottom left of the frame, part of Perseverance visible towards the right, and the eerie Martian sky in the background. The most important thing was the 'ladder' between the boulder and Perseverance. Although technically this isn't a ladder, it does look like a ladder.
  These rocks have positioned themselves upwards as if helping someone traverse the surface of the Red Planet. The details on this 'ladder of Mars' are just as interesting. We can clearly see the rough texture on the sides, orange dust covering the top, and smaller rocks resting on top.
  Martian Rocks Have Many Interesting Shapes
  This is not the first time Perseverance has found similar objects on Planet Earth hidden behind the rocks of Mars. In late October, Perseverance found a rock that looked like a giant frog.
  Another photo from earlier in the year shows a rock that resembles a Martian worm. Most of the rocks on Mars are shaped like ordinary rocks, but on occasion, Perseverance finds rocks that are very unique in shape.
  Images like these are what make robots like Perseverance so important. Anyone reading this article is highly unlikely to set foot on Mars in their lifetime. That fact may be disappointing to some, but these photos help a little.
  We can sit back on Earth, not worry about the harsh reality of actually being on Mars, and still experience the planet as if we were there.`,
    imgPath: "./images/frog-like.jpg",
    posX: 0,
    posY: 2,
    type: "good",
    isFinish: false,
  },
  {
    name: "Kuy Q Yai Lek",
    posX: 2,
    posY: 0,
    type: "bad",
    isFinish: false,
    exec: () => {
      sendCommands(["backward", "backward", "backward"], true);
    },
  },
];

for (let index = 0; index < eventArray.length; index++) {
  const element = eventArray[index];
  let eventElement = document.createElement("div");
  eventElement.classList.add("eventShadow");
  eventElement.style.top = element.posY + "0vh";
  eventElement.style.left = element.posX + "0vh";
  element.ele = eventElement;
  panel.appendChild(eventElement);
}

let trigger_alert_box = (text, timeout) => {
  alert_box.element.classList.remove("hide");
  console.log(alert_box.content);
  alert_box.content.innerHTML = text;
  setTimeout(() => {
    alert_box.element.classList.add("hide");
  }, timeout);
};

function checkEvent() {
  let getEvent = eventArray.find((x) => x.posX == rover.x && x.posY == rover.y);
  if (getEvent) {
    if (getEvent.type == "good" && !getEvent.isFinish) {
      toggleModal(getEvent);
      getEvent.isFinish = true;
    }
    if (getEvent.type == "bad" && !getEvent.isFinish) {
      trigger_alert_box(getEvent.name, 2000);
      getEvent.exec();
      getEvent.isFinish = true;
    }
    getEvent.ele.remove();
  }
}

let toggleModal = (even) => {
  let modal = document.querySelector(".modal");
  let modal_title = document.querySelector(".modal_title");
  let modal_desc = document.querySelector(".modal_desc");
  let modalImg = document.getElementById("modal_pic_img");
  modalImg.src = even.imgPath;
  modal_title.innerHTML = even.name;
  modal_desc.innerHTML = even.desc;
  modal.classList.remove("hide");
};

let closeModal = () => {
  let modal = document.querySelector(".modal");
  modal.classList.add("hide");
};

async function moveRover(direction) {
  //ใช้สำหรับขยับหุ่นจากด้านหน้าหรือด้านหลัง
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

  switch (rover.direction) {
    case "N":
      rover.x += move;
      break;
    case "E":
      rover.y += move;
      break;
    case "S":
      rover.x -= move;
      break;
    case "W":
      rover.y -= move;
      break;
    default:
      break;
  }
  rover.element.style.top = rover.y + "0vh";
  rover.element.style.left = rover.x + "0vh";
  statusUI.posX.innerHTML = `X : ${rover.x}`;
  statusUI.posY.innerHTML = `Y : ${rover.y}`;
  if (rover.y > panelRes.height || rover.y < 0 || rover.x > panelRes.width || rover.x < 0) {
    trigger_alert_box("หุ่นของคุณอยู่ในพื้นที่ไม่สามารถเดินไปที่ตำแหน่งนี้ได้", 2000);
    return;
  }
}

function rotageRover(direction) {
  //ใช้สำหรับหมุนหุ่น
  switch (direction) {
    case "L":
      switch (rover.direction) {
        case "N":
          rover.direction = "W";
          break;
        case "E":
          rover.direction = "N";
          break;
        case "S":
          rover.direction = "E";
          break;
        case "W":
          rover.direction = "S";
          break;
        default:
          break;
      }
      rover.rotage -= 90;
      break;
    case "R":
      switch (rover.direction) {
        case "N":
          rover.direction = "E";
          break;
        case "E":
          rover.direction = "S";
          break;
        case "S":
          rover.direction = "W";
          break;
        case "W":
          rover.direction = "N";
          break;
        default:
          break;
      }
      rover.rotage += 90;
      break;
    default:
      break;
  }
  rover.element.style.transform = `rotate(${rover.rotage}deg)`;
}

function addComand(command) {
  //เพิ่มคำสั่งในกล่องคำสั่ง
  let commandElement = document.createElement("div");
  commandElement.classList.add("cmdItems");
  commandElement.innerHTML = command;
  commandElement.dataset.command = command;
  commandElement.onclick = () => {
    commandElement.remove();
  };
  commandsPanel.appendChild(commandElement);
}

function getCommands() {
  //ดึงคำสั่งทั้งหมดจากกล่องคำสั่ง
  let commands = [];
  commandsPanel.childNodes.forEach((element) => {
    commands.push(element.dataset.command);
  });
  return commands;
}

async function sendCommands(commands = getCommands(), bypass = false) {
  //ส่งคำสั่งไปยังหุ่น
  if (rover.element.dataset.mission == "on") {
    //ถ้าหุ่นกำลังทำงาน
    return;
  }
  let commandMove = 0;
  rover.element.dataset.mission = "on";
  setTimeout(() => {
    //ปรับให้หุ่นเป็นสถานะว่าง
    rover.element.dataset.mission = "off";
    checkEvent();
  }, commands.length * 1000);
  await commands.forEach((command) => {
    //สั่งหุ่นทำงาน
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
      if (bypass == false) {
        enegry.sub(1);
      }
    }, 1000 * commandMove);
    commandMove++;
  });
}
