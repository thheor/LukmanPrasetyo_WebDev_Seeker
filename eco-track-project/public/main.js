const form = document.querySelector("#form");
const submitButton = document.querySelector("#submit-button");
const resetButton = document.querySelector("#reset-button");
const resultElement = document.querySelector("#result");
const resultBar = document.querySelector("#result-bar");
const navbarButton = document.querySelector("#navbar-button");
const navbarList = document.querySelector("#navbar-list");
const navbarListIcon = document.querySelector("#navbar-list-icon");
const navbarCloseIcon = document.querySelector("#navbar-close-icon");
const navbarLinks = document.querySelectorAll(".nav-link");
const impactFeedback = document.querySelector("#impact");
const tipsFeedback = document.querySelector("#tips");
const feedbackList = document.querySelector("#feedback");
const catIcon = document.querySelector("#cat-icon");

const currentPath = window.location.pathname;

const debouncing = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const strictParse = (value) => {
  const convertedValue = Number(value);
  if (typeof convertedValue !== "number" || value === "") {
    return null;
  }

  return convertedValue;
};

const displayErrors = (errors) => {
  resultBar.style.cssText = "width: 0%;";
  resultElement.innerHTML = "Invalid input";
  const keyErrors = Object.keys(errors);

  const inputs = form.elements;
  for (const error of keyErrors) {
    const htmlElement = document.querySelector(`#${error}-error`);

    htmlElement.classList.remove("hidden");
    htmlElement.innerHTML = errors[error];
    if (inputs[error].length) {
      const radioLabels = document.querySelectorAll(".radio-label");
      radioLabels[0].classList.add("border-red-500");
      radioLabels[1].classList.add("border-red-500");
      continue;
    }
    inputs[error].classList.add("border-red-500");
  }
};

const clearErrors = () => {
  const inputFields = ["jarak", "kendaraan", "durasi_ac", "durasi_laptop"];
  const inputs = form.elements;

  for (const field of inputFields) {
    const element = document.querySelector(`#${field}-error`);
    element.classList.add("hidden");

    if (!inputs[field].length) {
      inputs[field].classList.remove("border-red-500");
    }
  }

  const radioLabels = document.querySelectorAll(".radio-label");
  radioLabels[0].classList.remove("border-red-500");
  radioLabels[1].classList.remove("border-red-500");
};

const displayResult = async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const data = {
    jarak: strictParse(formData.get("jarak")),
    kendaraan: formData.get("kendaraan"),
    durasi_ac: strictParse(formData.get("durasi_ac")),
    durasi_laptop: strictParse(formData.get("durasi_laptop")),
  };

  const response = await postData(data);
  clearErrors();

  if (response.success) {
    const totalEmisi = response.emisi_total;
    const feedback = response.feedback;

    if (totalEmisi >= 0 && totalEmisi <= 2) {
      resultBar.style.cssText = `background-color: #99ad7a; width: ${(totalEmisi / 15) * 100}%`;
    } else if (totalEmisi > 2 && totalEmisi <= 5) {
      resultBar.style.cssText = `background-color: #ffde42; width: ${(totalEmisi / 15) * 100}%`;
    } else if (totalEmisi > 5 && totalEmisi <= 15) {
      resultBar.style.cssText = `background-color: #cf0f0f; width: ${(totalEmisi / 15) * 100}%`;
    } else {
      resultBar.style.cssText = `background-color: #cf0f0f; width: 100%`;
    }

    resultElement.innerHTML = `${totalEmisi} kg CO₂`;
    resultElement.style.cssText = `font-weight: 700`;

    feedbackList.classList.remove("hidden");
    impactFeedback.innerHTML = feedback.impact;
    tipsFeedback.innerHTML = feedback.tips;
    catIcon.classList.add("hidden");
  } else {
    const errorFields = response.errors;
    catIcon.classList.remove("hidden");
    feedbackList.classList.add("hidden");

    displayErrors(errorFields);
  }
};

const resetInput = () => {
  clearErrors();
  feedbackList.classList.add("hidden");
  catIcon.classList.remove("hidden");
  resultElement.innerHTML = "Awaiting data...";
  resultBar.style.backgroundColor = "";
  resultBar.style.width = "";
};

const postData = async (data) => {
  try {
    const response = await fetch("http://localhost:3000/carbon/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jarak: data.jarak,
        kendaraan: data.kendaraan,
        durasi_ac: data.durasi_ac,
        durasi_laptop: data.durasi_laptop,
      }),
    });

    return response.json();
  } catch (error) {
    window.alert("Error while sending data");
  }
};

const handleFormInput = debouncing(displayResult, 300);

if (currentPath.includes("/calculator")) {
  submitButton.addEventListener("click", (e) => {
    displayResult(e);

    form.addEventListener("input", handleFormInput);
  });
  resetButton.addEventListener("click", () => {
    resetInput();
    form.removeEventListener("input", handleFormInput);
  });
}

navbarButton.addEventListener("click", (e) => {
  e.preventDefault();

  navbarListIcon.classList.toggle("hidden");
  navbarCloseIcon.classList.toggle("hidden");
  navbarList.classList.toggle("hidden");
});

navbarLinks.forEach((item) => {
  item.addEventListener("click", () => {
    const history = "/" + window.location.hash;
    window.location.hash = item.getAttribute("href");
    const currentHash = window.location.hash.replace("#", "");

    navbarLinks.forEach((navlink) => {
      if (navlink.getAttribute("href") === history) {
        navlink.classList.remove(
          "after:scale-x-100",
          "text-dark-green",
          "after:border-dark-green",
        );
      }
    });

    if (item.getAttribute("href") === currentHash) {
      item.classList.add(
        "after:scale-x-100",
        "text-dark-green",
        "after:border-dark-green",
      );
    }
  });
});
