<?php
header("Content-type:text/html;charset=utf-8");//字符编码设置
$id=$_POST['id'];
$uname=$_POST['uname'];
$uid=$_POST['uid'];
$passtime=$_POST['passtime'];
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
$stmt->bind_param('i',$id);
$stmt->bind_result($e_id,$e_time,$e_content,$e_title,$e_keyword);  // 绑定结果格式
$stmt->execute();
$stmt->store_result();
$stmt->fetch();

$stmt1 = $con->prepare("SELECT identity_ID_recommended FROM recommend WHERE ID = ?");
$stmt1->bind_param('i',$id);
$stmt1->bind_result($good_id);  // 绑定结果格式
$stmt1->execute();
$stmt1->store_result();
$stmt1->fetch();

$stmt3 = $con->prepare("SELECT * FROM recommended WHERE identity_ID = ?");
$stmt3->bind_param('i',$good_id);
$stmt3->bind_result($g_identity_ID,$g_name,$g_phone,$g_area,$g_photo);  // 绑定结果格式
$stmt3->execute();
$stmt3->store_result();
$stmt3->fetch();

if(!$stmt2 = $con->prepare("INSERT INTO event_pass (ID,event_time,admin_id,admin_name,content,title,keyword) VALUES (?,?,?,?, ?,?, ?)"))
{
  echo("错误描述5: " . mysqli_error($con));
}
if(!$stmt2->bind_param("issssss",$e_id,$e_time,$uid,$uname,$e_content,$e_title,$e_keyword))
{
  echo("错误描述6: " . mysqli_error($con));
}
$stmt2->execute();

if(!$stmt4 = $con->prepare("INSERT INTO goodman (identity_ID,name,phone,area,photo,list_time) VALUES (?,?,?,?,?,?)"))
{
  echo("错误描述7: " . mysqli_error($con));
}
if(!$stmt4->bind_param("isssss",$g_identity_ID,$g_name,$g_phone,$g_area,$g_photo,$passtime))
{
  echo("错误描述8: " . mysqli_error($con));
}
$stmt4->execute();

$sql = "DELETE FROM event WHERE ID = $e_id";
$sql1 = "DELETE FROM recommended WHERE identity_ID = $g_identity_ID";
mysqli_query($con,$sql);
//echo $sql;
if(mysqli_query($con,$sql1)){
  $arr1 = array("status" => 0);
  echo json_encode($arr1);
}else{
  printf("Error: %s\n", mysqli_error($con));
  $arr2 = array("status" => 1);
  echo json_encode($arr2);
}

$stmt1->close();
$stmt2->close();
$stmt3->close();
$stmt4->close();
$stmt->close();
mysqli_close($con);
?>
