'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema

var TackSchema = new Schema({
  title: String,
  url: String,
  description: String,
  date: Date,
  tacker: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Tack', TackSchema);
