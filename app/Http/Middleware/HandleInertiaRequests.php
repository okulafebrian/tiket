<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Spatie\Permission\Models\Permission;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'can' => $request->user()?->loadMissing('roles.permissions')
                    ->roles->flatMap(function ($role) use ($request) {

                        if ($role->name == 'super admin') {
                            return Permission::all()->map(function ($permission) {
                                return [$permission->name => true];
                            });
                        }

                        return $role->permissions->map(function ($permission) use ($request) {
                            return [$permission->name => $request->user()->can($permission->name)];
                        });
                    })->collapse()->all()
            ],
            'flash' => [
                'message' => fn() => $request->session()->get('message')
            ],
        ];
    }
}
