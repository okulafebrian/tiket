<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\TicketCollection;
use App\Http\Resources\TicketResource;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        // $queryItems = $filter->transform($request);
        // $queryItems = [];

        // if (count($queryItems) == 0) {
        //     return new TicketCollection(Ticket::paginate());
        // } else {
        //     return new TicketCollection(Ticket::where($queryItems)->paginate());
        // }

        $tickets = Ticket::with('user', 'topic', 'department')->orderBy('created_at', 'desc')->simplePaginate(5);

        return TicketResource::collection($tickets);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Ticket $ticket)
    {
        //
    }

    public function edit(Ticket $ticket)
    {
        //
    }

    public function update(Request $request, Ticket $ticket)
    {
        //
    }

    public function destroy(Ticket $ticket)
    {
        //
    }
}
