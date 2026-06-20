<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Confession.php';

class ConfessionController
{
    private const MAX_LENGTH = 160;

    public function submit(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            $this->redirect('index.html');
        }

        $content = trim($_POST['moment'] ?? '');

        $errors = $this->validate($content);

        if (!empty($errors)) {
            http_response_code(422);
            $this->redirect('index.html#confessions');
        }

        try {
            Confession::create([
                'location' => 'Anoniem',
                'content'  => $content,
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            $this->redirect('index.html#confessions');
        }

        $this->redirect('index.html?confession=success#confessions');
    }

    private function validate(string $content): array
    {
        $errors = [];
        if ($content === '') {
            $errors[] = 'Jouw ochtendmoment is verplicht.';
        }
        if (mb_strlen($content) > self::MAX_LENGTH) {
            $errors[] = 'Jouw ochtendmoment mag maximaal ' . self::MAX_LENGTH . ' tekens bevatten.';
        }
        return $errors;
    }

    private function redirect(string $url): never
    {
        header('Location: ' . $url);
        exit;
    }
}
