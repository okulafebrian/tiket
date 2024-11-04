<?php

namespace App\Http\Controllers;

use App\Http\Requests\DepartmentRequest;
use App\Http\Resources\DepartmentResource;
use App\Models\Department;
use Illuminate\Support\Facades\Gate;

class DepartmentController extends Controller
{
    public function index()
    {
        Gate::authorize('viewAny', Department::class);

        $departments = Department::withCount('users', 'topics')->get();

        return inertia('Departments/Index', [
            'departments' => DepartmentResource::collection($departments)
        ]);
    }

    public function create()
    {
        Gate::authorize('create', Department::class);

        return inertia('Departments/Create');
    }

    public function store(DepartmentRequest $request)
    {
        Gate::authorize('create', Department::class);

        Department::create($request->validated());

        return redirect()->route('departments.index')->with('success', 'Data berhasil disimpan');
    }

    public function show(Department $department)
    {
        //
    }

    public function edit(Department $department)
    {
        Gate::authorize('update', $department);

        return inertia('Departments/Edit', [
            'department' => $department
        ]);
    }

    public function update(DepartmentRequest $request, Department $department)
    {
        Gate::authorize('update', $department);

        $department->update($request->validated());

        return redirect()->route('departments.index')->with('success', 'Data berhasil diubah');
    }

    public function destroy(Department $department)
    {
        Gate::authorize('delete', $department);

        $department->delete();

        return redirect()->route('departments.index')->with('success', 'Data berhasil dihapus');
    }
}
