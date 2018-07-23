<?php
header("Content-type:text/html;charset=utf-8");//字符编码设置
$id=$_POST['id'];
$uname=$_POST['uname'];
$uid=$_POST['uid'];
//$id=9;
$servername = "localhost";
$username = "root";
$password = "Z1hgq260717";
$dbname = "cdgoodmodel";
// 创建连接
//$con =mysqli_connect($servername, $username, $password, $dbname);
$con = new mysqli(null,$username,$password,$dbname,null,'/tmp/mysql.sock');
// 检测连接

$stmt = $con->prepare("SELECT * FROM event WHERE ID = ?");
$stmt->bind_param('s',$id);
$stmt->bind_result($e_id,$e_time,$e_content,$e_title,$e_keyword);  // 绑定结果格式
$stmt->execute();
$stmt->store_result();
$stmt->fetch();

if(!$stmt2 = $con->prepare("INSERT INTO event_unpass (ID,event_time,admin_id,admin_name,content,title,keyword) VALUES (?,?,?,?, ?,?, ?)"))
{
  echo("错误描述5: " . mysqli_error($con));
}
if(!$stmt2->bind_param("issssss",$e_id,$e_time,$uid,$uname,$e_content,$e_title,$e_keyword))
{
  echo("错误描述6: " . mysqli_error($con));
}
$stmt2->execute();

$sql = "DELETE FROM event WHERE ID = $e_id";
//echo $sql;
if(mysqli_query($con,$sql)){
  $arr1 = array("status" => 0);
  echo json_encode($arr1);
}else{
  printf("Error: %s\n", mysqli_error($con));
  $arr2 = array("status" => 1);
  echo json_encode($arr2);
}

$stmt->close();
$stmt2->close();
mysqli_close($con);
?>
