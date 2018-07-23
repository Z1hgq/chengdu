jQuery(document).ready(function() {
  var date = new Date().getTime();
  var login_time = $.session.get('login_time');
  console.log(date - login_time);
  var username = $.session.get('username');
  var password = $.session.get('password');
  var uid = $.session.get('id');
  //console.log(uid);
  if (date - login_time <= 7200000) {
    $('#logname').html("<i class='icon-user'></i>" + username + " <b class='caret'></b>");
  } else {
    $.session.clear();
    $(window).attr('location', 'login.html');
  }
  var page = 1;
  //var res = [];
  var recommend = []
  var evet = [];
  var recommended = [];
  var referral = [];
  getContent(page, recommend, evet, recommended, referral);
  $('#con').click(function(e) {
    var obj = e.srcElement || e.target;
    console.log(obj.id);
    var arr1 = ['title0', 'title1', 'title2', 'title3', 'title4', 'title5', 'title6', 'title7', 'title8', 'title9'];
    var arr2 = ['red_name0', 'red_name1', 'red_name2', 'red_name3', 'red_name4', 'red_name5', 'red_name6', 'red_name7', 'red_name8', 'red_name9'];
    var arr3 = ['re_name0', 're_name1', 're_name2', 're_name3', 're_name4', 're_name5', 're_name6', 're_name7', 're_name8', 're_name9'];
    var arr4 = ['psss_btn0', 'psss_btn1', 'psss_btn2', 'psss_btn3', 'psss_btn4', 'psss_btn5', 'psss_btn6', 'psss_btn7', 'psss_btn8', 'psss_btn9'];
    var arr5 = ['unpsss_btn0', 'unpsss_btn1', 'unpsss_btn2', 'unpsss_btn3', 'unpsss_btn4', 'unpsss_btn5', 'unpsss_btn6', 'unpsss_btn7', 'unpsss_btn8', 'unpsss_btn9'];
    var index1 = $.inArray(obj.id, arr1);
    var index2 = $.inArray(obj.id, arr2);
    var index3 = $.inArray(obj.id, arr3);
    var index4 = $.inArray(obj.id, arr4);
    var index5 = $.inArray(obj.id, arr5);
    var passtime = new Date().getTime();
    if (index1 >= 0) {
      $('#con').hide();
      $('#btnArea').hide();
      $('#src_nav').show();
      $('#contentMain').show();
      //console.log(res[index3]);
      $('#contentTitle').html(evet[index1].title);
      $('#contentText').html(evet[index1].content);
      //console.log('tet');
      var unixTimestamp = new Date(parseInt(evet[index1].event_time));
      commonTime = unixTimestamp.toLocaleString();
      $('#pub_time').html("上传时间：" + commonTime);
    }
    if (index2 >= 0) {
      $('#con').hide();
      $('#btnArea').hide();
      $('#red_nav').show();
      $('#red_people').show();
      for (var j = 0; j < recommend.length; j++) {
        if (evet[index2].ID == recommend[j].ID) {
          for (var k = 0; k < recommended.length; k++) {
            if (recommend[j].identity_ID_recommended == recommended[k].identity_ID) {
              $('#red_people_name').html(recommended[k].name);
              $('#red_people_id').html(recommended[k].identity_ID);
              $('#red_people_mobile').html(recommended[k].phone);
              $('#red_people_area').html(recommended[k].area);
              $('#red_people_title').html(recommended[k].title);
              $('#red_people_photo').css('background-image', 'url(' + recommended[k].photo + ')');
            }
          }
        }
      }
    }
    if (index3 >= 0) {
      $('#con').hide();
      $('#btnArea').hide();
      $('#re_nav').show();
      $('#re_people').show();
      for (var j = 0; j < recommend.length; j++) {
        if (evet[index3].ID == recommend[j].ID) {
          for (var k = 0; k < referral.length; k++) {
            if (recommend[j].identity_ID_referral == referral[k].identity_ID) {
              $('#re_people_name').html(referral[k].name);
              $('#re_people_id').html(referral[k].identity_ID);
              $('#re_people_mobile').html(referral[k].phone);
            }
          }
        }
      }

    }
    if (index4 >= 0) {
      $.ajax({
        type: "POST",
        url: "../backWeb/php/pass.php",
        data: {
          passtime: passtime,
          uname: username,
          uid: uid,
          id: evet[index4].ID
        },
        dataType: 'json',
        success: function(msg) {},
        complete: function(data) {
          //console.log(data);
          try {
            var jobj = JSON.parse(data.responseText);
          } catch (e) {
            console.log(e.message);
          }
          //console.log(jobj);
          if (jobj.status == 0) {
            //$(window).attr('location','news_mng.html');
            recommend = []
            evet = [];
            recommended = [];
            referral = [];
            getContent(page, recommend, evet, recommended, referral);
            $.message('操作成功');
          } else if (jobj.status == 1) {
            $.message({
              message: '操作失败',
              type: 'error'
            });
          }
        },
        fail: function(msg) {
          $.message({
            message: '操作失败',
            type: 'error'
          });
        }
      });
    }
    if (index5 >= 0) {
      $.ajax({
        type: "POST",
        url: "../backWeb/php/unpass.php",
        data: {
          uname: username,
          uid: uid,
          id: evet[index5].ID
        },
        dataType: 'json',
        success: function(msg) {},
        complete: function(data) {
          //console.log(data);
          var jobj = JSON.parse(data.responseText);
          //console.log(jobj);
          if (jobj.status == 0) {
            //$(window).attr('location','news_mng.html');
            recommend = []
            evet = [];
            recommended = [];
            referral = [];
            getContent(page, recommend, evet, recommended, referral);
            $.message('操作成功');
          } else if (jobj.status == 1) {
            $.message({
              message: '操作失败',
              type: 'error'
            });
          }
        },
        fail: function(msg) {
          $.message({
            message: '操作失败',
            type: 'error'
          });
        }
      });
    }
  });
  $('#contentMain_back').click(function() {
    //console.log('test');
    //$('#news_edite').hide();
    $('#src_nav').hide();
    $('#re_nav').hide();
    $('#red_nav').hide();
    $('#contentMain').hide();
    $('#red_people').hide();
    $('#re_people').hide();
    $('#con').show();
    $('#btnArea').show();
  });
  $('#pre_btn').click(function() {
    if (page == 1) {
      $.message({
        message: '已经是第一页了',
        type: 'info'
      });
    }
    if (page > 1) {
      page = page - 1;
      recommend = []
      evet = [];
      recommended = [];
      referral = [];
      getContent(page, recommend, evet, recommended, referral);
      $('#page').html(page);
    }
  });
  $('#next_btn').click(function() {
    if (evet.length < 10) {
      $.message({
        message: '已经是最后一页了',
        type: 'info'
      });
    }
    if (evet.length >= 10) {
      page = page + 1;
      recommend = []
      evet = [];
      recommended = [];
      referral = [];
      getContent(page, recommend, evet, recommended, referral);
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
      recommend = []
      evet = [];
      recommended = [];
      referral = [];
      getContent(page, recommend, evet, recommended, referral);
      if(evet.length == 0){
        $.message({
          message: '当前页无效',
          type: 'warning'
        });
      }
      $('#page').html(page);
      $('#page_in').val('');
    }

  });
})

