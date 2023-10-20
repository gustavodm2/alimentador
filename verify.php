<?php
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
   $username = $_POST['username'];
   $password = $_POST['password'];

   $stmt = $pdo->prepare("SELECT * FROM usuario WHERE usuario = ? AND senha = ?");
   $stmt->execute([$username, $password]);
   $user = $stmt->fetch();

   if ($user) {
       echo "Login bem-sucedido!";
   } else {
       echo "Usuário ou senha incorretos.";
   }
} else {
   echo "Erro no processamento do formulário.";
}
?>