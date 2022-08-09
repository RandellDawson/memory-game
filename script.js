Array.prototype.shuffle = function () {
  let currentIndex = this.length;
  let randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [this[currentIndex], this[randomIndex]] = [
      this[randomIndex],
      this[currentIndex]
    ];
  }
};

const game = () => {
  const showModal = (msg, duration, cb) => {
    const popupMsg = document.createElement("div");
    popupMsg.setAttribute("class", "alert-box");
    popupMsg.innerHTML = msg;
    if (duration) {
      setTimeout(function () {
        popupMsg.parentNode.removeChild(popupMsg);
        if (cb) {
          cb();
        }
      }, duration);
    }
    gridContainer.appendChild(popupMsg);
  };

  const checkClick = (event) => {
    if (event.target && event.target.classList.contains("grid-item")) {
      const imageElem = event.target.querySelector(".image");
      showChoiceResult(imageElem);
    }
  };

  const showChoiceResult = (selectedImageElem) => {
    selectedImageElem.style.display = "block";
    const selectedImage = selectedImageElem.alt;
    const isWinner = selectedImage === answer;
    const modalMessage = isWinner ? "You Win!" : "Wrong Animal. Try again.";
    if (isWinner) {
      selectedImageElem.parentNode.style.backgroundColor = "green";
      gridContainer.removeEventListener("click", checkClick);
    }

    showModal(modalMessage, 1000, function () {
      const gameOver = isWinner;
      if (!gameOver) {
        setTimeout(function () {
          selectedImageElem.style.display = "none";
        }, 0);
      }
    });
  };

  const addGridClickListener = () => {
    gridContainer.addEventListener("click", checkClick);
  };

  const hideImages = () => {
    document.querySelectorAll(".image").forEach(function (elem) {
      elem.style.display = "none";
    });
    answer = getRandomImage();
    addGridClickListener();
    showModal(`Where was the ${answer} located?`, 2000);
  }

  const createGrid = () => {
    gridContainer.innerHTML = "";
    imagesArr.forEach(function () {
      gridContainer.innerHTML += `<div class="grid-item"></div>`;
    });
  };

  const getRandomImage = () => {
    return imagesArr[Math.floor(Math.random() * imagesArr.length)]
      .split(".")[0];
  };

  const startGame = () => {
    createGrid();
    gridContainer.removeEventListener("click", checkClick);
    imagesArr.shuffle();
    answer = getRandomImage();
    document.querySelectorAll(".grid-item").forEach(function (elem, i) {
      elem.innerHTML = `<img
      src="${imagesArr[i]}"
      alt="${imagesArr[i].split(".")[0]}"
      class="image"
    />`;
    });
    setTimeout(hideImages, 3000);
  };

  const gridContainer = document.getElementById("grid-container");
  const startBtnElem = document.getElementById("start-button");
  const imagesArr = [
    "kangaroo.jpg", "lion.jpg", "shark.jpg",
    "dog.jpg", "cat.jpg", "rabbit.jpg",
    "eagle.jpg", "tiger.jpg","alligator.jpg"
  ];

  startBtnElem.addEventListener("click", startGame);
  let answer;
  createGrid();
};

game();