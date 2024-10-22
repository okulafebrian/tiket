<?php

namespace App\Http\Controllers;

use App\Enums\TicketCategory;
use App\Enums\TicketStatus;
use App\Http\Requests\TicketRequest;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\LocationResource;
use App\Http\Resources\TicketCategoryResource;
use App\Http\Resources\TicketResource;
use App\Http\Resources\TicketStatusResource;
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
            ->orderBy('created_at', 'desc')
            ->simplePaginate(10)
            ->withQueryString();

        return inertia('Tickets/Index', [
            'parameters' => $request->only(['status', 'department']),
            'tickets' => TicketResource::collection($tickets),
            'statuses' => TicketStatusResource::collection(TicketStatus::cases()),
            'departments' => DepartmentResource::collection(Department::all())
        ]);
    }

    public function history()
    {
        $user = 'admin@bpkpenaburjakarta.or.id';

        $tickets = Ticket::with('topic')->where('user', $user)->orderBy('created_at', 'desc')->get();

        return inertia('Tickets/History', [
            'tickets' => $tickets
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
        $department = $topic->department;

        Ticket::create([
            'reference_number' => $this->ticketService->getReferenceNumber($department),
            'topic_id' => $request->topic_id,
            'category' => $request->category,
            'location_id' => $request->location_id,
            'department_id' => $department->id,
            'description' => $request->description,
            'user' => Auth::user()->email,
        ]);

        return redirect()->route('tickets.index');
    }

    public function show(Ticket $ticket)
    {
        //
    }

    public function edit(Ticket $ticket)
    {
        return inertia('Tickets/Edit', [
            'ticket' => TicketResource::make($ticket->load('user', 'topic', 'location', 'department', 'comments')),
            'statuses' => TicketStatusResource::collection(TicketStatus::cases()),
            'categories' => TicketCategoryResource::collection(TicketCategory::cases()),
            'departments' => DepartmentResource::collection(Department::all()),
            'users' => UserResource::collection(User::all())
        ]);
    }

    public function update(Request $request, Ticket $ticket)
    {
        $assignees = explode(',', $request->assignees);

        $ticket->update([
            'status' => $request->status,
            'department_id' => $request->department_id,
            'category' => $request->category,
        ]);

        $ticket->assignees()->attach($assignees);

        return back()->with('message', 'Data berhasil disimpan');
    }

    public function destroy(Ticket $ticket)
    {
        //
    }
}
