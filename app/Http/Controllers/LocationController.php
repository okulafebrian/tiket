<?php

namespace App\Http\Controllers;

use App\Http\Requests\LocationRequest;
use App\Http\Resources\LocationResource;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class LocationController extends Controller
{
    public function index()
    {
        Gate::authorize('viewAny', Location::class);

        $locations = Location::all();

        return inertia('Locations/Index', [
            'locations' => LocationResource::collection($locations)
        ]);
    }

    public function create()
    {
        Gate::authorize('create', Location::class);

        return inertia('Locations/Create');
    }

    public function store(LocationRequest $request)
    {
        Gate::authorize('create', Location::class);

        Location::create($request->validated());

        return redirect()->route('locations.index')->with('success', 'Data berhasil disimpan');
    }

    public function edit(Location $location)
    {
        Gate::authorize('update', $location);

        return inertia('Locations/Edit', [
            'location' => $location
        ]);
    }

    public function update(LocationRequest $request, Location $location)
    {
        Gate::authorize('update', $location);

        $location->update($request->validated());

        return redirect()->route('locations.index')->with('success', 'Data berhasil diubah');
    }

    public function destroy(Location $location)
    {
        Gate::authorize('delete', $location);

        $location->delete();

        return redirect()->route('locations.index')->with('success', 'Data berhasil dihapus');
    }
}
