<?php
include '../connect.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

try {
    $id = $data['id'];
    $query = "DELETE FROM horarios_alimentados WHERE id = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$id]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erro ao excluir horário: ' . $e->getMessage()]);
}

$pdo = null;
?>
