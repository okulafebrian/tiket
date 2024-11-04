<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/', HomeController::class)->name('home');

    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::get('mytickets', [TicketController::class, 'history'])->name('tickets.history');

    Route::resource('tickets', TicketController::class);

    Route::resource('comments', CommentController::class);

    Route::resource('departments', DepartmentController::class);

    Route::resource('topics', TopicController::class);

    Route::resource('users', UserController::class);

    Route::resource('roles', RoleController::class);

    Route::resource('locations', LocationController::class)->except(['show']);
});

require __DIR__ . '/auth.php';
