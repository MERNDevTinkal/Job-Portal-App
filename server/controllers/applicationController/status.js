import ApplicationModel from "../../models/applicationModel.js";

export const updatejobStatus = async (req, res) => {
  try {
    const { applicationID } = req.params;
    const { status } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status." });
    }

    const updated = await ApplicationModel.findByIdAndUpdate(
      applicationID,

      { $set: { status } },
      { new: true }
    )
      .populate("job", "title")
      .populate("applicant", "name email");

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found." });
    }

    res.status(200).json({
      success: true,
      message: "Application status updated.",
      application: updated,
    });
  } catch (error) {
    console.error("Status update error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update status." });
  }
};
