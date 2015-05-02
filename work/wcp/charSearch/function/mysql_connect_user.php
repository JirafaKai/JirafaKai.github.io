<?php
//資料庫設定
//資料庫位置
$db_server = "125.31.40.148";
//資料庫名稱
$db_name = "wcp";
//資料庫管理者帳號
$db_user = "user";
//資料庫管理者密碼
$db_passwd = "user";

//對資料庫連線
if(!@mysql_connect($db_server, $db_user, $db_passwd))
        die("無法對資料庫連線");

//資料庫連線採UTF8
mysql_query("SET NAMES utf8");

//選擇資料庫
if(!@mysql_select_db($db_name))
        die("無法使用資料庫");
?> 