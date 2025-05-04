import Vehicle from "@/models/Vehicle";
import BasicInfo from "@/models/BasicInfo";
import dbConnect from "@/lib/dbConnect";
import MaintenanceModel from "@/models/Maintenance";
import LocationStatusModel from "@/models/LocationStatus";

import vehiclesData from "../data/vehicles.json";
import basicInfoData from "../data/basic_info.json";
import maintenanceData from "../data/maintenance_history.json";
import locationStatusData from "../data/location_status.json";

async function saveJsonToDb() {
  await dbConnect();

  try {
    await Vehicle.insertMany(vehiclesData, { ordered: false });
    console.log("Vehicles saved successfully!");

    await BasicInfo.insertMany(basicInfoData, { ordered: false });
    console.log("Basic info saved successfully!");

    await MaintenanceModel.insertMany(maintenanceData, { ordered: false });
    console.log("Maintenance data saved successfully!");

    await LocationStatusModel.insertMany(locationStatusData, {
      ordered: false,
    });
    console.log("Location status data saved successfully!");
  } catch (error) {
    console.error("Error saving data to the database:", error);
  }
}

export default saveJsonToDb;
