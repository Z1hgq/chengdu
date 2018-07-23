jQuery(document).ready(function() {
  var ue = UE.getEditor('editor');
  var date = new Date().getTime();
  var login_time = $.session.get('login_time');
  console.log(date - login_time);
  var username = $.session.get('username');
  var password = $.session.get('password');
  var id = $.session.get('id');
  var edite_id;
  if (date - login_time <= 7200000) {
    $('#logname').html("<i class='icon-user'></i>" + username + " <b class='caret'></b>");
  } else {
    $.session.clear();
    $(window).attr('location', 'login.html');
  }
  var page = 1;
  var res = [];
  getContent(page, res);
  $('#pre_btn').click(function() {
    if (page == 1) {
      $.message({
        message: '已经是第一页了',
        type: 'info'
      });
    }
    if (page > 1) {
      page = page - 1;
      res = [];
      getContent(page, res);
      $('#page').html(page);
    }
  });
  $('#next_btn').click(function() {
    if (res.length < 10) {
      $.message({
        message: '已经是第一页了',
        type: 'info'
      });
    }
    if (res.length >= 10) {
      page = page + 1;
      res = [];
      getContent(page, res);
      $('#page').html(page);
    }
  });
  $('#go_btn').click(function() {
    if($('#page_in').val() == ''){
      $.message({
        message: '请输入页数',
        type: 'warning'
      });
    }else{
      var pre_page = page;
      page = parseInt($('#page_in').val());
      res = [];
      getContent(page, res);
      if(res.length == 0){
        $.message({
          message: '当前页无效',
          type: 'warning'
        });
      }
      $('#page').html(page);
      $('#page_in').val('');
    }
  });
  $('#con').click(function(e) {
    var obj = e.srcElement || e.target;
    console.log(obj.id);
    var arr1 = ['news_del_btn0', 'news_del_btn1', 'news_del_btn2', 'news_del_btn3', 'news_del_btn4', 'news_del_btn5', 'news_del_btn6', 'news_del_btn7', 'news_del_btn8', 'news_del_btn9'];
    var arr2 = ['news_change_btn0', 'news_change_btn1', 'news_change_btn2', 'news_change_btn3', 'news_change_btn4', 'news_change_btn5', 'news_change_btn6', 'news_change_btn7', 'news_change_btn8', 'news_change_btn9'];
    var arr3 = ['news0', 'news1', 'news2', 'news3', 'news4', 'news5', 'news6', 'news7', 'news8', 'news9'];
    var index1 = $.inArray(obj.id, arr1);
    var index2 = $.inArray(obj.id, arr2);
    var index3 = $.inArray(obj.id, arr3);
    if (index1 >= 0) {
      //console.log(index1);
      var ar_id = res[index1].article_ID;
      del(ar_id, page, res);
    }
    if (index2 >= 0) {
      $('#con').hide();
      $('#btnArea').hide();
      $('#news_edite').show();
      $('#news_editer').show();
      $('#news_title').val(res[index2].article_title);
      $('#news_key').val(res[index2].keyword);
      UE.getEditor('editor').setContent(res[index2].content);
      edite_id = res[index2].article_ID;
    }
    if (index3 >= 0) {
      $('#con').hide();
      $('#btnArea').hide();
      $('#news_nav').show();
      $('#contentMain').show();
      //console.log(res[index3]);
      $('#contentTitle').html(res[index3].article_title);
      $('#contentText').html(res[index3].content);
      //console.log('tet');
      var unixTimestamp = new Date(parseInt(res[index3].publish_time));
      commonTime = unixTimestamp.toLocaleString();
      $('#pub_time').html("发布时间：" + commonTime);
    }
  });
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
        url: "../backWeb/php/news_edite.php",
        data: {
          edite_id: edite_id,
          pubTime: pubTime,
          userid: id,
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
          //console.log(jobj);
          if (jobj.status == 0) {

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
    } else {
      $.message({
        message: '请输入完整',
        type: 'warning'
      });
    }
  });
  $('#contentMain_back').click(function() {
    //console.log('test');
    $('#news_edite').hide();
    $('#news_nav').hide();
    $('#contentMain').hide();
    $('#con').show();
    $('#btnArea').show();

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

})

function getContent(page, res) {
  $.ajax({
    type: "POST",
    url: "../backWeb/php/news_mng.php",
    data: {
      page: page
    },
    dataType: 'json',
    success: function(msg) {

    },
    complete: function(data) {
      //console.log(data);
      var jobj = JSON.parse(data.responseText);
      //console.log(jobj);
      //console.log(jobj.length);
      for (var i in jobj) {
        res.push(jobj[i]);
      }
      console.log(res);
      if (jobj != null) {
        for (var i = 0; i < 10; i++) {
          var str = '#area' + i;
          $(str).hide();
        }
        for (var i = 0; i < res.length; i++) {
          var str = '#area' + i;
          $(str).show();
          var str1 = '#news' + i;
          $(str1).html(jobj[i].article_title);
          var unixTimestamp = new Date(parseInt(jobj[i].publish_time));
          commonTime = unixTimestamp.toLocaleString();
          var str2 = '#time' + i;
          $(str2).html(commonTime);
        }
      }
    },
    fail: function(msg) {

    }
  });
}

function del(id, page, res) {
  $.ajax({
    type: "POST",
    url: "../backWeb/php/news_del.php",
    data: {
      id: id
    },
    dataType: 'json',
    success: function(msg) {

    },
    complete: function(data) {
      //console.log(data);
      var jobj = JSON.parse(data.responseText);
      //console.log(jobj);
      if (jobj.status == 0) {
        //$(window).attr('location','news_mng.html');
        res = [];
        getContent(page, res);
        $.message('删除成功');
      } else if (jobj.status == 1) {
        $.message({
          message: '删除失败',
          type: 'error'
        });
      }
    },
    fail: function(msg) {
      $.message({
        message: '删除失败',
        type: 'error'
      });
    }
  });
}
