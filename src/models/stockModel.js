import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      required: true,
      index: true
    },
    itemType: {
      type: String,
      enum: ['bran', 'husk', 'black rice', 'broken rice', 'others'],
      required: true,
      unique: true,
    },
    availableQuantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    unit: {
      type: String,
      default: 'Bags',
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index for clientId and itemType to ensure uniqueness per client
stockSchema.index({ clientId: 1, itemType: 1 }, { unique: true });

// Pre-save hook to update lastUpdated timestamp
stockSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
