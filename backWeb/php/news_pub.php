<?php
header("Content-type:text/html;charset=utf-8");//字符编码设置
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

if(!$stmt = $con->prepare("INSERT INTO article (publish_time, article_title, keyword,admin_id,admin_name,content) VALUES (?, ?, ?, ?, ?, ?)"))
{
  echo("错误描述: " . mysqli_error($con));
}
if(!$stmt->bind_param("ssssss",$pubTime,$news_title, $news_key, $userid,$uname,$news_content))
{
  echo("错误描述: " . mysqli_error($con));
}


$arr1 = array("status" => 0,);
$arr2 = array("status" => 1);
if($stmt->execute()){
  echo json_encode($arr1);
}else {
  echo("错误描述: " . mysqli_error($con));
  echo json_encode($arr2);
}
$stmt->close();
mysqli_close($con);
?>
