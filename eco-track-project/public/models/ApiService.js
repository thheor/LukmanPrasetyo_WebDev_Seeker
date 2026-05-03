export class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async calculate(data) {
    try {
      const response = await fetch(`${this.baseUrl}/carbon/calculate`, {
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

      return await response.json();
    } catch (error) {
      window.alert("Error while sending data");
      return { success: false, message: "Server connection failed." };
    }
  }
}
