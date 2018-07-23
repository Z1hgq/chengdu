<?php
// ini_set("display_errors", "On");
// error_reporting(E_ALL);
header("Content-type:text/html;charset=utf-8");//字符编码设置
$uname=$_POST['username'];
$new_pw=$_POST['new_pw'];

$servername = "localhost";
$username = "root";
$password = "Z1hgq260717";
$dbname = "cdgoodmodel";
// 创建连接
//$con =mysqli_connect($servername, $username, $password, $dbname);
$con = new mysqli(null,$username,$password,$dbname,null,'/tmp/mysql.sock');
// 检测连接

// if(!$stmt = $con->prepare("UPDATE ad SET login_pwd = ? WHERE login_name = ?"))
// {
//   echo("错误描述: " . mysqli_error($con));
// }
// if(!$stmt->bind_param("ss",$new_pw,$username))
// {
//   echo("错误描述: " . mysqli_error($con));
// }

$sql = "UPDATE ad SET login_pwd = '$new_pw' WHERE login_name = '$uname'";
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
