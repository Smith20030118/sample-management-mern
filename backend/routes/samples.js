const express = require('express');
const router = express.Router();
const Sample = require('../models/Sample');
const { validationResult, body } = require('express-validator');

// Get all samples
router.get('/', async (req, res) => {
  try {
    const samples = await Sample.find().populate('createdBy', 'name email');
    res.json(samples);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get sample by ID
router.get('/:id', async (req, res) => {
  try {
    const sample = await Sample.findById(req.params.id).populate('createdBy', 'name email');
    if (!sample) return res.status(404).json({ error: 'Sample not found' });
    res.json(sample);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create sample
router.post('/', [
  body('sampleId').notEmpty().trim(),
  body('name').notEmpty().trim(),
  body('category').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const newSample = new Sample(req.body);
    const saved = await newSample.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update sample
router.put('/:id', async (req, res) => {
  try {
    const sample = await Sample.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!sample) return res.status(404).json({ error: 'Sample not found' });
    res.json(sample);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete sample
router.delete('/:id', async (req, res) => {
  try {
    const sample = await Sample.findByIdAndDelete(req.params.id);
    if (!sample) return res.status(404).json({ error: 'Sample not found' });
    res.json({ message: 'Sample deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search samples
router.get('/search/query', async (req, res) => {
  try {
    const { q } = req.query;
    const samples = await Sample.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { sampleId: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ]
    });
    res.json(samples);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;