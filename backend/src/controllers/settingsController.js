const Settings = require('../models/Settings');

const getSettings = async (req, res) => {
  try {
    const settings = await Settings.getInstance();
    res.json(settings);
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ message: 'Server error getting settings' });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { ratePerPerson, sizeMultipliers, contactEmail, businessName } = req.body;
    
    const settings = await Settings.getInstance();
    
    if (ratePerPerson !== undefined) settings.ratePerPerson = ratePerPerson;
    if (sizeMultipliers) {
      if (sizeMultipliers.S !== undefined) settings.sizeMultipliers.S = sizeMultipliers.S;
      if (sizeMultipliers.M !== undefined) settings.sizeMultipliers.M = sizeMultipliers.M;
      if (sizeMultipliers.L !== undefined) settings.sizeMultipliers.L = sizeMultipliers.L;
    }
    if (contactEmail !== undefined) settings.contactEmail = contactEmail;
    if (businessName !== undefined) settings.businessName = businessName;
    
    await settings.save();
    
    res.json({
      message: 'Settings updated successfully',
      settings
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ message: 'Server error updating settings' });
  }
};

const getPublicSettings = async (req, res) => {
  try {
    const settings = await Settings.getInstance();
    
    // Only return public settings
    res.json({
      ratePerPerson: settings.ratePerPerson,
      sizeMultipliers: settings.sizeMultipliers,
      businessName: settings.businessName
    });
  } catch (error) {
    console.error('Get public settings error:', error);
    res.status(500).json({ message: 'Server error getting public settings' });
  }
};

module.exports = {
  getSettings,
  updateSettings,
  getPublicSettings
};
