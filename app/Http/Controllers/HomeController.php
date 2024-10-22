<?php

namespace App\Http\Controllers;

use App\Http\Resources\DepartmentResource;
use App\Models\Department;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function __invoke()
    {
        $helpdesks = Department::with('topics')->get();

        return inertia('Home', [
            'helpdesks' => DepartmentResource::collection($helpdesks)
        ]);
    }
}
