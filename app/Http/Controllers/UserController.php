<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\RoleResource;
use App\Http\Resources\UserResource;
use App\Models\Department;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        Gate::authorize('viewAny', User::class);

        $users = Auth::user()->hasRole('super admin')
            ? User::with('department')->get()
            : User::with('department')->where('department_id', Auth::user()->department_id)->get();

        return inertia('Users/Index', [
            'users' => UserResource::collection($users)
        ]);
    }

    public function create()
    {
        Gate::authorize('create', User::class);

        return inertia('Users/Create', [
            'departments' => DepartmentResource::collection(Department::all()),
            'roles' => RoleResource::collection(Role::all())
        ]);
    }

    public function store(UserRequest $request)
    {
        Gate::authorize('create', User::class);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make('abc123'),
            'department_id' => $request->department_id
        ]);

        $user->syncRoles($request->roles);

        return redirect()->route('users.index')->with('success', 'Data berhasil disimpan');
    }

    public function show(User $user)
    {
        //
    }

    public function edit(User $user)
    {
        Gate::authorize('update', $user);

        return inertia('Users/Edit', [
            'departments' => DepartmentResource::collection(Department::all()),
            'user' => UserResource::make($user->load('department', 'roles')),
            'roles' => RoleResource::collection(Role::all())
        ]);
    }

    public function update(UserRequest $request, User $user)
    {
        Gate::authorize('update', $user);

        $user->update($request->validated());

        $user->syncRoles($request->validated('roles'));

        return redirect()->route('users.index')->with('success', 'Data berhasil diubah');
    }

    public function destroy(User $user)
    {
        Gate::authorize('delete', $user);

        $user->delete();

        return redirect()->route('users.index')->with('success', 'Data berhasil diubah');
    }
}
