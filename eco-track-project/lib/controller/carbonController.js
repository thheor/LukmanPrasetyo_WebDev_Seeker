import data from "../data/tips.json" with { type: "json" };

export const result = async (req, res) => {
  const { jarak, kendaraan, durasi_ac, durasi_laptop } = req.body;

  const { vehicleEmission, acEmission, laptopEmission, totalEmission } =
    getEmission({
      jarak: jarak,
      kendaraan: kendaraan,
      durasi_ac: durasi_ac,
      durasi_laptop: durasi_laptop,
    });

  const { impact, tips } = getTips({
    vehicle: vehicleEmission,
    ac: acEmission,
    laptop: laptopEmission,
    total: totalEmission,
  });

  res.status(200).json({
    success: true,
    emisi_total: totalEmission,
    breakdown: {
      kendaraan: vehicleEmission,
      ac: acEmission,
      laptop: laptopEmission,
    },
    feedback: {
      impact: impact,
      tips: tips,
    },
  });
};

const getEmission = ({ jarak, kendaraan, durasi_ac, durasi_laptop }) => {
  const emissionFactors = {
    motor: 0.1,
    mobil: 0.2,
    ac: 0.5,
    laptop: 0.05,
  };

  const vehicleEmission = jarak * emissionFactors[kendaraan] || 0;
  const acEmission = durasi_ac * emissionFactors["ac"];
  const laptopEmission = durasi_laptop * emissionFactors["laptop"];

  const totalEmission = vehicleEmission + acEmission + laptopEmission;

  return { vehicleEmission, acEmission, laptopEmission, totalEmission };
};

const getTips = ({ vehicle, ac, laptop, total }) => {
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
      impact = data[category][index].impact;
      tips = data[category][index].action;
    }
  });

  return { impact, tips };
};
