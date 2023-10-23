<?php
session_start();
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
   $username = $_POST['username'];
   $password = $_POST['password'];

   $stmt = $pdo->prepare("SELECT * FROM usuario WHERE usuario = ?");
   $stmt->execute([$username]);
   $user = $stmt->fetch();

   if ($user) {
       $hashedPassword = hash('sha256', $password);

       if ($hashedPassword === $user['senha']) {
           $_SESSION['user_id'] = $user['id'];
           $_SESSION['usuario'] = $user['usuario'];  
           echo "Login bem-sucedido!";
       } else {
           echo "Senha incorreta.";
       }
   } else {
       echo "Usuário não encontrado.";
   }
} else {
   echo "Erro no processamento do formulário.";
}
?>
