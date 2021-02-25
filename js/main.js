var app = new Vue({
    el: '#app',
    data: {
        startingZip:'',
        startingCity:'',
        endingZip:'',
        endingCity:''
    },
    watch:
    {
      // starting Zip
      startingZip: function(){
        this.startingCity = ''
        if(this.startingZip.length == 5)
        {
          this.lookupStartingZip()
        }
      },

      // Ending Zip
      endingZip: function(){
        this.endingCity = ''
        if(this.endingZip.length == 5)
        {
          this.lookupEndingZip()
        }
      }

    },
    methods:{
      // lodash method debounce for lookupStartingZip
      lookupStartingZip: _.debounce(function() {
        var app = this
          app.startingCity = 'Searching......'
          // make the API request
          axios.get('http://ziptasticapi.com/' + app.startingZip)
               .then(function(response){
                  app.startingCity = response.data.city + ', ' + response.data.state
               })
               .catch(function(error){
                 app.startingCity = 'Invalid ZipCode'
               })
      }, 500),

      // lodash method debounce for lookupEndingZip
      lookupEndingZip: _.debounce(function() {
        var app = this
          app.endingCity = 'Searching......'
          // make the API request
          axios.get('http://ziptasticapi.com/' + app.endingZip)
               .then(function(response){
                  app.endingCity = response.data.city + ', ' + response.data.state
               })
               .catch(function(error){
                 app.endingCity = 'Invalid ZipCode'
               })
      }, 500)

    }
})
