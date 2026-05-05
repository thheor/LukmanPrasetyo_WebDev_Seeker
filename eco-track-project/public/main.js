import { ApiService } from "./models/ApiService.js";
import { Calculator } from "./models/Caculator.js";
import { Observer } from "./models/Observer.js";

const navbar = document.querySelector("#navbar");
const navbarButton = document.querySelector("#navbar-button");
const navbarList = document.querySelector("#navbar-list");

const currentPath = window.location.pathname;
const BASE_URL = "http://localhost:3000";
const apiService = new ApiService(BASE_URL);
const calculator = new Calculator();
const observer = new Observer();

const debouncing = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

let lastScrollTop = 0;
window.addEventListener(
  "scroll",
  () => {
    let st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > lastScrollTop) {
      navbar.classList.add("opacity-20");
    } else {
      navbar.classList.remove("opacity-20");
    }
    lastScrollTop = st <= 0 ? 0 : st;
  },
  false,
);

navbarButton.addEventListener("click", (e) => {
  e.preventDefault();

  navbarList.classList.toggle("hidden");
});

const displayResult = async (e) => {
  e.preventDefault();
  const formData = new FormData(calculator.form);

  const data = {
    jarak: formData.get("jarak"),
    kendaraan: formData.get("kendaraan"),
    durasi_ac: formData.get("durasi_ac"),
    durasi_laptop: formData.get("durasi_laptop"),
  };

  const response = await apiService.calculate(data);
  calculator.clearErrors();

  if (response.success) {
    calculator.displaySuccess(response);
  } else {
    calculator.displayErrors(response.errors);
  }
};

const handleFormInput = debouncing(displayResult, 300);

if (currentPath.includes("/calculator")) {
  calculator.submitButton.addEventListener("click", async (e) => {
    displayResult(e);

    calculator.form.addEventListener("input", handleFormInput);
  });
  calculator.resetButton.addEventListener("click", () => {
    calculator.resetInput();
    calculator.form.removeEventListener("input", handleFormInput);
  });
}

observer.navbarEffects();
observer.scrollEffects();
