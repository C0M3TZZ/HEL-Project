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
    name: "Microphone",
    desc: `When the Perseverance rover arrives at Mars, it will have two microphones. It will make it possible for our robots to not only touch and taste, but finally hear, the sounds of Mars.NASA spacecraft that traveled to Mars in the past have carried microphones twice. Unfortunately, one of those missions, the Mars Polar Lander, failed. The Phoenix Lander had a microphone on the spacecraft’s descent camera, but that instrument was never turned on.`,
    imgPath: "./images/micro.png",
    deco: "upgrade",
    type: "upgrade",
    isFinish: false,
    itemId: "Microphone",
    score: 200,
  },
  {
    name: "mast",
    desc: `When the Perseverance rover arrives at Mars, it will have two microphones. It will make it possible for our robots to not only touch and taste, but finally hear, the sounds of Mars.NASA spacecraft that traveled to Mars in the past have carried microphones twice. Unfortunately, one of those missions, the Mars Polar Lander, failed. The Phoenix Lander had a microphone on the spacecraft’s descent camera, but that instrument was never turned on.`,
    imgPath: "./images/mastcam.png",
    deco: "upgrade",
    type: "upgrade",
    isFinish: false,
    itemId: "mast",
    score: 200,
  },
  {
    name: "Robotic Arm",
    desc: `The 7-foot-long robotic arm on Perseverance can move a lot like yours. It has a shoulder, elbow and wrist "joints" for maximum flexibility. The arm lets the rover work as a human geologist would: by holding and using science tools with its "hand" or turret. The rover's own "hand tools" extract cores from rocks, takes microscopic images and analyzes the elemental composition and mineral makeup of Martian rocks and soil.`,
    imgPath: "./images/reboarm.png",
    deco: "upgrade",
    type: "upgrade",
    isFinish: false,
    itemId: "Robotic Arm",
    score: 200,
  },
  {
    name: "Power supply",
    desc: `The Perseverance rover requires electrical power to operate. Without power, the rover cannot move, use its science instruments, or communicate with Earth.Perseverance carries a radioisotope power system. This power system produces a dependable flow of electricity using the heat of plutonium's radioactive decay as its "fuel."`,
    imgPath: "./images/bat.png",
    deco: "upgrade",
    type: "upgrade",
    isFinish: false,
    itemId: "Power supply",
    score: 200,
  },
  {
    name: "wheel",
    desc: `The Perseverance rover has six wheels, each with its own individual motor. The two front and two rear wheels also have individual steering motors. This steering capability allows the vehicle to turn in place, a full 360 degrees. The four-wheel steering also allows the rover to swerve and curve, making arcing turns.`,
    imgPath: "./images/wheel.png",
    deco: "upgrade",
    type: "upgrade",
    isFinish: false,
    itemId: "wheel",
    score: 200,
  },
  {
    name: "Mastcam-Z",
    desc: `The Mastcam-Z is the name of the mast-mounted camera system that is equipped with a zoom function on the Perseverance rover. Mastcam-Z has cameras that can zoom in, focus, and take 3D pictures and video at high speed to allow detailed examination of distant objects.it fucntion is To take high-definition video, panoramic color and 3D images of the Martian surface and features in the atmosphere with a zoom lens to magnify distant targets`,
    imgPath: "./images/mastcam.png",
    deco: "upgrade",
    type: "upgrade",
    isFinish: false,
    itemId: "Mastcam-Z",
    score: 200,
  },
  {
    name: "UHF",
    desc: `Ultra-High Frequency Antenna Most often, Mars 2020 uses its ultra-high frequency (UHF) antenna (about 400 megahertz) to communicate with Earth through NASA's orbiters around Mars. Because the rover and orbiter antennas are within close range of each other, they act a little like walkie-talkies compared to the long-range telecommunications with Earth provided by the low-gain and high-gain antennas. It generally takes about 5 to 20 minutes for a radio signal to travel the distance between Mars and Earth, depending on planet positions. Using orbiters to relay messages is beneficial because they are much closer to Perseverance than the Deep Space Network (DSN) antennas on Earth. The mass- and power-constrained rover can achieve high data rates of up to 2 megabits per second on the relatively short-distance relay link to the orbiters overhead. The orbiters then use their much larger antennas and transmitters to relay that data on the long-distance link back to Earth.Tech Specs Main Job	Transmitting Data to Earth through Mars Orbiters Radio Frequency	Ultra-High Frequency (UHF) band (about 400 megahertz) Transmission Rates	Up to 2 megabits per second on the rover-to-orbiter relay link.`,
    imgPath: "./images/UHF.png",
    deco: "upgrade",
    type: "upgrade",
    isFinish: false,
    itemId: "UHF",
    score: 200,
  },
  {
    name: "Yi long ma entered your office your engineer confuse him with elon musk turn left and go 1 tile forward and turn another left and go 2 tile forward",
    deco: "bad",
    type: "bad",
    isFinish: false,
    timeout: 5000,
    exec: () => {
      sendCommands(["left", "forward", "left", "forward", "forward"], true);
    },
  },
  {
    name: "some random drone have kidnap your preserverance go 2 tile forward",
    deco: "bad",
    type: "bad",
    isFinish: false,
    timeout: 5000,
    exec: () => {
      sendCommands(["forward", "forward"], true);
    },
  },
  {
    name: "what the hell is that? turn right and go 1 tile backward and lost 200 point",
    deco: "bad",
    type: "bad",
    isFinish: false,
    timeout: 5000,
    exec: () => {
      sendCommands(["right", "backward"], true);
      score.sub(200);
    },
  },
  {
    name: "Your signal got interrupted turn right and go 2 tiles forward",
    deco: "bad",
    type: "bad",
    isFinish: false,
    timeout: 5000,
    exec: () => {
      sendCommands(["right", "forward", "forward"], true);
    },
  },
  {
    name: "oopsie the preserverance trip some rocks go 2 tiles forward",
    deco: "bad",
    type: "bad",
    isFinish: false,
    timeout: 5000,
    exec: () => {
      sendCommands(["forward", "forward"], true);
    },
  },
  {
    name: "The preserverance got back pain (how?) well let her get some rest go 3 tile backward",
    deco: "bad",
    type: "bad",
    isFinish: false,
    timeout: 5000,
    exec: () => {
      sendCommands(["backward", "backward", "backward"], true);
    },
  },
  {
    name: "we found some cute cat on mars so we decided to pet them go 1 tiles forward turn right and go another 1 tiles forward",
    deco: "bad",
    type: "bad",
    isFinish: false,
    timeout: 5000,
    exec: () => {
      sendCommands(["forward", "right", "forward"], true);
    },
  },
  {
    name: "You have a dance battle with dance king on mars go 3 tiles forward and 4 tiles backward and lost 4 energy",
    deco: "bad",
    type: "bad",
    isFinish: false,
    timeout: 5000,
    exec: () => {
      sendCommands(["forward", "forward", "forward", "backward", "backward", "backward", "backward"], true);
      enegry.sub(4);
    },
  },
  {
    name: "Our engineer misinput! turn left and go 2 tiles forward",
    deco: "bad",
    type: "bad",
    isFinish: false,
    timeout: 5000,
    exec: () => {
      sendCommands(["left", "forward", "forward"], true);
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
