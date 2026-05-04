import context from "../data/context.json" with { type: "json" };

export class Calculator {
  static EMISSION_FACTORS = {
    motor: 0.1,
    mobil: 0.2,
    ac: 0.5,
    laptop: 0.05,
  };

  getEmission(data) {
    const { jarak, kendaraan, durasi_ac, durasi_laptop } = data;

    const vehicleEmission = jarak * Calculator.EMISSION_FACTORS[kendaraan] || 0;
    const acEmission = durasi_ac * Calculator.EMISSION_FACTORS["ac"];
    const laptopEmission =
      durasi_laptop * Calculator.EMISSION_FACTORS["laptop"];

    const totalEmission = Number(
      (vehicleEmission + acEmission + laptopEmission).toFixed(2),
    );

    return { vehicleEmission, acEmission, laptopEmission, totalEmission };
  }

  getFeedback(data) {
    const { vehicle, ac, laptop, total } = data;

    let category;
    const feedback = {};
    const tips = [];
    const emissions = [vehicle, ac, laptop];

    if (total > 0 && total <= 2) {
      category = "safe";
    } else if (total > 2 && total <= 5) {
      category = "warning";
    } else {
      category = "danger";
    }

    const highestValue = Math.max(...emissions);

    emissions.forEach((value, index) => {
      if (highestValue === value) {
        feedback.impact = context[category][index].impact;
      }
      tips.push(context[category][index].action);
    });
    feedback.tips = tips;

    return feedback;
  }
}
