<?php

namespace App\Http\Controllers;

use App\Enums\TicketCategory;
use App\Http\Resources\LocationResource;
use App\Http\Resources\TicketCategoryResource;
use App\Http\Resources\TopicResource;
use App\Models\Location;
use App\Models\Topic;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Topic $topic)
    {
        return inertia('Topics/Show', [
            'categories' => TicketCategoryResource::collection(TicketCategory::cases()),
            'topic' => TopicResource::make($topic),
            'locations' => LocationResource::collection(Location::all())
        ]);
    }

    public function edit(Topic $topic)
    {
        //
    }

    public function update(Request $request, Topic $topic)
    {
        //
    }

    public function destroy(Topic $topic)
    {
        //
    }
}
