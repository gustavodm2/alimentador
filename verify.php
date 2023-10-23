<?php
session_start();
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
   $username = $_POST['username'];
   $password = $_POST['password'];

   $stmt = $pdo->prepare("SELECT * FROM usuario WHERE usuario = ? AND senha = ?");
   $stmt->execute([$username, $password]);
   $user = $stmt->fetch();

   if ($user) {
       $_SESSION['user_id'] = $user['id'];
       $_SESSION['usuario'] = $user['usuario'];  
       echo "Login bem-sucedido!";
   } else {
       echo "Usuário ou senha incorretos.";
   }
} else {
   echo "Erro no processamento do formulário.";
}



?>