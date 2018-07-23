<?php
header("Content-type:text/html;charset=utf-8");//字符编码设置
$update_time = $_POST['update_time'];
$ac_content = $_POST['ac_content'];

$servername = "localhost";
$username = "root";
$password = "Z1hgq260717";
$dbname = "cdgoodmodel";
// 创建连接
//$con =mysqli_connect($servername, $username, $password, $dbname);
$con = new mysqli(null,$username,$password,$dbname,null,'/tmp/mysql.sock');
// 检测连接
$sql = "UPDATE ac_intro SET update_time = '$update_time',content='$ac_content' WHERE ac_id = 0";
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
