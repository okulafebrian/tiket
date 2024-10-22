<?php

namespace App\Enums;

enum TicketCategory: int
{
    case REQUEST = 1;
    case ISSUE = 2;

    public function getLabelText(): string
    {
        return match ($this) {
            self::REQUEST => 'Permintaan',
            self::ISSUE => 'Permasalahan',
        };
    }

    public function getLabelColor(): string
    {
        return match ($this) {
            self::REQUEST => 'warning',
            self::ISSUE => 'danger',
        };
    }
}
