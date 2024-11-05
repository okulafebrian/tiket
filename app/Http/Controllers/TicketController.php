<?php

namespace App\Http\Controllers;

use App\Enums\TicketCategory;
use App\Enums\TicketStatus;
use App\Http\Requests\TicketRequest;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\LocationResource;
use App\Http\Resources\StatusResource;
use App\Http\Resources\TicketCategoryResource;
use App\Http\Resources\TicketResource;
use App\Http\Resources\TopicResource;
use App\Http\Resources\UserResource;
use App\Models\Department;
use App\Models\Location;
use App\Models\Ticket;
use App\Models\Topic;
use App\Models\User;
use App\Services\TicketService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    protected $ticketService;

    public function __construct(TicketService $ticketService)
    {
        $this->ticketService = $ticketService;
    }

    public function index(Request $request)
    {
        $tickets = Ticket::with('user', 'topic', 'department')
            ->when($request->status, function ($query, $status) {
                return $query->where('status', $status);
            })
            ->when($request->department, function ($query, $department) {
                return $query->where('department_id', $department);
            })
            ->when($request->search, function ($query, $search) {
                return $query->whereHas('topic', function ($q) use ($search) {
                    $q->where('name', 'LIKE', "%{$search}%");
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate(8)
            ->withQueryString();

        return inertia('Tickets/Index', [
            'parameters' => $request->only(['status', 'department', 'search']),
            'tickets' => TicketResource::collection($tickets),
            'statuses' => StatusResource::collection(TicketStatus::cases()),
            'departments' => DepartmentResource::collection(Department::all())
        ]);
    }

    public function history(Request $request)
    {
        $tickets = Ticket::with('user', 'topic')
            ->when($request->status, function ($query, $status) {
                return $query->where('status', $status);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(4)
            ->withQueryString();

        return inertia('Tickets/History', [
            'parameters' => $request->only(['status']),
            'tickets' => TicketResource::collection($tickets),
            'statuses' => StatusResource::collection(TicketStatus::cases()),
        ]);
    }

    public function create()
    {
        return inertia('Tickets/Create', [
            'categories' => TicketCategoryResource::collection(TicketCategory::cases()),
            'locations' => LocationResource::collection(Location::all()),
            'topics' => TopicResource::collection(Topic::all()),
        ]);
    }

    public function store(TicketRequest $request)
    {
        $topic = Topic::with('department')->find($request->topic_id);

        $ticket = $topic->tickets()->create([
            'reference_number' => $this->ticketService->getReferenceNumber($topic->department),
            'department_id' => $topic->department->id,
            'category' => $request->category,
            'location_id' => $request->location_id,
            'description' => $request->description,
            'user' => Auth::user()->email,
        ]);

        return redirect()->route('tickets.index')->with('success', 'Data berhasil disimpan');
    }

    public function show(Ticket $ticket)
    {
        //
    }

    public function edit(Ticket $ticket)
    {
        return inertia('Tickets/Edit', [
            'ticket' => TicketResource::make($ticket->load('user', 'topic', 'location', 'department', 'assignees', 'comments')),
            'statuses' => StatusResource::collection(TicketStatus::cases()),
            'categories' => TicketCategoryResource::collection(TicketCategory::cases()),
            'departments' => DepartmentResource::collection(Department::all()),
            'users' => UserResource::collection(User::all())
        ]);
    }

    public function update(TicketRequest $request, Ticket $ticket)
    {
        $ticket->update($request->validated());

        $ticket->assignees()->sync($request->validated('assignees'));

        if ($request->comment['description']) {
            $ticket->comments()->create([
                'user_id' => Auth::id(),
                'description' => $request->comment['description']
            ]);
        }

        return back()->with('message', 'Data berhasil diubah');
    }

    public function destroy(Ticket $ticket)
    {
        //
    }
}
