function run() {
  let indexComponent = new Vue({
    el: '#app',
    data: {
      houses: [],
      housesService: null,
      message: ''
    },
    created: function () {
      this.housesService = houses();
      console.log(this.housesService.get);
      this.housesService.get().then(response => (this.houses = response.data));
      console.log(this.houses);
    },
    methods: {
      deleteHouse: function(id) {
        console.log('HTTP DELETE spre backend, house: '+id);
        this.housesService.remove(id).then(response => {
          this.housesService.get().then(response => (this.houses = response.data));
        });
      },
    }
  });

  //indexComponent.use(VueMaterial);

}

document.addEventListener('DOMContentLoaded', () => {
  run();
});
