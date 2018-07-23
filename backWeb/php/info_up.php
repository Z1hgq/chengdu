<?php
header("Content-type:text/html;charset=utf-8");//字符编码设置

$re_name=$_POST['re_name'];
$re_mobile=$_POST['re_mobile'];
$re_id=$_POST['re_id'];
$red_name=$_POST['red_name'];
$red_mobile=$_POST['red_mobile'];
$red_id=$_POST['red_id'];
$th_type=$_POST['th_type'];
$th_title=$_POST['th_title'];
$red_area=$_POST['red_area'];
$pub_time=$_POST['pub_time'];
$pic_path=$_POST['pic_path'];
$th_content=$_POST['th_content'];

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

if(!$stmt1 = $con->prepare("INSERT INTO referral (name,phone,identity_ID) VALUES (?, ?, ?)"))
{
  echo("错误描述1: " . mysqli_error($con));
}
if(!$stmt1->bind_param("sss",$re_name,$re_mobile,$re_id))
{
  echo("错误描述2: " . mysqli_error($con));
}

if(!$stmt2 = $con->prepare("INSERT INTO recommended (name,phone,identity_ID,area,photo) VALUES (?,?,?, ?, ?)"))
{
  echo("错误描述3: " . mysqli_error($con));
}
if(!$stmt2->bind_param("sssss",$red_name,$red_mobile,$red_id,$red_area,$pic_path))
{
  echo("错误描述4: " . mysqli_error($con));
}
if(!$stmt3 = $con->prepare("INSERT INTO event (event_time,content,title,keyword) VALUES (?, ?,?, ?)"))
{
  echo("错误描述5: " . mysqli_error($con));
}
if(!$stmt3->bind_param("ssss",$pub_time,$th_content,$th_title,$th_type))
{
  echo("错误描述6: " . mysqli_error($con));
}
$stmt1->execute();
$stmt2->execute();
$stmt3->execute();

$stmt4 = $con->prepare("SELECT ID FROM event WHERE event_time = ?");
$stmt4->bind_param('s',$pub_time);
$stmt4->bind_result($event_id);  // 绑定结果格式
$stmt4->execute();
$stmt4->store_result();
$stmt4->fetch();

if(!$stmt5 = $con->prepare("INSERT INTO recommend (ID,identity_ID_referral,identity_ID_recommended) VALUES (?, ?, ?)"))
{
  echo("错误描述7: " . mysqli_error($con));
}
if(!$stmt5->bind_param("iss",$event_id,$re_id,$red_id))
{
  echo("错误描述8: " . mysqli_error($con));
}

$arr1 = array("status" => 0,);
$arr2 = array("status" => 1);
if($stmt5->execute()){
  echo json_encode($arr1);
}else {
  echo("错误描述9: " . mysqli_error($con));
  echo json_encode($arr2);
}
$stmt1->close();
$stmt2->close();
$stmt3->close();
$stmt4->close();
$stmt5->close();
mysqli_close($con);
?>
