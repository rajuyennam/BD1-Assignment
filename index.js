const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
let taxRate = 5;
let discountPercentage = 10;
let loyalityRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartPrice = cartTotal + newItemPrice;
  res.send(totalCartPrice.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  let discontedPrice = cartTotal;
  if (isMember) {
    discontedPrice = cartTotal * ((100 - discountPercentage) / 100);
  }
  res.send(discontedPrice.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let totalDays;
  if (shippingMethod === 'standard') {
    totalDays = distance / 50;
  } else if (shippingMethod === 'express') {
    totalDays = distance / 100;
  } else {
    totalDays = 0;
  }
  res.send(totalDays.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = cartTotal * (taxRate / 100);
  res.send(tax.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let result = purchaseAmount * loyalityRate;
  res.send(result.toString());
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
