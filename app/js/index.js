$(document).ready(function() {
  /**
   * @desc AJAX.GET to overwrite submit of the searchform.
   *       passes search parameters to the server
   *       find all searched items and and passes them to the tableButton function
   * @return searchdata  or error
  **/
    $('#searchform').submit(function(e) {
        e.preventDefault();
        var that = this;

        $.ajax({
            // catch custom response code.
            statusCode: {
                500: function () {
                    console.error("Object not found");
                }
            },
            data: $(that).serialize(),
            type: 'GET',
            contentType: "application/json",
            // Dynamically create Request URL by appending requested name to /api prefix
            url: '/search',
            error: function (xhr, status, err) {
                console.log(err);
            },
            success: function (res) {
                tableButton(res)
            }
        });
    });
    /**
     * @desc AJAX.GET to overwrite submit of the choosebandform.
     *       passes BandIds and path to the directory to the server
     * @return path to layer or error
    **/
    $('#bandform').submit(function(e) {
        e.preventDefault();
        var that = this;
        if ($('#dir')[0].value === ""){
              alert("Choose a Dataset first!")
           } else {
        $.ajax({
            // catch custom response code.
            statusCode: {
                500: function () {
                    console.error("Object not found");
                }
            },
            data: $(that).serialize(),
            type: 'GET',
            contentType: "application/json",
            // Dynamically create Request URL by appending requested name to /api prefix
            url: '/chooseBands',
            error: function (xhr, status, err) {
                console.log(err);
            },
            success: function (res) {
                layertomap(res)
            }
        });
    }});
    /**
     * @desc AJAX.GET to overwrite submit of the brighness form.
     *       passes min and max colour values and path to the layer to the server
     * @return path to layer or error
    **/
    $('#manipulationForm').submit(function(e) {

        e.preventDefault();
        var that = this;
        if ($('#dir')[0].value === ""){
              alert("Add a Layer first!")
          } else {
        $.ajax({
            // catch custom response code.
            statusCode: {
                500: function () {
                    console.error("Object not found");
                }
            },
            data: $(that).serialize(),
            type: 'GET',
            contentType: "application/json",
            // Dynamically create Request URL by appending requested name to /api prefix
            url: '/brightness',
            error: function (xhr, status, err) {
                console.log(err);
            },
            success: function (res) {
                layertomap(res)
            }
        });
    }});

});

