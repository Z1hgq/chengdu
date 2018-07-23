jQuery(document).ready(function() {
  var date = new Date().getTime();
  var login_time = $.session.get('login_time');
  var username = $.session.get('username');
  var password = $.session.get('password');
  var uid = $.session.get('id');

  console.log(date - login_time);
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
    }else {
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
    var settime = new Date().getTime();
    var obj = e.srcElement || e.target;
    console.log(obj.id);
    var arr1 = ['give_title_btn0', 'give_title_btn1', 'give_title_btn2', 'give_title_btn3', 'give_title_btn4', 'give_title_btn5', 'give_title_btn6', 'give_title_btn7', 'give_title_btn8', 'give_title_btn9'];
    var arr2 = ['info0', 'info1', 'info2', 'info3', 'info4', 'info5', 'info6', 'info7', 'info8', 'info9'];
    var arr3 = ['title_cancel_btn0', 'title_cancel_btn1', 'title_cancel_btn2', 'title_cancel_btn3', 'title_cancel_btn4', 'title_cancel_btn5', 'title_cancel_btn6', 'title_cancel_btn7', 'title_cancel_btn8', 'title_cancel_btn9'];
    var arr4 = ['list_select0','list_select1','list_select2','list_select3','list_select4','list_select5','list_select6','list_select7','list_select8','list_select9'];
    var index1 = $.inArray(obj.id, arr1);
    var index2 = $.inArray(obj.id, arr2);
    var index3 = $.inArray(obj.id, arr3);
    var index4 = $.inArray(obj.id, arr4);
    if (index1 >= 0) {
      //console.log(index1);
      var re_id = res[index1].identity_ID;
      give_title(re_id, page, res);
    }
    if (index2 >= 0) {
      $('#con').hide();
      $('#btnArea').hide();
      $('#info_nav').show();
      $('#red_people').show();
      $('#red_people_name').html(res[index2].name);
      $('#red_people_id').html(res[index2].identity_ID);
      $('#red_people_mobile').html(res[index2].phone);
      $('#red_people_area').html(res[index2].area);
      $('#red_people_title').html(res[index2].title);
      $('#red_people_photo').css('background-image', 'url(' + res[index2].photo + ')');
    }
    if (index3 >= 0) {
      var re_id = res[index3].identity_ID;
      cancel_title(re_id, page, res);
    }
    if(index4>=0){
      var re_id = res[index4].identity_ID;
      var str = '#list_select'+index4;
      $(str).change(function(){
        var list_status = $(str).val();
        set_list(settime,re_id,list_status,page,res);
      })
    }
  });
})

function getContent(page, res) {
  $.ajax({
    type: "POST",
    url: "../backWeb/php/list_mng.php",
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
        // $('#cont').hide();
        // if (res.length != 0) $('#cont').show();
        for (var i = 0; i < res.length; i++) {
          var str = '#area' + i;
          $(str).show();
          var str1 = '#goodname' + i;
          $(str1).html(res[i].name);
          var str2 = '#title' + i;
          $(str2).html(res[i].title);
          var str3 = '#list_select' + i;
          $(str3).val(res[i].list_status);
        }
      }
    },
    fail: function(msg) {

    }
  });
}
function give_title(re_id, page, res){
  $.ajax({
    type: "POST",
    url: "../backWeb/php/give_title.php",
    data: {
      id: re_id
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
        $.message('授予成功');
      } else if (jobj.status == 1) {
        $.message({
          message: '授予失败',
          type: 'error'
        });
      }
    },
    fail: function(msg) {
      $.message({
        message: '授予失败',
        type: 'error'
      });
    }
  });
}
function cancel_title(re_id, page, res){
  $.ajax({
    type: "POST",
    url: "../backWeb/php/cancel_title.php",
    data: {
      id: re_id
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
        $.message('撤销成功');
      } else if (jobj.status == 1) {
        $.message({
          message: '撤销失败',
          type: 'error'
        });
      }
    },
    fail: function(msg) {
      $.message({
        message: '撤销失败',
        type: 'error'
      });
    }
  });
}
function set_list(settime,re_id,list_status,page,res){
  $.ajax({
    type: "POST",
    url: "../backWeb/php/set_list.php",
    data: {
      settime:settime,
      id: re_id,
      list_status:list_status
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
        $.message('设置成功');
      } else if (jobj.status == 1) {
        $.message('设置成功');
      }
    },
    fail: function(msg) {
      $.message({
        message: '设置失败',
        type: 'error'
      });
    }
  });
}
