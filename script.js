let commandsPanel = document.querySelector(".commandPanel");
let panel = document.querySelector(".panel");
let alert_box = {
  element: document.querySelector(".alert_box"),
  content: document.querySelector(".alert_box_content"),
};

let gameover = document.querySelector(".gameover");
let trigger_gameover = () => {
  gameover.classList.remove("hide");
};

let menu = {
  element: document.querySelector(".menu"),
  mainmenu: document.querySelector(".mainmenu"),
  inv: document.querySelector(".inv"),
  inv_items: document.querySelector(".inv_items"),
  inv_panel: document.querySelector(".inv_panel"),
  btn: document.querySelector(".menu_btn"),
};

let menu_toggle = () => {
  menu.element.classList.toggle("hide");
  menu.inv.classList.add("close_inv");
  menu.mainmenu.classList.remove("drawer_mainmenu");
  load_Inv(false);
};

let statusUI = {
  posX: document.getElementById("posX"),
  posY: document.getElementById("posY"),
  energys: document.getElementById("energy"),
  score: document.getElementById("score"),
  tutor: document.querySelector(".tutor"),
};

let close_tutor = () => {
  statusUI.tutor.classList.add("hide");
}

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

let score = {
  value: 0,
  get: () => {
    return score.value;
  },
  add: (value) => {
    score.value += value;
    statusUI.score.innerText = score.value;
  },
  sub: (value) => {
    score.value -= value;
    statusUI.score.innerText = score.value;
  },
};

let enegry = {
  value: 100,
  get: () => {
    return enegry.value;
  },
  add: (value) => {
    enegry.value += value;
    if (enegry.value > 140) {
      enegry.value = 140;
    }
    statusUI.energys.innerHTML = `Energy : ${enegry.value}`;
  },
  sub: (value) => {
    enegry.value -= value;
    if (enegry.value < 0) {
      enegry.value = 0;
    }
    statusUI.energys.innerHTML = `Energy : ${enegry.value}`;
  },
};


let backpack = {
  items: [],
  add: (item) => {
    backpack.items.push(item);
  },
  remove: (item) => {
    backpack.items.splice(backpack.items.indexOf(item), 1);
  },
  checkIfHave: (item) => {
    return backpack.items.includes(item);
  },
  get: () => {
    return backpack.items;
  },
};

let eventArray = [
  {
    name: "TEST Subject",
    desc: ``,
    imgPath: "./images/frog-like.jpg",
    deco: "half",
    posX: 1,
    posY: 2,
    type: "good",
    isFinish: false,
    score: 10,
    checkSpecial: null,
    extraPoint: 0,
  },
  {
    name: "TEST Upgrade",
    desc: ``,
    imgPath: "./images/frog-like.jpg",
    deco: "upgrade",
    posX: 2,
    posY: 2,
    type: "upgrade",
    isFinish: false,
    itemId: "test",
    score: 10,
  },
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
    deco: "good",
    posX: 0,
    posY: 2,
    type: "good",
    isFinish: false,
    score: 10,
    checkSpecial: "test",
    extraPoint: 100,
  },
  {
    name: "Kuy Q Yai Lek",
    deco: "bad",
    posX: 2,
    posY: 0,
    type: "bad",
    isFinish: false,
    timeout: 2000,
    exec: () => {
      sendCommands(["backward", "backward", "backward"], true);
    },
  },
];

let coreGame = {
  getUpgradeComponent: eventArray.filter((item) => {
    return item.type === "upgrade";
  }),
}

let winHandler = {
  element: document.querySelector(".win"),
  score: document.getElementById("win_score"),
  info: document.getElementById("win_info"),
  max_info: document.getElementById("win_max_info"),
  energy: document.getElementById("win_energy"),
  max_energy: document.getElementById("win_max_energy"),
  trigger: () => {
    winHandler.element.classList.remove("hide");
    winHandler.score.innerText = score.value;
    winHandler.energy.innerText = enegry.value;
    winHandler.max_energy.innerText = 100;
    winHandler.info.innerText = eventArray.filter((ele) => {return ele.type == "good" && ele.isFinish}).length;
    winHandler.max_info.innerText = eventArray.filter((ele) => {return ele.type == "good"}).length;
  }
}

