<?php
header("Content-type:text/html;charset=utf-8");//字符编码设置
$servername = "localhost";
$username = "root";
$password = "Z1hgq260717";
$dbname = "cdgoodmodel";
// 创建连接
//$con =mysqli_connect($servername, $username, $password, $dbname);
$con = new mysqli(null,$username,$password,$dbname,null,'/tmp/mysql.sock');
// 检测连接

$sql = "SELECT * FROM recommend";
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
$sql1 = "SELECT * FROM event_pass";
$result1 = mysqli_query($con,$sql1);
if (!$result1) {
    printf("Error: %s\n", mysqli_error($con));
    exit();
}
$jarr1 = array();
while($row=$result1->fetch_object()){
  array_push($jarr1,$row);
}
//print_r($jarr);
$jobj1=new stdclass();//实例化stdclass，这是php内置的空类，可以用来传递数据，由于json_encode后的数据是以对象数组的形式存放的，
//所以我们生成的时候也要把数据存储在对象中
foreach($jarr1 as $key=>$value){
$jobj1->$key=$value;
}

$sql2 = "SELECT * FROM goodman";
$result2 = mysqli_query($con,$sql2);
if (!$result2) {
    printf("Error: %s\n", mysqli_error($con));
    exit();
}
$jarr2 = array();
while($row=$result2->fetch_object()){
  array_push($jarr2,$row);
}
//print_r($jarr);
$jobj2=new stdclass();//实例化stdclass，这是php内置的空类，可以用来传递数据，由于json_encode后的数据是以对象数组的形式存放的，
//所以我们生成的时候也要把数据存储在对象中
foreach($jarr2 as $key=>$value){
$jobj2->$key=$value;
}


echo '{"rec":';
echo json_encode($jobj);
echo ',"eve_pass":';
echo json_encode($jobj1);
echo ',"goodman":';
echo json_encode($jobj2);
echo "}";
// //print_r($jobj);
// //print_r($jobj1);
// print_r($jobj2);
// $arr = array();
// $arr = array_merge($arr,$jobj);
// $arr = array_merge($arr,$jobj1);
// $arr = array_merge($arr,$jobj2);
// $arr = array_merge($arr,$jobj3);


//echo json_encode($arr);

//echo json_encode($jobj);//打印编码后的json字符串

mysqli_close($con);
?>
