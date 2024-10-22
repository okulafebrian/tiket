<?php

namespace App\Http\Controllers;

use App\Enums\TicketStatus;
use App\Http\Resources\TicketStatusResource;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $tickets = Ticket::query()
            ->select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->pluck('count', 'status.value');

        $statuses = [];

        foreach (TicketStatus::cases() as $status) {
            $statuses[] = [
                'name' => $status->getLabelText(),
                'tickets_count' => $tickets[$status->value] ?? 0
            ];
        }

        return inertia('Dashboard', [
            'statuses' => $statuses
        ]);
    }
}
