const slider = document.getElementById("length-slider");
const lengthDisplay = document.querySelector(".length__display");
const copyBtn = document.querySelector(".password-display__icon");

slider.addEventListener("input", (e) => {
  lengthDisplay.textContent = e.target.value;

  const min = slider.min;
  const max = slider.max;
  const val = slider.value;

  const percentage = ((val - min) / (max - min)) * 100;
  slider.style.background = `linear-gradient(to right, #A4FFAF ${percentage}%, #18171F ${percentage}%)`;
});

const charSets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  number: "0123456789",
  symbol: "!@#$%^&*()",
};

const generateBtn = document.querySelector(".button");
const passwordDisplay = document.querySelector(".password-display__text");
const checkboxes = document.querySelectorAll(".generator__checkbox");

generateBtn.addEventListener("click", () => {
  let availableChars = "";
  let generatedPassword = "";
  let checkedCount = 0;
  const length = parseInt(slider.value);

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      availableChars += charSets[checkbox.id];
      checkedCount++;
    }
  });

  if (availableChars === "" || length === 0) {
    passwordDisplay.textContent = "Select Options";
    return;
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    generatedPassword += availableChars[randomIndex];
  }

  passwordDisplay.textContent = generatedPassword;
  passwordDisplay.style.color = "#fff";

  updateStrength(length, checkedCount);
});

function updateStrength(length, count) {
  const strengthText = document.querySelector(".strength__text");
  const bars = document.querySelectorAll(".strength__bar");

  let score = 0;

  if (length >= 12) {
    score += 3;
  } else if (length >= 8) {
    score += 2;
  } else if (length >= 0) {
    score += 1;
  }

  score += count;

  let level = 0;
  let text = "";
  let color = "";

  if (score <= 3 || length < 6) {
    level = 1;
    text = "Too Weak";
    color = "#F64A4A";
  } else if (score <= 4) {
    level = 2;
    text = "Weak";
    color = "#FB7C58";
  } else if (score <= 5) {
    level = 3;
    text = "Medium";
    color = "#F8CD65";
  } else {
    level = 4;
    text = "Strong";
    color = "#A4FFAF";
  }

  bars.forEach((bar) => {
    bar.style.backgroundColor = "transparent";
    bar.style.borderColor = "#E6E5EA";
  });

  for (let i = 0; i < level; i++) {
    bars[i].style.backgroundColor = color;
    bars[i].style.borderColor = color;
  }
  strengthText.textContent = text;
  strengthText.style.display = "block";
}

copyBtn.addEventListener("click", () => {
  const password = passwordDisplay.textContent;
  const copyMessage = document.querySelector(".copy-message");

  if (password === "" || password === "Select Options") {
    return;
  }

  navigator.clipboard.writeText(password).then(() => {
    copyMessage.classList.add("active");
    setTimeout(() => {
      copyMessage.classList.remove("active");
    }, 2000);
  });
});
