module.exports = function(Bookshelf) {
  return Bookshelf.Model.extend({
    tableName: 'posts',
    hasTimestamps: true,
    category: function () {
      return this.belongsTo(Category, 'category_id');
    },
    tags: function () {
        return this.belongsToMany(Tag);
    },
    author: function () {
        return this.belongsTo(User);
    }
  });
};