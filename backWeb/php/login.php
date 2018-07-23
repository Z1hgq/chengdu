<?php
// ini_set("display_errors", "On");
// error_reporting(E_ALL);
header("Content-type:text/html;charset=utf-8");//字符编码设置
$name=$_POST['name'];
//$name='admin';
$pw=$_POST['password'];
//$pw='admin';
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
$stmt = $con->prepare("SELECT * FROM ad WHERE login_name = ?");
$stmt->bind_param('s',$name);
$stmt->bind_result($login_name,$login_pwd,$login_id);  // 绑定结果格式
$stmt->execute();
$stmt->store_result();

if($stmt->fetch()){
    // echo "$login_name--$login_pwd--$login_id";     //输出取出数据信息
    // echo "==$login_pwd==$password";
    if ($pw == $login_pwd) {
      $arr1 = array("status" => 0,"name" => $login_name,"password" => $login_pwd,"id" => $login_id);
      echo json_encode($arr1);
    }else{
      $arr2 = array("status" => 1);
      echo json_encode($arr2);
    }
}else{
  $arr2 = array("status" => 1);
  echo json_encode($arr2);
}
$stmt->close();
mysqli_close($con);
?>
