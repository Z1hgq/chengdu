<?php
header("Content-type:text/html;charset=utf-8");//字符编码设置
$edite_id=$_POST['edite_id'];
$news_title=$_POST['news_title'];
$news_key=$_POST['news_key'];
$news_content=$_POST['news_content'];
$uname=$_POST['username'];
$userid=$_POST['userid'];
$pubTime=$_POST['pubTime'];
//print_r($pubTime);
// print_r($news_title);
// print_r($news_key);
// print_r($news_content);
$servername = "localhost";
$username = "root";
$password = "Z1hgq260717";
$dbname = "cdgoodmodel";
// 创建连接
//$con =mysqli_connect($servername, $username, $password, $dbname);
$con = new mysqli(null,$username,$password,$dbname,null,'/tmp/mysql.sock');
// 检测连接

$sql = "UPDATE article SET publish_time = '$pubTime',article_title = '$news_title',keyword = '$news_key',admin_id = '$userid',admin_name = '$uname',content = '$news_content' WHERE article_ID = $edite_id";
//echo $sql;
$arr1 = array("status" => 0,);
$arr2 = array("status" => 1);
if(mysqli_query($con,$sql)){
  //echo("错误描述: " . mysqli_error($con));
  echo json_encode($arr1);
}else {
  //echo("错误描述: " . mysqli_error($con));
  echo json_encode($arr2);
}
mysqli_close($con);
?>
