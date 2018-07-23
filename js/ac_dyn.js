jQuery(document).ready(function() {
  var dyn_title = $.session.get('dyn_title');
  var dyn_content = $.session.get('dyn_content');
  var dyn_time = $.session.get('dyn_time');
  var dyn_flag = $.session.get('dyn_flag');
  if(dyn_flag == '1'){
    //console.log('====')
    $('#con').hide();
    $('#btnArea').hide();
    //$('#news_nav').show();
    $("#news_nav").css("display","inline");
    $('#contentMain').show();
    //console.log(res[index3]);
    $('#contentTitle').html(dyn_title);
    $('#contentText').html(dyn_content);
    //console.log('tet');
    var unixTimestamp = new Date(parseInt(dyn_time));
    commonTime = unixTimestamp.toLocaleString();
    $('#pub_time').html("发布时间："+commonTime);
  }
  var page = 1;
  var res = [];
  getContent(page,res);
  $('#pre_btn').click(function(){
    if(page == 1){
      $.message({
        message: '已经是第一页了',
        type: 'info'
      });
    }
    if(page > 1){
      page = page - 1;
      res = [];
      getContent(page,res);
      $('#page').html(page);
    }
  });
  $('#next_btn').click(function(){
    if(res.length < 10){
      $.message({
        message: '已经是最后一页了',
        type: 'info'
      });
    }
    if(res.length >= 10){
      page = page + 1;
      res = [];
      getContent(page,res);
      $('#page').html(page);
    }
  });
  $('#go_btn').click(function(){
    if($('#page_in').val() == ''){
      $.message({
        message: '请输入页数',
        type: 'warning'
      });
    }else {
      var pre_page = page;
      page = parseInt($('#page_in').val());
      res = [];
      getContent(page,res);
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
  $('#con').click(function(e){
    var obj=e.srcElement || e.target;
    console.log(obj.id);
    var arr1 = ['news_del_btn0','news_del_btn1','news_del_btn2','news_del_btn3','news_del_btn4','news_del_btn5','news_del_btn6','news_del_btn7','news_del_btn8','news_del_btn9'];
    var arr2 = ['news_change_btn0','news_change_btn1','news_change_btn2','news_change_btn3','news_change_btn4','news_change_btn5','news_change_btn6','news_change_btn7','news_change_btn8','news_change_btn9'];
    var arr3 = ['news0','news1','news2','news3','news4','news5','news6','news7','news8','news9'];
    var index1 = $.inArray(obj.id,arr1);
    var index2 = $.inArray(obj.id,arr2);
    var index3 = $.inArray(obj.id,arr3);

    if(index3 >= 0){
      $('#con').hide();
      $('#btnArea').hide();
      //$('#news_nav').show();
      $("#news_nav").css("display","inline");
      $('#contentMain').show();
      //console.log(res[index3]);
      $('#contentTitle').html(res[index3].article_title);
      $('#contentText').html(res[index3].content);
      //console.log('tet');
      var unixTimestamp = new Date(parseInt(res[index3].publish_time));
      commonTime = unixTimestamp.toLocaleString();
      $('#pub_time').html("发布时间："+commonTime);
    }
  });

  $('#contentMain_back').click(function(){
    $.session.set('dyn_flag','0');
    //console.log('test');
    //$('#news_edite').hide();
    $('#news_nav').hide();
    $('#contentMain').hide();
    $('#con').show();
    $('#btnArea').show();
  });

})
function getContent(page,res){
  $.ajax({
    type: "POST",
    url: "../backWeb/php/news_mng.php",
    data: {
      page:page
    },
    dataType:'json',
    success: function(msg){

    },
    complete:function(data){
      //console.log(data);
      var jobj = JSON.parse(data.responseText);
      //console.log(jobj);
      //console.log(jobj.length);
      for (var i in jobj) {
        res.push(jobj[i]);
      }
      console.log(res);
      if(jobj!=null){
        for(var i=0;i<10;i++){
          var str = '#area'+i;
          $(str).hide();
        }
        for(var i = 0;i < res.length;i++){
          var str = '#area'+i;
          $(str).show();
          var str1 = '#news'+i;
          $(str1).html(jobj[i].article_title);
          var unixTimestamp = new Date(parseInt(jobj[i].publish_time));
          commonTime = unixTimestamp.toLocaleString();
          var str2 = '#time'+i;
          $(str2).html(commonTime);
        }
      }
    },
    fail: function(msg){

    }
  });
}
