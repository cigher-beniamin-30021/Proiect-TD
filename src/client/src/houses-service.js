function houses() {
  get = function () {
    return axios.get('http://localhost:3000/houses');
  };

  remove = function (index) {
    return axios.delete('http://localhost:3000/houses/'+index);
  };

  return {
    get: get,
    remove: remove
  };
}