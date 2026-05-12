const Contact = require("../models/Contact");

function isValidEmail(email) {
  const s = String(email).trim();
  if (!s || /\s/.test(s)) return false;
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(
    s
  );
}

function validatePayload(body) {
  const errors = [];
  const { fullName, email, description } = body || {};

  if (fullName === undefined || String(fullName).trim() === "") {
    errors.push("fullName is required");
  }
  if (email === undefined || String(email).trim() === "") {
    errors.push("email is required");
  } else if (!isValidEmail(email)) {
    errors.push("email must be a valid address");
  }
  if (description === undefined || String(description).trim() === "") {
    errors.push("description is required");
  }

  return errors;
}

exports.createContact = async (req, res) => {
  try {
    const errors = validatePayload(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const { fullName, email, description } = req.body;

    const contact = await Contact.create({
      fullName: String(fullName).trim(),
      email: String(email).trim(),
      description: String(description).trim(),
    });

    return res.status(201).json({ success: true, data: contact });
  } catch (err) {
    console.error("createContact:", err.message);

    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors || {}).map((e) => e.message);
      return res.status(400).json({ success: false, errors });
    }

    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This email was already submitted recently.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? `Unable to save: ${err.message}`
          : "Unable to save contact submission",
    });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean().exec();

    return res.status(200).json(contacts);
  } catch (err) {
    console.error("getAllContacts:", err.message);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch contacts",
    });
  }
};
