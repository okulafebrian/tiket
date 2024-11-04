<?php

namespace App\Enums;

enum DepartmentStatus: int
{
    case ACTIVE = 1;
    case INACTIVE = 2;
    case PENDING = 3;

    public function getLabelText(): string
    {
        return match ($this) {
            self::ACTIVE => 'Aktif',
            self::INACTIVE => 'Tidak Aktif',
            self::PENDING => 'Pending',
        };
    }

    public function getLabelColor(): string
    {
        return match ($this) {
            self::ACTIVE => 'success',
            self::INACTIVE => 'primary',
            self::PENDING => 'danger',
        };
    }
}
