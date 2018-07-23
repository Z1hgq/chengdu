jQuery(document).ready(function() {
  var page = 1;
  var res = [];
  var eve_pass = [];
  var rec = [];
  var goodman = [];
  getIntro();
  getContent(page,res);
  get_list(rec,eve_pass,goodman);

  $('#con').click(function(e){
    var obj=e.srcElement || e.target;
    console.log(obj.id);
    var arr3 = ['news0','news1','news2','news3','news4','news5','news6','news7','news8','news9'];
    var index3 = $.inArray(obj.id,arr3);
    if(index3 >= 0){
      $.session.set('dyn_title', res[index3].article_title);
      $.session.set('dyn_content', res[index3].content);
      $.session.set('dyn_time', res[index3].publish_time);
      $.session.set('dyn_flag','1');
      $(window).attr('location','../ac_dyn.html');
    }
  });
  $('#list').click(function(e){
    var obj=e.srcElement || e.target;
    console.log(obj.id);
    var arr = ['img0','img1','img2','img3','img4','img5','img6','img7','img8','img9'];
    var index = $.inArray(obj.id,arr);
    var th_id = [];
    $('#th').show();
    $('#th_nav').css("display","inline");
    $('#index_page').hide();
    for (var i in rec) {
      if (goodman[index].identity_ID == rec[i].identity_ID_recommended) {
        th_id.push(rec[i].ID);
      }
    }
    for (var i = 0; i < th_id.length; i++) {
      for (var j = 0; j < eve_pass.length; j++) {
        if(th_id[i] == eve_pass[j].ID){
          $('#th').html("<div style='text-align:center;font-size:25px'>"+eve_pass[j].title+"</div><div style='margin-top:20px;'>"+eve_pass[j].content+"</div>");
        }
      }
    }
  });
  $('#contentMain_back').click(function(){
    $('#th').hide();
    $('#th_nav').hide();
    $('#index_page').show();
  });
});
function getIntro(){
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
}
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
        for(var i=0;i<6;i++){
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
function get_list(rec,eve_pass,goodman){
  $.ajax({
    type: "POST",
    url: "../backWeb/php/get_list.php",
    data: {
    },
    dataType:'json',
    success: function(msg){
    },
    complete:function(data){
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
      for (var i = 0; i < 8; i++) {
        var str = '#img' + i;
        $(str).attr("src",goodman[i].photo);
        var str1 = '#name'+i;
        $(str1).html(goodman[i].name);
        var str2 = '#img_area'+i;
        console.log(goodman[i].area);
        $(str2).html(goodman[i].area);
      }
    },
    fail: function(msg){
    }
  });
}
