<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Http\Resources\PermissionResource;
use App\Http\Resources\RoleResource;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function index()
    {
        Gate::authorize('viewAny', Role::class);

        $roles = Role::withCount('permissions')->get();
        $permissionCount = Permission::count();

        return inertia('Roles/Index', [
            'roles' => RoleResource::collection($roles),
            'permissionCount' => $permissionCount
        ]);
    }

    public function show(Role $role)
    {
        Gate::authorize('view', $role);

        return inertia('Roles/Show', [
            'role' => RoleResource::make($role->load('permissions')),
            'permissions' => PermissionResource::collection(Permission::all())
        ]);
    }

    public function edit(Role $role)
    {
        return inertia('Roles/Edit', [
            'role' => RoleResource::make($role->load('permissions')),
            'permissions' => PermissionResource::collection(Permission::all())
        ]);
    }

    public function update(RoleRequest $request, Role $role)
    {
        Gate::authorize('update', $role);

        if ($role->name == 'super admin') {
            return abort(403, 'Unauthorized action.');
        }

        $role->syncPermissions($request->validated('permissions'));

        return redirect()->route('roles.index')->with('success', 'Data berhasil diubah');
    }
}
