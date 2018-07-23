jQuery(document).ready(function() {
  var date = new Date().getTime();
  var login_time = $.session.get('login_time');
  console.log(date - login_time);
  if (date - login_time <= 7200000) {
    var username = $.session.get('username');
    var password = $.session.get('password');
    var userid = $.session.get('id');
    $('#logname').html("<i class='icon-user'></i>" + username + " <b class='caret'></b>");
  } else {
    $.session.clear();
    $(window).attr('location', 'login.html');
  }
  var ue = UE.getEditor('editor');
  //上传新闻
  $('#news_content_commit').click(function() {
    var pubTime = new Date().getTime();
    var arr = [];
    arr.push(UE.getEditor('editor').getContent());
    //console.log(arr[0]);
    var news_title = $('#news_title').val();
    //console.log(news_title);
    var news_key = $('#news_key').val();
    //console.log(news_key);
    if (arr[0] != '' && news_key != '' && news_title != '') {
      $.ajax({
        type: "POST",
        url: "../backWeb/php/news_pub.php",
        data: {
          pubTime: pubTime,
          userid: userid,
          username: username,
          news_title: news_title,
          news_key: news_key,
          news_content: arr[0]
        },
        dataType: 'json',
        success: function(msg) {

        },
        complete: function(data) {
          //console.log(data.responseText);
          var jobj = JSON.parse(data.responseText);
          console.log(jobj);
          if (jobj.status == 0) {
            UE.getEditor('editor').setContent('');
            $('#news_title').val('');
            $('#news_key').val('');
            $.message('上传成功');
          } else if (jobj.status == 1) {
            $.message({
              message: '上传失败',
              type: 'error'
            });
          }
        },
        fail: function(msg) {
          $.message({
            message: '上传失败',
            type: 'error'
          });
        }
      });
    } else {
      $.message({
        message: '请输入完整',
        type: 'warning'
      });
    }
  });
  //重置编辑器
  $('#news_content_reset').click(function() {
    UE.getEditor('editor').setContent('');
  });
  //重置标题
  $('#news_title_reset').click(function() {
    $('#news_title').val('');
  });
  //重置key_word
  $('#news_key_reset').click(function() {
    $('#news_key').val('');
  });
});
