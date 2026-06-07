const mongoose = require('mongoose');

const SampleSchema = new mongoose.Schema({
  sampleId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Material', 'Product', 'Chemical', 'Other'],
  },
  status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'Inactive', 'In Review', 'Archived'],
  },
  quantity: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
    trim: true,
  },
  dateReceived: {
    type: Date,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
  },
  supplier: {
    type: String,
    trim: true,
  },
  batchNumber: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Sample', SampleSchema);