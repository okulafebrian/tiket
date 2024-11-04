<?php

namespace App\Http\Controllers;

use App\Enums\TicketCategory;
use App\Http\Requests\TopicRequest;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\LocationResource;
use App\Http\Resources\TicketCategoryResource;
use App\Http\Resources\TopicResource;
use App\Models\Department;
use App\Models\Location;
use App\Models\Topic;
use Illuminate\Support\Facades\Gate;

class TopicController extends Controller
{
    public function index()
    {
        Gate::authorize('viewAny', Topic::class);

        $topics = Topic::with('department')->get();

        return inertia('Topics/Index', [
            'topics' => TopicResource::collection($topics)
        ]);
    }

    public function create()
    {
        Gate::authorize('create', Topic::class);

        return inertia('Topics/Create', [
            'departments' => DepartmentResource::collection(Department::all())
        ]);
    }

    public function store(TopicRequest $request)
    {
        Gate::authorize('create', Topic::class);

        Topic::create($request->validated());

        return redirect()->route('topics.index')->with('success', 'Data berhasil disimpan');
    }

    public function show(Topic $topic)
    {
        Gate::authorize('view', $topic);

        return inertia('Topics/Show', [
            'locations' => LocationResource::collection(Location::all()),
            'categories' => TicketCategoryResource::collection(TicketCategory::cases()),
            'topic' => TopicResource::make($topic->load('department'))
        ]);
    }

    public function edit(Topic $topic)
    {
        Gate::authorize('update', $topic);

        return inertia('Topics/Edit', [
            'departments' => DepartmentResource::collection(Department::all()),
            'topic' => TopicResource::make($topic->load('department'))
        ]);
    }

    public function update(TopicRequest $request, Topic $topic)
    {
        Gate::authorize('update', $topic);

        $topic->update($request->validated());

        return redirect()->route('topics.index')->with('success', 'Data berhasil diubah');
    }

    public function destroy(Topic $topic)
    {
        Gate::authorize('delete', $topic);

        $topic->delete();

        return redirect()->route('topics.index')->with('success', 'Data berhasil diubah');
    }
}
