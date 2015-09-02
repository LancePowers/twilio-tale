function getImageTag(url){
  api.alchemy.imageKeywords(url, {}, function(err, response) {
    if (err) throw err;
    var imageKeywords = response.imageKeywords;
    console.log(imageKeywords);
  });
};

module.exports{
    getImageTag: getImageTag,
}
