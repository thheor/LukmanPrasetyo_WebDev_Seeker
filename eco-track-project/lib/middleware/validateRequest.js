export const validateRequest = () => {
  return (req, res, next) => {
    const data = req.body;
    const errors = {};

    const fields = [
      {
        key: "jarak",
        label: "distance",
      },
      {
        key: "durasi_ac",
        label: "AC duration",
        max: 24,
      },
      {
        key: "durasi_laptop",
        label: "laptop duration",
        max: 24,
      },
    ];

    fields.forEach(({ key, label, max }) => {
      const value = data[key];

      if (value === undefined || value === null) {
        errors[key] = `Enter a valid ${label}.`;
      } else if (!Number.isFinite(value)) {
        errors[key] = `${label} must be a number.`;
      } else if (value < 0) {
        errors[key] = `${label} must be a positive number.`;
      } else if (max && value > max) {
        errors[key] = `${label} should not be more than ${max}.`;
      }
    });

    const vehicleType = ["motor", "mobil"];
    if (!data.kendaraan) {
      errors.kendaraan = "Enter a valid vehicle type";
    } else if (!vehicleType.includes(data.kendaraan)) {
      errors.kendaraan = "Vehicle must be either a 'motor' or 'mobil'.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors,
      });
    }

    next();
  };
};
