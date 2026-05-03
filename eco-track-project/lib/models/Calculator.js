import tipsData from "../data/tips.json" with { type: "json" };

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

    const totalEmission = vehicleEmission + acEmission + laptopEmission;

    return { vehicleEmission, acEmission, laptopEmission, totalEmission };
  }

  getTips(data) {
    const { vehicle, ac, laptop, total } = data;

    let category;
    let impact;
    let tips;
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
        impact = tipsData[category][index].impact;
        tips = tipsData[category][index].action;
      }
    });

    return { impact, tips };
  }
}
