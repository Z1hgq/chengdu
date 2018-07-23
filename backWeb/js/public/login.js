jQuery(document).ready(function() {
  $('#btn').click(function(){
    var name = $('#logname').val();
    var password = $('#logpass').val();
    if(name == ''){
      $.message({
        message: '请输入账号',
        type: 'warning'
      });
    }
    if(password == '' && name != ''){
      $.message({
        message: '请输入密码',
        type: 'warning'
      });
    }
    if(name != '' && password != ''){
      $.ajax({
        type: "POST",
        url: "../backWeb/php/login.php",
        data: {
          name:name,
          password:password
        },
        dataType:'json',
        success: function(msg){
        },
        complete:function(data){
          //console.log(data.responseText);
          var jobj = JSON.parse(data.responseText);
          console.log(jobj);
          if(jobj.status == 0){
            var mydate = new Date().getTime();
            console.log(mydate);
            $.session.set('username', jobj.name);
            $.session.set('password', jobj.password);
            $.session.set('id', jobj.id);
            $.session.set('login_time',mydate);
            $.message('登录成功');
            $(window).attr('location','src_mng.html');
          }else if (jobj.status == 1) {
            $.message({
              message: '登录失败',
              type: 'error'
            });
          }
        },
        fail: function(msg){
          $.message({
            message: '登录失败',
            type: 'error'
          });
        }
      });
    }
  });
})