let renderEvent = () => {
  for (let index = 0; index < eventArray.length; index++) {
    const element = eventArray[index];
    let eventElement = document.createElement("div");
    switch (element.deco) {
      case "good":
        eventElement.classList.add("goodE");
        break;
      case "bad":
        eventElement.classList.add("badE");
        break;
      case "half":
        eventElement.classList.add("halfE");
        break;
      case "upgrade":
        eventElement.classList.add("upE");
        break;
      default:
        break;
    }
    eventElement.classList.add("hideE");
    eventElement.classList.add("eventShadow");
    eventElement.style.top = element.posY + "0vh";
    eventElement.style.left = element.posX + "0vh";
    element.ele = eventElement;
    panel.appendChild(eventElement);
  }
}

let trigger_alert_box = (text, timeout) => {
  alert_box.element.classList.remove("hide");
  alert_box.content.innerHTML = text;
  setTimeout(() => {
    alert_box.element.classList.add("hide");
  }, timeout);
};

let scanEvent = () => {
  let nearby = eventArray.filter((ele) => {
    return (
      Math.abs(ele.posX - rover.x) <= 1 && Math.abs(ele.posY - rover.y) <= 1
    );
  });
  if (nearby.length) {
    nearby.forEach((element) => {
      element.ele.classList.remove("hideE");
    });
  }
};

let randomNumberMinMax = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let randomEvent = async () => {
  await eventArray.forEach((element) => {
    let posX = randomNumberMinMax(2, panelRes.width);
    let posY = randomNumberMinMax(2, panelRes.height);
    while (
      eventArray.find((ele) => {
        return ele.posX == posX && ele.posY == posY;
      })
    ) {
      posX = randomNumberMinMax(2, panelRes.width);
      posY = randomNumberMinMax(2, panelRes.height);
    }
    element.posX = posX;
    element.posY = posY;
    console.log(`X : ${posX} Y : ${posY}`);
  });
  renderEvent();
};
randomEvent();
function checkEvent() {
  let getEvent = eventArray.find((x) => x.posX == rover.x && x.posY == rover.y);
  scanEvent();
  if (getEvent) {
    if (getEvent.type == "good" && !getEvent.isFinish) {
      toggleModal(getEvent);
      score.add(getEvent.score);
      if (
        getEvent.checkSpecial != null &&
        backpack.checkIfHave(getEvent.checkSpecial)
      ) {
        score.add(getEvent.extraPoint);
      }
      getEvent.isFinish = true;
    }
    if (getEvent.type == "upgrade" && !getEvent.isFinish) {
      toggleModal(getEvent);
      backpack.add(getEvent.itemId);
      getEvent.isFinish = true;
    }
    if (getEvent.type == "bad" && !getEvent.isFinish) {
      trigger_alert_box(getEvent.name, getEvent.timeout);
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
  if (
    rover.y > panelRes.height ||
    rover.y < 0 ||
    rover.x > panelRes.width ||
    rover.x < 0
  ) {
    trigger_gameover();
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
    if(coreGame.getUpgradeComponent.length == backpack.get().length){
      winHandler.trigger();
    }
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
        if (enegry.value <= 0) {
          trigger_gameover();
          return;
        }
      }
    }, 1000 * commandMove);
    commandMove++;
  });
}

let skip_game = () => {
  window.location.assign("./landing/index.html");
};

let load_Inv = (open) => {
  if (open) {
    menu.mainmenu.classList.add("drawer_mainmenu");
    menu.inv.classList.remove("close_inv");
    let mego = eventArray.filter(
      (ele) => (ele.type === "good" || ele.type === "upgrade") && ele.isFinish
    );
    mego.forEach((ele) => {
      let item = document.createElement("div");
      item.classList.add("inv_items");
      item.innerHTML = ele.name;
      item.onclick = () => {
        toggleModal(ele);
      };
      menu.inv_panel.appendChild(item);
    });
  } else {
    menu.mainmenu.classList.remove("drawer_mainmenu");
    menu.inv.classList.add("close_inv");
    menu.inv_panel.innerHTML = null;
  }
};

let clearMoveset = () => {
  commandsPanel.innerHTML = null;
};
