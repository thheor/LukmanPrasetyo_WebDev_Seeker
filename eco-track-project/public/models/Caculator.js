export class Calculator {
  constructor() {
    this.form = document.querySelector("#form");
    this.submitButton = document.querySelector("#submit-button");
    this.resetButton = document.querySelector("#reset-button");
    this.resultElement = document.querySelector("#result");
    this.resultBar = document.querySelector("#result-bar");
    this.feedbackList = document.querySelector("#feedback");
    this.impactFeedback = document.querySelector("#impact");
    this.tipsFeedback = document.querySelector("#tips");
    this.catIcon = document.querySelector("#cat-icon");
  }

  displayErrors(errors) {
    this.resultBar.style.cssText = "width: 0%;";
    this.resultElement.innerHTML = "Invalid input";
    const keyErrors = Object.keys(errors);

    const inputs = this.form.elements;
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
  }

  clearErrors() {
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
  }

  async displaySuccess(response) {
    this.clearErrors();
    const totalEmisi = response.emisi_total;
    const feedback = response.feedback;

    if (totalEmisi >= 0 && totalEmisi <= 2) {
      this.resultBar.style.cssText = `background-color: #99ad7a; width: ${(totalEmisi / 15) * 100}%`;
    } else if (totalEmisi > 2 && totalEmisi <= 5) {
      this.resultBar.style.cssText = `background-color: #ffde42; width: ${(totalEmisi / 15) * 100}%`;
    } else if (totalEmisi > 5 && totalEmisi <= 15) {
      this.resultBar.style.cssText = `background-color: #cf0f0f; width: ${(totalEmisi / 15) * 100}%`;
    } else {
      this.resultBar.style.cssText = `background-color: #cf0f0f; width: 100%`;
    }

    this.resultElement.innerHTML = `${totalEmisi} kg CO₂`;

    this.feedbackList.classList.remove("hidden");
    this.impactFeedback.innerHTML = feedback.impact;
    this.tipsFeedback.innerHTML = feedback.tips;
    this.catIcon.classList.add("hidden");
  }

  resetInput = () => {
    this.clearErrors();
    this.feedbackList.classList.add("hidden");
    this.catIcon.classList.remove("hidden");
    this.resultElement.innerHTML = "Awaiting data...";
    this.resultBar.style.backgroundColor = "";
    this.resultBar.style.width = "";
  };
}
