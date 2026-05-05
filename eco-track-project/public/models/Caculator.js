export class Calculator {
  constructor() {
    this.form = document.querySelector("#form");
    this.submitButton = document.querySelector("#submit-button");
    this.resetButton = document.querySelector("#reset-button");
    this.resultElement = document.querySelector("#result");
    this.resultHeader = document.querySelector("#result-header");
    this.resultContainer = document.querySelector("#result-container");
    this.impactLevel = document.querySelector("#impact-level");
    this.breakdownContainer = document.querySelector("#breakdown-container");
    this.resultVehicleBar = document.querySelector("#result-vehicle-bar");
    this.resultAcBar = document.querySelector("#result-ac-bar");
    this.resultLaptopBar = document.querySelector("#result-laptop-bar");
    this.vehicleEmission = document.querySelector("#vehicle-emission");
    this.acEmission = document.querySelector("#ac-emission");
    this.laptopEmission = document.querySelector("#laptop-emission");
    this.tipsFeedback = document.querySelector("#tips");
    this.catIcon = document.querySelector("#cat-icon");
    this.impact = document.querySelector("#impact");
  }

  displayErrors(errors) {
    this.resultContainer.classList.add("hidden");
    this.catIcon.classList.remove("hidden");
    this.resultHeader.textContent =
      "Enter your details and click calculate to see your carbon footprint results.";
    this.resultHeader.classList.remove("sm:text-3xl", "text-xl", "font-medium");
    this.breakdownContainer.classList.add("hidden");
    const keyErrors = Object.keys(errors);

    const inputs = this.form.elements;
    for (const error of keyErrors) {
      const htmlElement = document.querySelector(`#${error}-error`);

      htmlElement.classList.remove("hidden");
      htmlElement.innerHTML = errors[error];
      if (inputs[error].length) {
        const radioLabels = document.querySelectorAll(".radio-label");
        radioLabels[0].classList.add("border-scarlet");
        radioLabels[1].classList.add("border-scarlet");
        continue;
      }
      inputs[error].classList.add("border-scarlet");
    }
  }

  clearErrors() {
    const inputFields = ["jarak", "kendaraan", "durasi_ac", "durasi_laptop"];
    const inputs = form.elements;

    for (const field of inputFields) {
      const element = document.querySelector(`#${field}-error`);
      element.classList.add("hidden");

      if (!inputs[field].length) {
        inputs[field].classList.remove("border-scarlet");
      }
    }

    const radioLabels = document.querySelectorAll(".radio-label");
    radioLabels[0].classList.remove("border-scarlet");
    radioLabels[1].classList.remove("border-scarlet");

    this.tipsFeedback.classList.add("hidden");
  }

  async displaySuccess(response) {
    this.tipsFeedback.textContent = "";
    this.clearErrors();
    const totalEmisi = response.emisi_total;
    this.resultContainer.classList.remove("hidden");
    this.catIcon.classList.add("hidden");
    this.breakdownContainer.classList.remove("hidden");

    if (totalEmisi >= 0 && totalEmisi <= 2) {
      this.impactLevel.innerHTML = "Impact Level: Low";
      this.impactLevel.style.cssText = `background-color: #99ad7a40; color: #546b41;`;
    } else if (totalEmisi > 2 && totalEmisi <= 5) {
      this.impactLevel.innerHTML = "Impact Level: Medium";
      this.impactLevel.style.cssText = `background-color: #ffde4240; color: #ffde42;`;
    } else if (totalEmisi > 5 && totalEmisi <= 15) {
      this.impactLevel.innerHTML = "Impact Level: High";
      this.impactLevel.style.cssText = `background-color: #cf0f0f40; color: #cf0f0f;`;
    } else {
      this.impactLevel.innerHTML = "Impact Level: Very High";
      this.impactLevel.style.cssText = `background-color: #cf0f0f40; color: #cf0f0f;`;
    }

    this.resultElement.innerHTML = `${totalEmisi}`;
    this.resultHeader.innerHTML = "Your Carbon Footprint";
    this.resultHeader.classList.remove("text-lg", "font-normal");
    this.resultHeader.classList.add("sm:text-3xl", "text-xl", "font-medium");

    this.catIcon.classList.add("hidden");

    this.breakdownContainer.classList.remove("hidden");
    this.resultVehicleBar.style.cssText = `width: ${(response.breakdown.kendaraan / response.emisi_total) * 100}%;`;
    this.resultAcBar.style.cssText = `width: ${(response.breakdown.ac / response.emisi_total) * 100}%;`;
    this.resultLaptopBar.style.cssText = `width: ${(response.breakdown.laptop / response.emisi_total) * 100}%;`;
    this.vehicleEmission.innerHTML = `${Number(response.breakdown.kendaraan).toFixed(2)} kg CO₂`;
    this.acEmission.innerHTML = `${Number(response.breakdown.ac).toFixed(2)} kg CO₂`;
    this.laptopEmission.innerHTML = `${Number(response.breakdown.laptop).toFixed(2)} kg CO₂`;

    this.impact.innerHTML = `${response.feedback.impact}`;

    this.displayTips(response);
  }

  resetInput() {
    this.clearErrors();
    this.catIcon.classList.remove("hidden");

    this.resultHeader.classList.remove("sm:text-3xl", "text-xl", "font-medium");
    this.resultHeader.textContent =
      "Enter your details and click calculate to see your carbon footprint results.";
    this.resultContainer.classList.add("hidden");
    this.breakdownContainer.classList.add("hidden");
  }

  displayTips(response) {
    this.tipsFeedback.classList.remove("hidden");

    const totalTips = response.feedback.tips;

    totalTips.forEach((element) => {
      const tips = document.createElement("li");
      const icon = document.createElement("span");
      icon.classList.add("w-15", "h-15");
      icon.textContent = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff8ec" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>`;
      tips.appendChild(icon);
      tips.classList.add("text-base", "text-cream");
      tips.textContent = `${element}`;

      this.tipsFeedback.appendChild(tips);
    });
  }
}
