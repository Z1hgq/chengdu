jQuery(document).ready(function() {
  var ue = UE.getEditor('editor');
  var con;
  var date = new Date().getTime();
  var login_time = $.session.get('login_time');
  console.log(date - login_time);
  if(date - login_time <= 7200000){
    var username = $.session.get('username');
    var password = $.session.get('password');
    var userid = $.session.get('id');
    $('#logname').html("<i class='icon-user'></i>"+username+" <b class='caret'></b>");
  }else{
    $.session.clear();
    $(window).attr('location','login.html');
  }
  $('#news_content_commit').click(function(){
    var pubTime = new Date().getTime();
    var arr = [];
    arr.push(UE.getEditor('editor').getContent());
    if(arr[0] != ''){
      $.ajax({
        type: "POST",
        url: "../backWeb/php/ac_up.php",
        data: {
          update_time:pubTime,
          ac_content:arr[0],
        },
        dataType:'json',
        success: function(msg){

        },
        complete:function(data){
          //console.log(data.responseText);
          var jobj = JSON.parse(data.responseText);
          console.log(jobj);
          if(jobj.status == 0){
            UE.getEditor('editor').setContent('');
            $.message('上传成功');
          }else if (jobj.status == 1) {
            $.message({
              message: '上传失败',
              type: 'error'
            });
          }
        },
        fail: function(msg){
          $.message({
            message: '上传失败',
            type: 'error'
          });
        }
      });
    }else {
      $.message({
        message: '请输入完整',
        type: 'warning'
      });
    }
  });
  //重置编辑器
  $('#news_content_reset').click(function(){
    UE.getEditor('editor').setContent('');
  });
})
function load(){
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
      UE.getEditor('editor').setContent(jobj[0].content);
    },
    fail: function(msg){
    }
  });
}
