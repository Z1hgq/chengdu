<?php
header("Content-type:text/html;charset=utf-8");//字符编码设置
$id=$_POST['id'];
//$id=9;
$servername = "localhost";
$username = "root";
$password = "Z1hgq260717";
$dbname = "cdgoodmodel";
// 创建连接
//$con =mysqli_connect($servername, $username, $password, $dbname);
$con = new mysqli(null,$username,$password,$dbname,null,'/tmp/mysql.sock');
// 检测连接

$sql = "DELETE FROM article WHERE article_ID = $id";
//echo $sql;
if(mysqli_query($con,$sql)){
  $arr1 = array("status" => 0);
  echo json_encode($arr1);
}else{
  printf("Error: %s\n", mysqli_error($con));
  $arr2 = array("status" => 1);
  echo json_encode($arr2);
}
mysqli_close($con);
?>
