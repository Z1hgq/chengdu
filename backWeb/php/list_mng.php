<?php
header("Content-type:text/html;charset=utf-8");//字符编码设置
$page=$_POST['page'];
$servername = "localhost";
$username = "root";
$password = "Z1hgq260717";
$dbname = "cdgoodmodel";
// 创建连接
//$con =mysqli_connect($servername, $username, $password, $dbname);
$con = new mysqli(null,$username,$password,$dbname,null,'/tmp/mysql.sock');
// 检测连接
$page1 = $page * 10 - 10;
$page2 = $page * 10;
$sql = "SELECT * FROM goodman LIMIT $page1,$page2";
$result = mysqli_query($con,$sql);
if (!$result) {
    printf("Error: %s\n", mysqli_error($con));
    exit();
}
$jarr = array();
while($row=$result->fetch_object()){
  array_push($jarr,$row);
}
//print_r($jarr);
$jobj=new stdclass();//实例化stdclass，这是php内置的空类，可以用来传递数据，由于json_encode后的数据是以对象数组的形式存放的，
//所以我们生成的时候也要把数据存储在对象中
foreach($jarr as $key=>$value){
$jobj->$key=$value;
}
// echo "<hr>";
// print_r($jobj);
// echo "<hr>";
echo json_encode($jobj);//打印编码后的json字符串
mysqli_close($con);
?>
