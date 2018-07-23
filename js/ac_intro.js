jQuery(document).ready(function() {
  $.ajax({
    type: "POST",
    url: "../backWeb/php/ac_down.php",
    data: {
    },
    dataType:'json',
    success: function(msg){
    },
    complete:function(data){
      //console.log(data.responseText);
      var jobj = JSON.parse(data.responseText);
      console.log(jobj);
      $('#ac_intro').html(jobj[0].content);
    },
    fail: function(msg){
    }
  });

})
