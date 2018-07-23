jQuery(document).ready(function() {
  var date = new Date().getTime();
  var login_time = $.session.get('login_time');
  var username = $.session.get('username');
  var id = $.session.get('id');
  console.log(date - login_time);
  if (date - login_time <= 7200000) {
    $('#logname').html("<i class='icon-user'></i>" + username + " <b class='caret'></b>");
  } else {
    $.session.clear();
    $(window).attr('location', 'login.html');
  }
  $('#pw_change').click(function() {
    var password = $.session.get('password');
    var pre_pw = $('#pre_pw').val();
    var new_pw = $('#new_pw').val();
    var re_new_pw = $('#re_new_pw').val();
    if (pre_pw == '') {
      $.message({
        message: '请输入原密码',
        type: 'warning'
      });
    }
    if (new_pw == '' && pre_pw != '') {
      $.message({
        message: '请输入新密码',
        type: 'warning'
      });
    }
    if (re_new_pw == '' && new_pw != '' && pre_pw != '') {
      $.message({
        message: '请再次输入原密码',
        type: 'warning'
      });
    }
    if (pre_pw != password && re_new_pw != '' && new_pw != '' && pre_pw != '') {
      $.message({
        message: '原密码错误',
        type: 'error'
      });
    }
    if (new_pw != re_new_pw && pre_pw == password && re_new_pw != '' && new_pw != '' && pre_pw != '') {
      $.message({
        message: '两次新密码输入不一致',
        type: 'error'
      });
    }
    if (pre_pw == password && new_pw == re_new_pw) {
      $.ajax({
        type: "POST",
        url: "../backWeb/php/pw_change.php",
        data: {
          username: username,
          new_pw: new_pw
        },
        dataType: 'json',
        success: function(msg) {

        },
        complete: function(data) {
          //console.log(data.responseText);
          var jobj = JSON.parse(data.responseText);
          console.log(jobj);
          if (jobj.status == 0) {
            $('#pre_pw').val('');
            $('#new_pw').val('');
            $('#re_new_pw').val('');
            $.session.set('password', new_pw);
            $.message('修改成功');
          } else if (jobj.status == 1) {
            $.message({
              message: '修改失败',
              type: 'error'
            });
          }
        },
        fail: function(msg) {
          $.message({
            message: '修改失败',
            type: 'error'
          });
        }
      });
    }
  });
})
