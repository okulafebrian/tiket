<?php

use App\Http\Controllers\Api\V1\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('medias/{uuid}/download', function ($uuid) {
    return Media::where('uuid', $uuid)->first();
})->name('medias.download');

Route::prefix('v1')->group(function () {
    Route::apiResource('tickets', TicketController::class);
})->middleware('auth:sanctum');
