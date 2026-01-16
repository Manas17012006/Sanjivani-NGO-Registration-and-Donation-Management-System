const { Parser } = require("json2csv");
const userModel = require("../models/userModel.model");

async function exportUser(req, res) {
  try {
    const userData = await userModel.find({});

    const users = userData.map(u => ({
      Name: u.name,
      Email: u.email,
      RegisteredAt: u.createdAt
    }));

    const fields = ["Name", "Email", "RegisteredAt"];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(users);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=userData.csv"
    );

    res.status(200).send(csv);

  } catch (err) {
    res.send({
      success: false,
      message: err.message
    });
  }
}

module.exports = { exportUser };
