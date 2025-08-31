const Commission = require('../models/Commission');
const Settings = require('../models/Settings');
const { sendCommissionConfirmation, sendCommissionNotification } = require('../config/email');

const calculatePrice = (numberOfPersons, size, ratePerPerson, sizeMultipliers) => {
  const sizeMultiplier = sizeMultipliers[size] || 1;
  return numberOfPersons * ratePerPerson * sizeMultiplier;
};

const createCommission = async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      size,
      medium,
      numberOfPersons,
      deadline,
      description,
      shippingAddress
    } = req.body;

    // Get current pricing settings
    const settings = await Settings.getInstance();
    const { ratePerPerson, sizeMultipliers } = settings;

    // Calculate total price
    const totalPrice = calculatePrice(numberOfPersons, size, ratePerPerson, sizeMultipliers);

    // Create commission
    const commission = new Commission({
      customerName,
      email,
      phone,
      size,
      medium,
      numberOfPersons,
      deadline: new Date(deadline),
      description,
      shippingAddress,
      totalPrice,
      ratePerPerson,
      sizeMultiplier: sizeMultipliers[size] || 1,
      referenceImages: req.uploadedImages || []
    });

    await commission.save();

    // Send emails
    try {
      await sendCommissionConfirmation(commission);
      
      const referenceImageUrls = commission.referenceImages.map(img => img.url);
      await sendCommissionNotification(commission, referenceImageUrls);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the commission creation if email fails
    }

    res.status(201).json({
      message: 'Commission request submitted successfully',
      commission: {
        id: commission._id,
        totalPrice: commission.totalPrice,
        status: commission.status
      }
    });
  } catch (error) {
    console.error('Create commission error:', error);
    res.status(500).json({ message: 'Server error creating commission' });
  }
};

const getAllCommissions = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, search } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const commissions = await Commission.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    const total = await Commission.countDocuments(query);

    res.json({
      commissions,
      pagination: {
        current: pageNum,
        pages: Math.ceil(total / limitNum),
        total,
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Get commissions error:', error);
    res.status(500).json({ message: 'Server error getting commissions' });
  }
};

const getCommissionById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const commission = await Commission.findById(id);
    if (!commission) {
      return res.status(404).json({ message: 'Commission not found' });
    }

    res.json(commission);
  } catch (error) {
    console.error('Get commission by ID error:', error);
    res.status(500).json({ message: 'Server error getting commission' });
  }
};

const updateCommission = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, internalNotes } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (internalNotes !== undefined) updateData.internalNotes = internalNotes;

    const commission = await Commission.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!commission) {
      return res.status(404).json({ message: 'Commission not found' });
    }

    res.json({
      message: 'Commission updated successfully',
      commission
    });
  } catch (error) {
    console.error('Update commission error:', error);
    res.status(500).json({ message: 'Server error updating commission' });
  }
};

const deleteCommission = async (req, res) => {
  try {
    const { id } = req.params;

    const commission = await Commission.findByIdAndDelete(id);
    if (!commission) {
      return res.status(404).json({ message: 'Commission not found' });
    }

    res.json({ message: 'Commission deleted successfully' });
  } catch (error) {
    console.error('Delete commission error:', error);
    res.status(500).json({ message: 'Server error deleting commission' });
  }
};

const getPriceCalculation = async (req, res) => {
  try {
    const { numberOfPersons, size } = req.query;

    if (!numberOfPersons || !size) {
      return res.status(400).json({ 
        message: 'numberOfPersons and size are required' 
      });
    }

    const settings = await Settings.getInstance();
    const { ratePerPerson, sizeMultipliers } = settings;

    const totalPrice = calculatePrice(
      parseInt(numberOfPersons), 
      size, 
      ratePerPerson, 
      sizeMultipliers
    );

    res.json({
      numberOfPersons: parseInt(numberOfPersons),
      size,
      ratePerPerson,
      sizeMultiplier: sizeMultipliers[size] || 1,
      totalPrice
    });
  } catch (error) {
    console.error('Price calculation error:', error);
    res.status(500).json({ message: 'Server error calculating price' });
  }
};

const getCommissionStats = async (req, res) => {
  try {
    const totalCommissions = await Commission.countDocuments();
    const statusStats = await Commission.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const revenueStats = await Commission.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } }
    ]);

    const mediumStats = await Commission.aggregate([
      { $group: { _id: '$medium', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const monthlyStats = await Commission.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          revenue: { $sum: '$totalPrice' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    res.json({
      totalCommissions,
      statusStats,
      totalRevenue: revenueStats[0]?.totalRevenue || 0,
      mediumStats,
      monthlyStats
    });
  } catch (error) {
    console.error('Get commission stats error:', error);
    res.status(500).json({ message: 'Server error getting commission stats' });
  }
};

module.exports = {
  createCommission,
  getAllCommissions,
  getCommissionById,
  updateCommission,
  deleteCommission,
  getPriceCalculation,
  getCommissionStats
};
