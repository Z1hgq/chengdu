jQuery(document).ready(function() {
  var xhr;
  var ue = UE.getEditor('editor');
  var pic_path = '/uploads/256.png';
  //重置编辑器
  $('#news_content_reset').click(function() {
    UE.getEditor('editor').setContent('');
  });
  $('#news_content_commit').click(function() {
    var pub_time = new Date().getTime();
    var arr = [];
    arr.push(UE.getEditor('editor').getContent());
    var re_name = $('#re_name').val();
    var re_mobile = $('#re_mobile').val();
    var re_id = $('#re_id').val();
    var red_name = $('#red_name').val();
    var red_mobile = $('#red_mobile').val();
    var red_id = $('#red_id').val();
    var th_type = $('#th_type').val();
    var th_title = $('#th_title').val();
    var red_area = $("#red_select").val();
    console.log(pub_time);
    console.log(arr[0]);
    console.log(re_name);
    console.log(red_name);
    console.log(re_mobile);
    console.log(red_mobile);
    console.log(re_id);
    console.log(red_id);
    console.log(th_type);
    console.log(th_title);
    console.log(red_area);
    console.log($('#pic_path').html());
    pic_path = $('#pic_path').html();
    if (red_area != '' && arr[0] != '' && pic_path != '' && re_name != '' && re_mobile != '' && re_id != '' && red_name != '' && red_mobile != '' && red_id != '' && th_type != '' && th_title != '') {
      if(!ischina(re_name) || !ischina(red_name)){
        $.message({
          message: '请输入2-4位的中文名字',
          type: 'warning'
        });
      }else{
        if(!isTelCode(re_mobile) || !isTelCode(red_mobile)){
          $.message({
            message: '请输入正确的电话号码',
            type: 'warning'
          });
        }else{
          if(!isIdentify(re_id) || !isIdentify(red_id)){
            $.message({
              message: '请输入正确的身份证号',
              type: 'warning'
            });
          }else{
            $.ajax({
              type: "POST",
              url: "../backWeb/php/info_up.php",
              data: {
                re_name: re_name,
                re_mobile: re_mobile,
                re_id: re_id,
                red_name: red_name,
                red_mobile: red_mobile,
                red_id: red_id,
                th_type: th_type,
                th_title: th_title,
                th_content:arr[0],
                red_area: red_area,
                pub_time: pub_time,
                pic_path: pic_path
              },
              dataType: 'json',
              success: function(msg) {

              },
              complete: function(data) {
                //console.log(data.responseText);
                var jobj = JSON.parse(data.responseText);
                console.log(jobj);
                if (jobj.status == 0) {
                  $('#re_name').val('');
                  $('#re_mobile').val('');
                  $('#re_id').val('');
                  $('#red_name').val('');
                  $('#red_mobile').val('');
                  $('#red_id').val('');
                  $('#th_type').val('');
                  $('#th_title').val('');
                  UE.getEditor('editor').setContent('');
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
          }
        }
      }
    } else {
      $.message({
        message: '请输入完整',
        type: 'warning'
      });
    }
  });
  $('#red_select').change(function() {
    console.log($("#red_select").val());
  });
})

function createXMLHttpRequest() {
  if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  } else if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  }
}

function UpladFile() {
  var fileObj = document.getElementById("file").files[0];
  var FileController = 'doajaxfileupload.php';
  var form = new FormData();
  form.append("myfile", fileObj);
  createXMLHttpRequest();
  xhr.onreadystatechange = handleStateChange;
  xhr.open("post", FileController, true);
  xhr.send(form);
}
function handleStateChange() {
  if (xhr.readyState == 4) {
    if (xhr.status == 200 || xhr.status == 0) {
      var result = xhr.responseText;
      var json = eval("(" + result + ")");
      pic_path = json.file;
      console.log(pic_path);
      $('#pic_path').html(pic_path);
      $.message('上传图片成功');
    }
  }
}
/*校验是否中文名称组成 */
function ischina(str) {
    var reg=/^[\u4E00-\u9FA5]{2,4}$/;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
}
/*校验电话码格式 */
function isTelCode(str) {
    var reg= /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
    return reg.test(str);
}
// 检验身份证号
function isIdentify(str) {
    var reg= /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
    return reg.test(str);
}
