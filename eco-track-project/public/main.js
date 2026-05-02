const form = document.querySelector("#form");
const submitButton = document.querySelector("#submit-button");
const resetButton = document.querySelector("#reset-button");
const resultElement = document.querySelector("#result");
const resultBar = document.querySelector("#result-bar");
const sections = document.querySelectorAll("section[id]");
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
  if (value === "" || isNaN(convertedValue)) {
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

    if (!response.ok) throw new Error("Network response was not ok");

    return await response.json();
  } catch (error) {
    window.alert("Error while sending data");
    return { success: false };
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

const activeLinkStyles = ["text-dark-green", "after:scale-x-100"];

const activeLink = (id) => {
  navbarLinks.forEach((link) => {
    const isMatch = link.getAttribute("href") === `/#${id}`;
    activeLinkStyles.forEach((cls) => link.classList.toggle(cls, isMatch));
  });
};

const navbarObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeLink(entry.target.id);
      }
    });
  },
  { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
);

const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("opacity-0");
        entry.target.classList.add("opacity-100");
        animationObserver.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
);

sections.forEach((section) => {
  navbarObserver.observe(section);
  animationObserver.observe(section);
});

navbarButton.addEventListener("click", (e) => {
  e.preventDefault();

  navbarListIcon.classList.toggle("hidden");
  navbarCloseIcon.classList.toggle("hidden");
  navbarList.classList.toggle("hidden");
});
