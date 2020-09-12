/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const plugin = (schema) => {
  // eslint-disable-next-line func-names
  schema.methods.toClient = function () {
    const doc = this.toObject({ getters: true, virtuals: true });

    delete doc.__v;
    delete doc._id;

    return doc;
  };
};

module.exports = plugin;
