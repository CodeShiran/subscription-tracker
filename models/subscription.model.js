import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "subscription price is required"],
      min: [0, "price must greater than 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "other",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      validate: {
        validator: (value) => value <= new Date(),
        message: "start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "renewal date must be after start date",
      },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
  },
  { timestamps: true }
);

//auto calculate renewal date is missing
subscriptionSchema.pre('save', function(next) {
  if (!this.renewalDate) {
      const renewalPeriods = {
          daily: 1,
          weekly: 7,
          monthly: 30,
          yearly: 365,
      };

      if (this.startDate && renewalPeriods[this.frequency]) {
          this.renewalDate = new Date(this.startDate);
          this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
      }
  }

  if (this.renewalDate && this.renewalDate < new Date()) {
      this.status = 'expired';
  }

  next();
});


const Subscription = mongoose.model('subscription', subscriptionSchema)

export default Subscription
