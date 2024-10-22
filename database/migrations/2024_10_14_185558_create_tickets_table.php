<?php

use App\Enums\TicketEscalation;
use App\Enums\TicketStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('location_id')->constrained();
            $table->foreignId('department_id')->constrained();
            $table->foreignId('topic_id')->constrained();
            $table->string('user');
            $table->string('reference_number');
            $table->text('description');
            $table->unsignedInteger('status')->default(TicketStatus::OPEN);
            $table->unsignedInteger('category');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