function getContent(page, recommend, evet, recommended, referral) {
  $.ajax({
    type: "POST",
    url: "../backWeb/php/src_mng.php",
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
      //console.log(jobj.ref);
      for (var i in jobj.recom) {
        recommend.push(jobj.recom[i]);
      }
      for (var i in jobj.eve) {
        evet.push(jobj.eve[i]);
      }
      for (var i in jobj.recmond) {
        recommended.push(jobj.recmond[i]);
      }
      for (var i in jobj.ref) {
        referral.push(jobj.ref[i]);
      }
      console.log(recommend);
      console.log(evet);
      console.log(recommended);
      console.log(referral);
      if (recommend != null) {
        for (var i = 0; i < 10; i++) {
          var str = '#area' + i;
          $(str).hide();
        }
        for (var i = 0; i < evet.length; i++) {
          var str = '#area' + i;
          $(str).show();
          var str1 = '#title' + i;
          $(str1).html(evet[i].title);
          var str2 = '#red_name' + i;
          for (var j = 0; j < recommend.length; j++) {
            if (evet[i].ID == recommend[j].ID) {
              for (var k = 0; k < recommended.length; k++) {
                if (recommend[j].identity_ID_recommended == recommended[k].identity_ID) {
                  $(str2).html(recommended[k].name);
                }
              }
            }
          }
          var str3 = '#re_name' + i;
          for (var j = 0; j < recommend.length; j++) {
            if (evet[i].ID == recommend[j].ID) {
              for (var k = 0; k < referral.length; k++) {
                if (recommend[j].identity_ID_referral == referral[k].identity_ID) {
                  $(str3).html(referral[k].name);
                  console.log(referral[k].name);
                }
              }
            }
          }
        }
      }
    },
    fail: function(msg) {

    }
  });
}
