<?php

namespace App\Services;

use App\Models\Department;
use App\Models\Ticket;
use Carbon\Carbon;

class TicketService
{
    public function getReferenceNumber(Department $department)
    {
        $tickets = Ticket::where('department_id', $department->id)
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->get();

        $count = $tickets->count() + 1;

        return 'SIM-' . $department->code . '-' . Carbon::now()->format('Ymd') . '-' . str_pad($count, 5, '0', STR_PAD_LEFT);
    }
}
