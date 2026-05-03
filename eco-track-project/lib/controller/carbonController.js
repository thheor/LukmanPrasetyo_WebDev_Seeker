import { Calculator } from "../models/Calculator.js";

export const result = async (req, res) => {
  const data = req.body;
  const calculator = new Calculator();

  const { vehicleEmission, acEmission, laptopEmission, totalEmission } =
    calculator.getEmission(data);

  const { impact, tips } = calculator.getTips({
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
