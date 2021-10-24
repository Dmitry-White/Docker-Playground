const mongoose = require('mongoose');

const { Schema } = mongoose;

const exampleSchema = Schema({
  example: { type: String, required: true },
  description: { type: String, required: true },
});

const dockerCommandSchema = Schema({
  command: { type: String, required: true },
  description: { type: String, required: true },
  examples: [exampleSchema],
});

const DockerCommandModel = mongoose.model('dockerCommand', dockerCommandSchema);

module.exports = DockerCommandModel;
