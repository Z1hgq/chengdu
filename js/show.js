jQuery(document).ready(function() {
  var res = [];
  var eve_pass = [];
  var rec = [];
  var goodman = [];
  var y_list = [];
  var img_num = 0;
  var index1 = 3;
  var index2;
  get_list(rec, eve_pass, goodman, y_list,img_num);
  console.log(eve_pass);
  console.log(rec);
  console.log(goodman);
  console.log(y_list);
  console.log(img_num);



  $('#y_list').click(function(e) {
    $('#th').hide();
    $('#th_nav').hide();
    $('#list_con').show();
    $('#list_con').html('');
    index2 = -1;
    var obj = e.srcElement || e.target;
    console.log(obj.id);
    var arr1 = ['y_2015', 'y_2016', 'y_2017', 'y_2018'];
    index1 = $.inArray(obj.id, arr1);
    if (index1 >= 0) {
      var str = '#y_201' + (5 + index1);
      for (var i = 0; i < 4; i++) {
        var str1 = '#y_201' + (5 + i);
        $(str1).css("background-color", "#F0FFFF");
      }
      for (var i = 1; i < 13; i++) {
        var str1 = '#m_' + i;
        $(str1).css("background-color", "#F0FFFF");
      }
      $(str).css("background-color", "#fff");

      var time1 = '201' + (5 + index1) + ' 01-01 00:00:00';
      var time2 = '201' + (6 + index1) + ' 01-01 00:00:00';
      var formatTime1 = new Date(time1).getTime();
      var formatTime2 = new Date(time2).getTime();
      y_list = [];
      for (i in goodman) {
        if (goodman[i].list_time > formatTime1 && goodman[i].list_time <= formatTime2 && goodman[i].list_status == '1') {
          y_list.push(goodman[i]);
        }
      }
      for (var i = 0; i < y_list.length; i++) {
        var img_list = '<li><p class="img"><a><img id="img' + i + '" alt="入选人照片" src=" ' + y_list[i].photo + ' " /></a></p><h3><a   id="name0"> ' + y_list[i].name + ' </a></h3><p id="img_area0"> ' + y_list[i].area + '</p></li>'
        $('#list_con').append(img_list);
      }
      img_num = y_list.length;
      console.log(y_list);

    }

  });
  $('#m_list').click(function(e) {
    $('#th').hide();
    $('#th_nav').hide();
    $('#list_con').show();
    $('#list_con').html('');
    var obj = e.srcElement || e.target;
    console.log(obj.id);
    var arr2 = ['m_1', 'm_2', 'm_3', 'm_4', 'm_5', 'm_6', 'm_7', 'm_8', 'm_9', 'm_10', 'm_11', 'm_12'];
    index2 = $.inArray(obj.id, arr2);
    if (index2 >= 0) {
      var str = '#m_' + (index2 + 1);
      for (var i = 1; i < 13; i++) {
        var str1 = '#m_' + i;
        $(str1).css("background-color", "#F0FFFF");
      }
      $(str).css("background-color", "#fff");
      var time1 = '201' + (5 + index1) + ' ' + (index2 + 1) + '-01 00:00:00';
      var time2 = '201' + (5 + index1) + ' ' + (index2 + 2) + '-01 00:00:00';
      var formatTime1 = new Date(time1).getTime();
      var formatTime2 = new Date(time2).getTime();
      y_list = [];
      for (i in goodman) {
        if (goodman[i].list_time > formatTime1 && goodman[i].list_time <= formatTime2 && goodman[i].list_status == '2') {
          y_list.push(goodman[i]);
        }
      }
      console.log(y_list);
      for (var i = 0; i < y_list.length; i++) {
        var img_list = '<li><p class="img"><a><img id="img'+i+'" alt="入选人照片" src=" ' + y_list[i].photo + ' " /></a></p><h3><a   id="name0"> ' + y_list[i].name + ' </a></h3><p id="img_area0"> ' + y_list[i].area + '</p></li>'
        $('#list_con').append(img_list);
      }
      img_num = y_list.length;
    }
  });
  $('#list_con').click(function(e) {
    //sleep(3000);
    var obj = e.srcElement || e.target;
    console.log(obj.id);
    var arr = [];
    for (var i = 0; i < 100; i++) {
      var str = 'img' + i;
      arr.push(str);
    }
    var index = $.inArray(obj.id, arr);
    var th_id = [];
    $('#th').show();
    $('#th_nav').css("display", "inline");
    $('#list_con').hide();
    console.log(y_list);
    console.log(index);
    for (var i in rec) {
      if (y_list[index].identity_ID == rec[i].identity_ID_recommended) {
        th_id.push(rec[i].ID);
      }
    }
    for (var i = 0; i < th_id.length; i++) {
      for (var j = 0; j < eve_pass.length; j++) {
        if (th_id[i] == eve_pass[j].ID) {
          $('#th').html("<div style='text-align:center;font-size:25px'>" + eve_pass[j].title + "</div><div style='margin-top:20px;'>" + eve_pass[j].content + "</div>");
        }
      }
    }
  });
  $('#contentMain_back').click(function() {
    $('#th').hide();
    $('#th_nav').hide();
    $('#list_con').show();
  });
});

function get_list(rec, eve_pass, goodman, y_list,img_num) {
  $.ajax({
    type: "POST",
    url: "../backWeb/php/get_list.php",
    data: {},
    dataType: 'json',
    success: function(msg) {},
    complete: function(data) {
      //console.log(data.responseText);
      var jobj = JSON.parse(data.responseText);
      // console.log(jobj);
      // console.log(jobj.rec);
      for (var i in jobj.rec) {
        rec.push(jobj.rec[i]);
      }
      for (var i in jobj.goodman) {
        goodman.push(jobj.goodman[i]);
      }
      for (var i in jobj.eve_pass) {
        eve_pass.push(jobj.eve_pass[i]);
      }
      $('#y_2018').css("background-color", "#fff");
      var time1 = '2018' + ' 01-01 00:00:00';
      var time2 = '2019' + ' 01-01 00:00:00';
      var formatTime1 = new Date(time1).getTime();
      var formatTime2 = new Date(time2).getTime();
      for (i in goodman) {
        if (goodman[i].list_time > formatTime1 && goodman[i].list_time <= formatTime2 && goodman[i].list_status == '1') {
          y_list.push(goodman[i]);
        }
      }
      for (var i = 0; i < y_list.length; i++) {
        var img_list = '<li><p class="img"><a><img id="img' + i + '" alt="入选人照片" src=" ' + y_list[i].photo + ' " /></a></p><h3><a   id="name0"> ' + y_list[i].name + ' </a></h3><p id="img_area0"> ' + y_list[i].area + '</p></li>'
        $('#list_con').append(img_list);
      }
      img_num = y_list.length;
      console.log(img_num);
    },
    fail: function(msg) {}
  });
}
function sleep(n) { //n表示的毫秒数
  var start = new Date().getTime();
  while (true)
    if (new Date().getTime() - start > n) break;
}
