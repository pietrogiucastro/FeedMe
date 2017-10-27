module.exports = function(Bookshelf) {
	return Bookshelf.Model.extend({
    tableName: 'tags',
    posts: function () {
       return this.belongsToMany(Post);
    }
  });
};