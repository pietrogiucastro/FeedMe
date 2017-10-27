module.exports = function(Bookshelf) {
  return Bookshelf.Model.extend({
    tableName: 'categories',
    posts: function () {
       return this.hasMany(Post, 'category_id');
    }
  });
};