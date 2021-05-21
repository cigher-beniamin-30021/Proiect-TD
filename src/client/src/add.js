function run() {
    new Vue({
      el: '#add',
      data: {
        id: '',
        message: '',
        house: {}
      },
      created: function () {

      },
      methods: {
       add: function(){
            console.dir(this.house);

            return axios.put('http://localhost:3000/houses', this.house).then(
                (response) => {
                    this.message = response.data; // saved
                }
            );


        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    run();
  });