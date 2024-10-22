<?php

namespace App\Enums;

use App\Models\Ticket;

enum TicketStatus: int
{
    case OPEN = 1;
    case ONHOLD = 2;
    case CLOSED = 3;

    public function getLabelText(): string
    {
        return match ($this) {
            self::OPEN => 'Buka',
            self::ONHOLD => 'Tertunda',
            self::CLOSED => 'Tutup',
        };
    }

    public function getLabelColor(): string
    {
        return match ($this) {
            self::OPEN => 'primary',
            self::ONHOLD => 'danger',
            self::CLOSED => 'success',
        };
    }
}
