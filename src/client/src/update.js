function run() {
    new Vue({
      el: '#update',
      data: {
        id: '',
        message: '',
        house: {}
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");

        axios.get('http://localhost:3000/houses/'+this.id).then(
            (response) => {
                this.house = response.data;
            }
        );
      },
      methods: {
        update: function(){
            console.dir(this.house);

            return axios.post('http://localhost:3000/houses', this.house).then(
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